import { OurFileRouter } from '@/app/api/uploading/core'
import { generateReactHelpers } from '@uploadthing/react'
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();