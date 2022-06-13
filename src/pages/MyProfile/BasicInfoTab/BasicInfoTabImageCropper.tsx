import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Cropper } from 'react-cropper'
import { ImageCropperProps } from '../../../types/MyProfile/BasicInfoTab/basicInformationTypes'

const BasicInfoTabImageCropper = (props: ImageCropperProps): JSX.Element => {
  const [image, setImage] = useState<string | undefined>()
  const [imageUploaded, setImageUploaded] = useState<boolean>(false)
  const [cropper, setCropper] = useState<Cropper>()
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result as string)
      setImageUploaded(true)
    }
    reader.readAsDataURL(file[0])
  }
  const { onUploadImage } = props

  const getCropData = useCallback(async () => {
    if (typeof cropper !== 'undefined' && typeof cropper !== null) {
      cropper.getCroppedCanvas().toBlob(async (blob: unknown | Blob) => {
        const imageFile = new File([blob as Blob], 'profilePicture', {
          type: 'image/jpeg',
        })
        const formData = new FormData()
        formData.append('file', imageFile)
        const prepareFile = {
          data: formData,
          empId: props.empId,
        }
        setTimeout(() => {
          onUploadImage(prepareFile)
        }, 500)
      }, 'image/jpeg')
    }
  }, [cropper, props.empId, onUploadImage])

  useEffect(() => {
    if (typeof cropper !== 'undefined')
      setTimeout(() => {
        getCropData()
      }, 1000)
  }, [cropper, getCropData, image])

  return (
    <div>
      {imageUploaded ? (
        <div className="basic-info-box mt-2">
          <div
            id="uploadedImage"
            className="basic-info-img-preview"
            style={{ width: '100%', float: 'left', height: '100%' }}
          />
        </div>
      ) : (
        <div id="profilePicture" className="profile-avatar mt-2">
          <img
            width="120px"
            height="120px;"
            src={props.file}
            alt="User Profile"
          />
        </div>
      )}
      <div className="mt-2">
        <input
          type="file"
          id="fileUpload"
          onChange={onChange}
          accept=".png, .jpg, .jpeg"
        />
        {imageUploaded && (
          <span>
            <Cropper
              id="cropper"
              className="mt-2"
              style={{ height: 250, width: 250 }}
              zoomTo={0.1}
              aspectRatio={1}
              preview=".basic-info-img-preview"
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
                getCropData()
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

export default BasicInfoTabImageCropper
