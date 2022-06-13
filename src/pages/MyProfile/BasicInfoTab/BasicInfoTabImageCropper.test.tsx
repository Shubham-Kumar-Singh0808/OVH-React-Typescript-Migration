import '@testing-library/jest-dom'

import { queryByAttribute, render } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../stateStore'
import BasicInfoTabImageCropper from './BasicInfoTabImageCropper'
import { UploadImage } from '../../../types/apiTypes'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const getById = queryByAttribute.bind(null, 'id')

describe('Basic Info Image Upload Crop Testing', () => {
  it('should not show the image upload preview', () => {
    const component = render(
      <ReduxProvider reduxStore={stateStore}>
        <BasicInfoTabImageCropper
          file={undefined}
          empId={0}
          onUploadImage={function (croppedImageData: UploadImage): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )

    const imageUploadedField = getById(component.container, 'uploadedImage')
    const profilePicture = getById(component.container, 'profilePicture')
    expect(imageUploadedField).toBeFalsy()
    expect(profilePicture).toBeTruthy()
  })
  it('cropper component should not be rendered', () => {
    const component = render(
      <ReduxProvider reduxStore={stateStore}>
        <BasicInfoTabImageCropper
          file={'undefined'}
          empId={0}
          onUploadImage={function (croppedImageData: UploadImage): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    const cropperComponent = getById(component.container, 'cropper')
    expect(cropperComponent).toBeFalsy()
  })
})
