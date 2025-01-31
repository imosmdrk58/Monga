import { NextApiRequest } from 'next'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

export async function GET(req: NextApiRequest) {
  const payload = await getPayload({
    config: configPromise,
  })
  const stories = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 10,
  })
  const count = await payload.count({
    collection: 'search',
  })

  return NextResponse.json({
    ...stories,
  })
}
