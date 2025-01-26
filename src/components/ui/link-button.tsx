'use client'
import { ButtonProps, buttonStyles } from '@/components/ui/button'
import Link from 'next/link'
import { ComponentProps } from 'react'

export const LinkButton = ({
  className,
  intent,
  appearance,
  size,
  shape,
  ref,
  ...props
}: ComponentProps<typeof Link> & Pick<ButtonProps, 'intent' | 'appearance' | 'size' | 'shape'>) => {
  return (
    <Link
      {...props}
      className={buttonStyles({
        className,
        intent,
        appearance,
        size,
        shape,
      })}
    />
  )
}
