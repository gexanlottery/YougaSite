module.exports = {
  apps: [
    {
      name: 'yoga-kristina',
      script: 'node_modules/.bin/next',
      args: 'start --port 3000',
      cwd: '/root/yoga-kristina',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '900M',
      env: {
        NODE_ENV: 'production',
        NODE_OPTIONS: '--max-old-space-size=512',
        DATABASE_URL: 'postgresql://postgres:password@localhost:5432/yoga_kristina?schema=public',
        NEXT_PUBLIC_SITE_URL: 'http://146.103.100.71:3000',
        NEXT_PUBLIC_TELEGRAM_HANDLE: '@glazamikris',
      },
    },
  ],
}
