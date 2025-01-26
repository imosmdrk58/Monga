'use client'

import { Button } from '@/components/ui'
import { Laptop2, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeSelector({
  shape = 'square',
  appearance = 'outline',
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    setTheme(nextTheme)
  }

  return (
    <Button
      shape={shape}
      appearance={appearance}
      size="square-petite"
      aria-label="Switch theme"
      onPress={toggleTheme}
      {...props}
    >
      {theme === 'light' ? <SunIcon /> : theme === 'dark' ? <MoonIcon /> : <Laptop2 />}
    </Button>
  )
}
