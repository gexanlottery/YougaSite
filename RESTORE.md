# Восстановление сайта «Йога глазами Кристины» с нуля

Пошаговый гайд для развёртывания сайта на **новом сервере** по коду из этого репозитория.
После выполнения сайт заработает онлайн так же, как работал на старом сервере.

> Гайд рассчитан на человека, который умеет работать в консоли Linux, но проект видит впервые.
> Все команды — под пользователем `root` (или через `sudo`).

---

## 0. Что это за проект

| | |
|---|---|
| **Стек** | Next.js 16 (App Router) + React 19 + Prisma 7 + PostgreSQL 16 |
| **Рантайм** | Node.js 20, процесс держит **PM2** |
| **База** | PostgreSQL в **Docker**-контейнере (`postgres:16-alpine`) |
| **Веб-сервер** | **nginx** как reverse-proxy → Next.js на порту `3000` |
| **HTTPS** | Let's Encrypt / **Certbot** |
| **Видео** | внешний хостинг **Kinescope** (в БД хранится только `kinescopeId`) |
| **Домен** | `yogaglazamikristi.ru` |

**Два репозитория:**
- Код (этот): `git@github.com:gexanlottery/YougaSite.git`
- Дампы БД (приватный): `git@github.com:gexanlottery/YougaSiteprivate.git`

---

## 1. Что нужно получить от прежнего владельца ОТДЕЛЬНО

Этих вещей **нет в репозитории** (и не должно быть). Без них сайт не поднять — попросите их передать безопасным каналом:

1. **Содержимое файла `.env`** — все секреты (см. раздел 5). В частности:
   - `AUTH_SECRET` — ключ подписи сессий next-auth
   - `KINESCOPE_SECRET_KEY` — ключ для подписи видео-токенов
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — вход в админку
   - пароль к базе (в `DATABASE_URL`)
2. **Доступ к приватному репозиторию** `YougaSiteprivate` — там лежат дампы БД (данные сайта: уроки, курсы, пользователи).
3. **Доступ к аккаунту Kinescope** — иначе видео перестанут проигрываться (файлы физически там, а не на сервере). Аккаунт нужно либо переоформить на нового владельца, либо сохранить рабочим и передать `KINESCOPE_SECRET_KEY`.
4. **Доступ к управлению доменом** `yogaglazamikristi.ru` (панель регистратора / DNS), чтобы переключить домен на новый сервер.

---

## 2. Подготовка сервера

Новый сервер: Ubuntu 22.04/24.04, минимум 2 ГБ RAM, ~15 ГБ диска (старый был всего 9.8 ГБ — было тесно, лучше взять с запасом).

```bash
apt update && apt upgrade -y

# Node.js 20 (совпадает с прежним сервером)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Инструменты
apt install -y git nginx docker.io
npm install -g pm2

# Проверка версий (на старом сервере было: node v20.20.2, npm 10.8.2)
node -v && npm -v && docker --version
```

Firewall (как было на старом сервере — порт БД наружу закрыт!):
```bash
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
# порт 5432 НЕ открываем — база доступна только локально.
# (В 2026 базу уже ломали ransomware-ботом через открытый 5432 — не повторяем ошибку.)
```

---

## 3. Клонируем код

```bash
cd /root
git clone git@github.com:gexanlottery/YougaSite.git yoga-kristina
cd yoga-kristina
npm install
```

> Загруженные картинки и обложки (`public/uploads/`) хранятся прямо в репозитории — отдельно копировать не нужно, они приедут вместе с кодом.

---

## 4. Поднимаем базу данных (Docker)

Запускаем PostgreSQL точно так же, как было на старом сервере:

```bash
docker run -d \
  --name yoga-postgres \
  --restart unless-stopped \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=yoga_kristina \
  -p 127.0.0.1:5432:5432 \
  -v yoga_pgdata:/var/lib/postgresql/data \
  postgres:16-alpine
```

⚠️ **Важно:** `-p 127.0.0.1:5432:5432` (а не `-p 5432:5432`) — база слушает только локальный интерфейс и недоступна из интернета. Не меняйте это.

> Пароль `password` здесь — как на старом сервере. Если хотите усилить безопасность, задайте свой и синхронно поправьте `DATABASE_URL` в `.env` и `ecosystem.config.js`.

### Восстанавливаем данные из дампа

Дампы — в приватном репозитории. Берём самый свежий:

```bash
cd /root
git clone git@github.com:gexanlottery/YougaSiteprivate.git backups-db
cd backups-db
ls -1t db-*.sql.gz | head -1        # самый свежий дамп

# Заливаем его в базу (подставьте актуальное имя файла)
gunzip -c db-2026-07-05_03-00-01.sql.gz \
  | docker exec -i yoga-postgres psql -U postgres -d yoga_kristina
```

Дамп содержит и структуру, и данные — отдельно создавать таблицы не нужно.

> **Если дампа нет** (совсем чистый старт): структуру можно создать из схемы Prisma командой `npx prisma db push`, а затем наполнить демо-данными `npm run db:seed`. Но реальный контент сайта при этом НЕ восстановится — только пустой каркас с одним админом.

