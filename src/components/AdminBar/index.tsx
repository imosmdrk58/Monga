'use client'

import { PayloadAdminBar, type PayloadAdminBarProps } from '@payloadcms/next/admin-bar'

import { cn } from '@/utilities/cn'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
import React, { useState } from 'react'

import './index.scss'
import { getClientSideURL } from '@/utilities/getURL'

const baseClass = 'admin-bar'

const collectionLabels: Record<string, { plural: string; singular: string }> = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{ adminBarProps?: PayloadAdminBarProps }> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages'
  const router = useRouter()

  const onAuthChange = React.useCallback((user: any) => {
    setShow(!!user?.id)
  }, [])

  return (
    <div
      className={cn(baseClass, 'dark py-2 bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container mx-auto">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-fg!"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          collection={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Pages',
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages'
  const router = useRouter()

  const onAuthChange = React.useCallback((user) => {
    setShow(user?.id)
  }, [])

  return (
    <div
      className={cn(baseClass, 'dark py-2 bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container mx-auto">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-fg!"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          collection={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Pages',
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}
