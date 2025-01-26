import Link from 'next/link'
import React from 'react'
import { cn } from 'src/utilities/cn'

import { ButtonProps } from '@/components/ui/button'
import { LinkButton } from '@/components/ui/link-button'
import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['appearance'] | null
  intent?: ButtonProps['intent']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size']
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type = 'reference',
    appearance = 'inline',
    children,
    className,
    label,
    intent,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'inline' ? 'medium' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <LinkButton
      size={size}
      appearance={appearance ?? 'plain'}
      intent={intent}
      className={cn(className)}
      href={href || url || ''}
      {...newTabProps}
    >
      {label && label}
      {children && children}
    </LinkButton>
  )
}