---

## 5. Настраиваем окружение (`.env`)

Файла `.env` в репозитории нет (там секреты). Создайте его в корне проекта.
Значения возьмите у прежнего владельца (раздел 1); публичные — можно оставить как ниже.

```env
# База (пароль/хост — как в docker run выше)
DATABASE_URL="postgresql://postgres:password@localhost:5432/yoga_kristina?schema=public"

# NextAuth / Auth.js — ВЗЯТЬ У ВЛАДЕЛЬЦА (тот же AUTH_SECRET, иначе разлогинятся все сессии)
AUTH_SECRET="<секрет-от-владельца>"
AUTH_URL="https://yogaglazamikristi.ru"

# Админ для входа в панель — ВЗЯТЬ У ВЛАДЕЛЬЦА
ADMIN_EMAIL="<email-админа>"
ADMIN_PASSWORD="<пароль-админа>"

# Kinescope (видео) — ВЗЯТЬ У ВЛАДЕЛЬЦА, иначе видео не проиграются
KINESCOPE_SECRET_KEY="<ключ-kinescope>"

# Публичные (можно оставить как есть, поправить домен если он новый)
NEXT_PUBLIC_SITE_URL="https://yogaglazamikristi.ru"
NEXT_PUBLIC_TELEGRAM_HANDLE="@glazamikris"
```

⚠️ **Два места с настройками!** Часть переменных PM2 берёт не из `.env`, а из `ecosystem.config.js` (блок `env`). Откройте его и приведите к домену нового сервера:
- `DATABASE_URL` — должен совпадать с `.env`
- `NEXT_PUBLIC_SITE_URL` — поставьте `https://yogaglazamikristi.ru` (в файле остался старый IP старого сервера — обязательно замените)

---

## 6. Сборка и запуск

```bash
cd /root/yoga-kristina

npx prisma generate      # генерирует клиент в app/generated/prisma
npm run build            # продакшн-сборка Next.js

# Запуск через PM2 (конфиг уже в репозитории)
pm2 start ecosystem.config.js
pm2 save                 # чтобы приложение поднималось после перезагрузки
pm2 startup              # выполнить выданную команду — регистрирует автозапуск
```

Проверка, что приложение отвечает локально:
```bash
curl -I http://127.0.0.1:3000
```

---

## 7. nginx + HTTPS

Создайте конфиг сайта `/etc/nginx/sites-available/yogaglazamikristi.ru`:

```nginx
server {
    server_name yogaglazamikristi.ru www.yogaglazamikristi.ru;

    client_max_body_size 50M;     # нужно для загрузки крупных обложек

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    listen 80;
}
```

Включаем и проверяем:
```bash
ln -s /etc/nginx/sites-available/yogaglazamikristi.ru /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### DNS

В панели регистратора домена переключите **A-запись** `yogaglazamikristi.ru` (и `www`) на **IP нового сервера**. Дождитесь обновления (обычно минуты, иногда до нескольких часов).

### SSL-сертификат

Как только домен указывает на новый сервер:
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yogaglazamikristi.ru -d www.yogaglazamikristi.ru
```

Certbot сам допишет `listen 443 ssl`, пути к сертификату и редирект с http → https. Автопродление ставится автоматически.

---

## 8. Проверка, что всё работает

- [ ] `https://yogaglazamikristi.ru` открывается, замок HTTPS зелёный
- [ ] Картинки и обложки уроков отображаются
- [ ] Видео проигрывается (значит Kinescope-ключ верный)
- [ ] Вход в админку по `ADMIN_EMAIL` / `ADMIN_PASSWORD` работает
- [ ] Контент на месте (уроки/курсы) — значит дамп БД восстановился

---

## 9. Полезное на будущее

- **Автоматический бэкап.** На старом сервере cron каждое воскресенье в 03:00 запускал `/root/scripts/weekly-backup.sh`: пушил код в этот репозиторий и дамп БД — в приватный. Сам скрипт лежит вне репозитория, но его легко воссоздать (см. его логику: `git add/commit/push` кода + `docker exec yoga-postgres pg_dump ... | gzip` → коммит в приватный репо, хранит последние 12 дампов). Настройте аналогично:
  ```bash
  crontab -e
  # 0 3 * * 0 /root/scripts/weekly-backup.sh
  ```
- **Загрузки в рантайме.** В Next.js 16 файлы, добавленные в `public/` уже ПОСЛЕ `npm run build`, стандартным способом отдаются как 404. В проекте это обходит catch-all роут `app/uploads/[...path]/route.ts` — он читает файлы с диска. Если картинки, загруженные через админку, не показываются — смотреть надо туда, а не в статику.
- **Видео не на сервере.** Все видеофайлы — на Kinescope. Пока жив аккаунт Kinescope и верен `KINESCOPE_SECRET_KEY`, видео работают. Потеря аккаунта = потеря видео, из бэкапа их не восстановить.

---

*Составлено при передаче проекта. Вопросы по устройству — смотрите код в этом репозитории и историю коммитов.*
