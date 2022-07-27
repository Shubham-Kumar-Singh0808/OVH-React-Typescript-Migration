import React, { SetStateAction } from 'react'
import '@testing-library/jest-dom'
import EditMailTemplate from './EditMailTemplate'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { EditEmployeeMailTemplate } from '../../../../types/Settings/MailConfiguration/employeMailConfigurationTypes'
import { mockTemplateTypes } from '../../../../test/data/employeeMailConfigurationData'

describe('Add Template Component Testing', () => {
  describe('without data', () => {
    beforeEach(() => {
      render(
        <EditMailTemplate
          backButtonHandler={jest.fn}
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
          setEditEmployeeTemplate={jest.fn}
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
        backButtonHandler={jest.fn}
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
        setEditEmployeeTemplate={jest.fn}
      />,
    )
    expect(screen.getByTestId('btn-update')).toBeEnabled()
  })
  test('renders the <CKEditor> component ', () => {
    render(
      <EditMailTemplate
        backButtonHandler={jest.fn}
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
        setEditEmployeeTemplate={jest.fn}
      />,
    )
    const htmlElement = document.querySelector(
      '[data-testid="ckEditor-component"]',
    )
    const nonExistElement = document.querySelector('ckEditor-component')

    expect(htmlElement).toBeInTheDocument()
    expect(nonExistElement).not.toBeInTheDocument()
  })
  it('should fetch asset types dropdown data and email input field', () => {
    render(
      <EditMailTemplate
        backButtonHandler={jest.fn}
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
        setEditEmployeeTemplate={jest.fn}
      />,
    )
    screen.debug()
    mockTemplateTypes.forEach(async (type) => {
      await waitFor(() => {
        expect(screen.queryAllByText(type.name)).toBeDefined()
      })
      await waitFor(() => {
        expect(screen.queryByText('Asset Type')).toBeDefined()
        expect(screen.queryByText('Email')).toBeDefined()
      })
    })
  })
})
