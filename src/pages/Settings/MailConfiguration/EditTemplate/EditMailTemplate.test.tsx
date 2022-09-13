import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditMailTemplate from './EditMailTemplate'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import {
  mockEmailTemplate,
  mockTemplateTypes,
} from '../../../../test/data/employeeMailConfigurationData'
import { emailAddress, templateType } from '../../../../test/constants'

const editBtnId = 'btn-update'
const mockBackButtonHandler = jest.fn()
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
    test('should render Template rich text editor', () => {
      const templateDescription = screen.findByTestId('ckEditor-component')
      expect(templateDescription).toBeTruthy()
    })
    test('renders the <CKEditor> component ', () => {
      const htmlElement = document.querySelector(
        '[data-testid="ckEditor-component"]',
      )
      const nonExistElement = document.querySelector('ckEditor-component')

      expect(htmlElement).toBeInTheDocument()
      expect(nonExistElement).not.toBeInTheDocument()
    })
    it('should render update button is enabled', () => {
      expect(screen.getByTestId('btn-update')).toBeEnabled()
    })
    it('should fetch asset types dropdown data and email input field', () => {
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
    test('should render back button', () => {
      const backButton = screen.getByTestId('back-btn')
      expect(backButton).toBeTruthy()
    })
    test('should able to click back button', () => {
      const backBtnElement = screen.getByRole('button', { name: 'Back' })
      userEvent.click(backBtnElement)
      expect(mockBackButtonHandler).toBeCalledTimes(0)
    })
  })
})

describe('with data', async () => {
  // eslint-disable-next-line require-await
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
  })
  await waitFor(() => {
    const updateBtn = screen.getByTestId(editBtnId)
    fireEvent.click(updateBtn)
    expect(screen.getByTestId('form-select-type')).toHaveValue('')
  })
  test('render email input', () => {
    userEvent.selectOptions(screen.getByTestId(templateType), '11')
    const inputEl = screen.getByTestId(emailAddress)
    expect(inputEl).toBeInTheDocument()
    expect(inputEl).toHaveAttribute('type', 'email')
  })

  test('pass invalid email to test input value', async () => {
    userEvent.selectOptions(screen.getByTestId('form-select-type'), '11')

    const inputEl = screen.getByTestId('email-address')
    userEvent.type(inputEl, 'test')
    await waitFor(() => {
      expect(screen.getByTestId('email-address')).toHaveValue('test')
      expect(screen.queryByTestId('error-msg')).toBeInTheDocument()
      expect(screen.queryByTestId('error-msg')?.textContent).toEqual(
        'Enter a valid Email address.For multiple mail ids use,without space!!',
      )
    })
  })
})
