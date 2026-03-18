// Cloudflare R2 client (S3-compatible)
// Server-side only — never import in client components

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const R2_ACCOUNT_ID   = process.env.R2_ACCOUNT_ID!
const R2_ACCESS_KEY   = process.env.R2_ACCESS_KEY_ID!
const R2_SECRET_KEY   = process.env.R2_SECRET_ACCESS_KEY!
const R2_BUCKET       = process.env.R2_BUCKET_NAME!
const R2_PUBLIC_URL   = process.env.R2_PUBLIC_URL!

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId:     R2_ACCESS_KEY,
    secretAccessKey: R2_SECRET_KEY,
  },
})

/**
 * Upload a file buffer to R2.
 * Returns the public URL of the uploaded object.
 */
export async function uploadToR2({
  key,
  body,
  contentType,
}: {
  key: string
  body: Buffer | Uint8Array
  contentType: string
}): Promise<string> {
  await r2.send(new PutObjectCommand({
    Bucket:      R2_BUCKET,
    Key:         key,
    Body:        body,
    ContentType: contentType,
  }))

  return `${R2_PUBLIC_URL}/${key}`
}

/**
 * Delete an object from R2 by key.
 */
export async function deleteFromR2(key: string): Promise<void> {
  await r2.send(new DeleteObjectCommand({
    Bucket: R2_BUCKET,
    Key:    key,
  }))
}

/**
 * Build a unique R2 key for an uploaded image.
 * Format: images/{timestamp}-{sanitized-filename}
 */
export function buildImageKey(filename: string): string {
  const timestamp  = Date.now()
  const sanitized  = filename
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]/g, '-')
    .replace(/-+/g, '-')

  return `images/${timestamp}-${sanitized}`
}
