import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Heading } from '@/components/ui'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const stories = await payload.find({
    collection: 'stories',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <Heading level={1}>Stories</Heading>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="stories"
          currentPage={stories.page}
          limit={12}
          totalDocs={stories.totalDocs}
        />
      </div>

      <CollectionArchive posts={stories.docs} />

      <div className="container">
        {stories.totalPages > 1 && stories.page && (
          <Pagination page={stories.page} totalPages={stories.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
