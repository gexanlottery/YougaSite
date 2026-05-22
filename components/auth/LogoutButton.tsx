'use client'
import { logoutAction } from '@/lib/actions/auth'
import { Button } from '@/components/ui/Button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="ghost" size="sm">
        <LogOut className="w-4 h-4 mr-2" />
        Выйти
      </Button>
    </form>
  )
}
