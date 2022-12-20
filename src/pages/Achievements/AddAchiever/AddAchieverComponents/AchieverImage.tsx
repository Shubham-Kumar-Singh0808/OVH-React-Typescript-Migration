import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Cropper } from 'react-cropper'
import { AchieverImageCrop } from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'

const AchieverImage = (props: AchieverImageCrop): JSX.Element => {
  const [image, setImage] = useState<string | undefined>()
  const [imageUploaded, setImageUploaded] = useState<boolean>(false)
  const [cropper, setCropper] = useState<Cropper>()
  const [fileTypeError, setFileTypeError] = useState<string>('')
  const { onUploadImage } = props
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    const acceptedFileTypes = ['png', 'jpeg', 'jpg', 'PNG', 'JPEG', 'JPG']
    let extension = '' as string
    if (!file) return
    if (file) {
      extension = file[0].name.split('.').pop() as string
    }
    if (!acceptedFileTypes.includes(extension)) {
      setFileTypeError(
        'Wrong file format chosen. Please choose either png, jpeg, or jpg.',
      )
      setImage(undefined)
      setImageUploaded(false)
      setCropper(undefined)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result as string)
      setImageUploaded(true)
      setFileTypeError('')
    }
    reader.readAsDataURL(file[0])
  }

  const getCropData = useCallback(() => {
    if (typeof cropper !== 'undefined' && typeof cropper !== null) {
      cropper.getCroppedCanvas().toBlob(() => {
        const prepareFile = image
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
      }, 500)
  }, [cropper, getCropData, image])

  return (
    <div>
      {imageUploaded ? (
        <div className="mt-2 basic-info-box">
          <div id="uploadedImage" className="basic-info-img-preview" />
        </div>
      ) : (
        <div id="profilePicture" className="mt-2 profile-avatar">
          <img className="basic-info-img" src={props.file} alt="User Profile" />
        </div>
      )}
      <div className="mt-2">
        <input
          type="file"
          className="sh-updateTicket-file cursor-pointer"
          id="fileUpload"
          onChange={onChange}
          accept=".png, .jpg, .jpeg"
        />
        {fileTypeError && (
          <div>
            <strong className="mt-3 text-danger">{fileTypeError}</strong>
          </div>
        )}
        {imageUploaded && (
          <span
            onMouseLeave={getCropData}
            className="mt-2 basic-info-cropper-span"
          >
            <Cropper
              id="cropper"
              zoomTo={0}
              className="basic-info-cropper-span"
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
    </div>
  )
}

export default AchieverImage
