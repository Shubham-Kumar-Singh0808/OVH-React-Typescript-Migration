import { UploadImage } from '../../apiTypes'

export type BasicInformationState = {
  isLoading: boolean
}

export type DownloadCVInterface = {
  className: string
  fileName?: string
  tenantKey?: string
  token?: string
}

export type ImageCropperProps = {
  file: string | undefined
  empId: number
  onUploadImage: (croppedImageData: UploadImage) => void
}
