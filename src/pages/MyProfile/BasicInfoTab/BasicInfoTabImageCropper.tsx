import React, { ChangeEvent, useState } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import './Demo.css'
import basicInfoApi from '../../../middleware/api/MyProfile/BasicInfoTab/basicInfoApi'
import { latest } from 'immer/dist/internal'

export type ImageCropperProps = {
  file: string | undefined
  empId: number
}

export type UploadImage = {
  empId: number
  data: unknown
}

const Demo = (prop: ImageCropperProps): JSX.Element => {
  const [image, setImage] = useState<string | undefined>()
  const [imageUploaded, setImageUploaded] = useState<boolean>(false)
  const [cropper, setCropper] = useState<unknown | any>()
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      console.log(reader.result)
      setImage(reader.result as string)
      setImageUploaded(true)
    }
    reader.readAsDataURL(file[0])
  }

  const getCropData = async () => {
    if (typeof cropper !== 'undefined') {
      cropper.getCroppedCanvas().toBlob(async (blob: Blob) => {
        console.log(blob)
        const imageFile = new File([blob], 'profilePicture', {
          type: 'image/jpeg',
        })
        console.log(imageFile)
        const formData = new FormData()
        formData.append('file', imageFile)
        const prepareFile = {
          data: formData,
          empId: prop.empId,
        }
        setTimeout(async () => {
          await basicInfoApi.uploadEmployeeImage(prepareFile)
        }, 1000)
      }, 'image/jpeg')
    }
  }

  return (
    <div>
      {imageUploaded ? (
        <div className="box mt-2">
          <div
            className="img-preview"
            style={{ width: '100%', float: 'left', height: '100%' }}
          />
        </div>
      ) : (
        <div className="profile-avatar mt-2">
          <img
            width="120px"
            height="120px;"
            src={prop.file}
            alt="User Profile"
          />
        </div>
      )}
      <div className="mt-2">
        <input type="file" onChange={onChange} />
        {imageUploaded && (
          <span onPointerLeave={getCropData}>
            <Cropper
              className="mt-2"
              style={{ height: 250, width: 250 }}
              zoomTo={0.1}
              aspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={30}
              minCropBoxWidth={30}
              background={false}
              responsive={true}
              autoCropArea={1}
              scalable={false}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance)
              }}
              guides={true}
            />
          </span>
        )}
      </div>
      <br style={{ clear: 'both' }} />
    </div>
  )
}

export default Demo
