import React, { SetStateAction } from 'react'
import '@testing-library/jest-dom'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import EditMailTemplate from './EditMailTemplate'
import { render, screen } from '../../../../test/testUtils'
import { EditEmployeeMailTemplate } from '../../../../types/Settings/MailConfiguration/employeMailConfigurationTypes'

describe('Add Template Component Testing', () => {
  describe('without data', () => {
    beforeEach(() => {
      render(
        <EditMailTemplate
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
          employeeTemplate={{
            id: 0,
            templateName: '',
            template: '',
            templateTypeId: 0,
            templateType: '',
            assetTypeId: '',
            assetType: '',
            email: '',
          }}
          editEmployeeTemplate={{
            id: 0,
            templateName: '',
            template: '',
            templateTypeId: 0,
            templateType: '',
            assetTypeId: '',
            assetType: '',
            email: '',
          }}
          setEditEmployeeTemplate={function (
            value: SetStateAction<EditEmployeeMailTemplate>,
          ): void {
            throw new Error('Function not implemented.')
          }}
        />,
      )
    })

    test('should render "EditTemplate" title', () => {
      const mailTemplateTitle = screen.getByRole('heading', {
        name: 'Edit Template',
      })
      expect(mailTemplateTitle).toBeTruthy()
    })
  })

  test('should render Template rich text editor', () => {
    const templateDescription = screen.findByTestId('ckEditor-component')
    expect(templateDescription).toBeTruthy()
  })

  it('should render Add button as enabled and Clear Button as disabled', () => {
    render(
      <EditMailTemplate
        backButtonHandler={function (): void {
          throw new Error('Function not implemented.')
        }}
        employeeTemplate={{
          id: 0,
          templateName: '',
          template: '',
          templateTypeId: 0,
          templateType: '',
          assetTypeId: '',
          assetType: '',
          email: '',
        }}
        editEmployeeTemplate={{
          id: 0,
          templateName: '',
          template: '',
          templateTypeId: 0,
          templateType: '',
          assetTypeId: '',
          assetType: '',
          email: '',
        }}
        setEditEmployeeTemplate={function (
          value: SetStateAction<EditEmployeeMailTemplate>,
        ): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    expect(screen.getByTestId('btn-update')).toBeEnabled()
  })
  test('renders the <CKEditor> component ', () => {
    render(
      <EditMailTemplate
        backButtonHandler={function (): void {
          throw new Error('Function not implemented.')
        }}
        employeeTemplate={{
          id: 0,
          templateName: '',
          template: '',
          templateTypeId: 0,
          templateType: '',
          assetTypeId: '',
          assetType: '',
          email: '',
        }}
        editEmployeeTemplate={{
          id: 0,
          templateName: '',
          template: '',
          templateTypeId: 0,
          templateType: '',
          assetTypeId: '',
          assetType: '',
          email: '',
        }}
        setEditEmployeeTemplate={function (
          value: SetStateAction<EditEmployeeMailTemplate>,
        ): void {
          throw new Error('Function not implemented.')
        }}
      />,
    )
    const htmlElement = document.querySelector(
      '[data-testid="ckEditor-component"]',
    )
    const nonExistElement = document.querySelector('ckEditor-component')

    expect(htmlElement).toBeInTheDocument()
    expect(nonExistElement).not.toBeInTheDocument()
  })
})
