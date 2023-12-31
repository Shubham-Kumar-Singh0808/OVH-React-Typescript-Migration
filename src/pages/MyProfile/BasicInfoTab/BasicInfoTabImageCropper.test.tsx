/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/named */
// Todd: remove eslint and fix error
// Todo: remove eslint and fix all the errors
import '@testing-library/jest-dom'

import { queryByAttribute, render } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import BasicInfoTabImageCropper from './BasicInfoTabImageCropper'
import stateStore from '../../../stateStore'
// import { UploadImage } from '../../../types/apiTypes'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const getById = queryByAttribute.bind(null, 'id')

describe('Basic Info Image Upload Crop Testing', () => {
  describe('No states passed', () => {
    const component = render(
      <ReduxProvider reduxStore={stateStore}>
        <BasicInfoTabImageCropper
          file={'undefined'}
          empId={0}
          onUploadImage={() => {}}
        />
      </ReduxProvider>,
    )
    it('should not show the image upload preview', () => {
      const imageUploadedField = getById(component.container, 'uploadedImage')
      const profilePicture = getById(component.container, 'profilePicture')
      expect(imageUploadedField).toBeFalsy()
      expect(profilePicture).toBeTruthy()
    })
    it('cropper component should not be rendered', () => {
      const cropperComponent = getById(component.container, 'cropper')
      expect(cropperComponent).toBeFalsy()
    })
    it('file upload button should be rendered', () => {
      const fileUpload = getById(component.container, 'fileUpload')
      expect(fileUpload).toBeDefined()
    })
    it('should not show any errors', () => {
      const error = getById(component.container, 'error')
      expect(error).toBeFalsy()
    })
  })
})
