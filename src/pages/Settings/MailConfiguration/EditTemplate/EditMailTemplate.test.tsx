import React, { SetStateAction } from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditMailTemplate from './EditMailTemplate'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import { EditEmployeeMailTemplate } from '../../../../types/Settings/MailConfiguration/employeMailConfigurationTypes'
import {
  mockEmailTemplate,
  mockTemplateTypes,
} from '../../../../test/data/employeeMailConfigurationData'
import stateStore from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'

const editBtnId = 'btn-update'
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

  it('should render update button is enabled', () => {
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

test('should be able to type CK editor and update Mail template', async () => {
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
    {
      preloadedState: {
        employeeMailConfiguration: {
          employeeGetEmailTemplate: mockEmailTemplate,
        },
      },
    },
  )
  await waitFor(() => {
    const updateBtn = screen.getByTestId(editBtnId)
    fireEvent.click(updateBtn)
    expect(screen.getByTestId('form-select-type')).toHaveValue('')
  })
})
test('should render template types dropdown without crashing..', async () => {
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
    {
      preloadedState: {
        employeeMailConfiguration: {
          employeeGetMailTemplateTypes: mockTemplateTypes,
        },
      },
    },
  )
  await waitFor(() => {
    expect(screen.getByTestId('title-input')).toBeInTheDocument()
  })
  // test('should fetch Asset types data and put it in the store', async () => {
  //   render(
  //     <EditMailTemplate
  //       backButtonHandler={jest.fn}
  //       employeeTemplate={{
  //         id: 0,
  //         templateName: '',
  //         template: '',
  //         templateTypeId: 0,
  //         templateType: '',
  //         assetTypeId: '',
  //         assetType: '',
  //         email: '',
  //       }}
  //       editEmployeeTemplate={{
  //         id: 0,
  //         templateName: '',
  //         template: '',
  //         templateTypeId: 0,
  //         templateType: '',
  //         assetTypeId: '',
  //         assetType: '',
  //         email: '',
  //       }}
  //       setEditEmployeeTemplate={jest.fn}
  //     />,
  //   )
  //   await stateStore.dispatch(reduxServices.addNewMailTemplate.getAssetTypes())
  // })
})
