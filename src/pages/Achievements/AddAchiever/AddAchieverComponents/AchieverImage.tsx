import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Cropper } from 'react-cropper'
import { AchieverImageCrop } from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'

const AchieverImage = (props: AchieverImageCrop): JSX.Element => {
  // const [imageBase, setimageBase] = useState<string | undefined>()
  const [isImageUploaded, setisImageUploaded] = useState<boolean>(false)
  const [cropper, setCropper] = useState<Cropper>()
  const [fileError, setFileError] = useState<string>('')
  const { onUploadImage, empId, file } = props
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files
    const acceptedImageFileTypes = ['png', 'jpeg', 'jpg', 'PNG', 'JPEG', 'JPG']
    let extension = '' as string
    if (!targetFile) return
    if (targetFile) {
      extension = targetFile[0].name.split('.').pop() as string
    }
    if (!acceptedImageFileTypes.includes(extension)) {
      setFileError(
        'Wrong file format chosen. Please choose either png, jpeg, or jpg.',
      )
      props.setimageBase(undefined)
      setisImageUploaded(false)
      setCropper(undefined)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      props.setimageBase(reader.result as string)
      setisImageUploaded(true)
      setFileError('')
    }
    reader.readAsDataURL(targetFile[0])
  }

  const getCropData = useCallback(() => {
    if (typeof cropper !== 'undefined' && typeof cropper !== null) {
      cropper.getCroppedCanvas().toBlob(() => {
        const prepareFile = props.imageBase
        setTimeout(() => {
          onUploadImage(prepareFile)
        }, 500)
      }, 'image/jpeg')
    }
  }, [cropper, empId, onUploadImage])

  useEffect(() => {
    if (typeof cropper !== 'undefined')
      setTimeout(() => {
        getCropData()
      }, 500)
  }, [cropper, getCropData, props.imageBase])

  return (
    <div>
      {isImageUploaded ? (
        <div className="mt-2 basic-info-box">
          <div id="uploadedImage" className="basic-info-img-preview" />
        </div>
      ) : (
        <div id="profilePicture" className="mt-2 profile-avatar">
          <img className="basic-info-img" src={file} alt="User Profile" />
        </div>
      )}
      <div className="mt-2">
        <input
          type="file"
          className="sh-updateTicket-file cursor-pointer"
          id="fileUpload"
          data-testid="img-up"
          onChange={changeHandler}
          accept=".png, .jpg, .jpeg"
        />
        {fileError && (
          <div data-testid="err">
            <strong className="mt-3 text-danger">{fileError}</strong>
          </div>
        )}
        {isImageUploaded && (
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
              src={props.imageBase}
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
