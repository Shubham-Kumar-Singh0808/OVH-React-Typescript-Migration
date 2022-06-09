import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import './Demo.css'

const Demo = (prop: any): JSX.Element => {
  const [image, setImage] = useState()
  const [imageUploaded, setImageUploaded] = useState<boolean>(false)
  const [cropData, setCropData] = useState('#')
  const [cropper, setCropper] = useState<any>()
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result as any)
      setImageUploaded(true)
    }
    reader.readAsDataURL(file[0])
  }

  const getCropData = () => {
    console.log('called')
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL())
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
