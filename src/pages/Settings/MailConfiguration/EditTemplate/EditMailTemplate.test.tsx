import React from 'react'
import userEvent from '@testing-library/user-event'
import EditMailTemplate from './EditMailTemplate'
import { mockEmailTemplate } from '../../../../test/data/employeeMailConfigurationData'
import { render, screen } from '../../../../test/testUtils'
import { emailAddress, templateType } from '../../../../test/constants'

const backButtonHandlerElement = jest.fn()
const editTemplateElement = jest.fn()
describe('Email Configuration in edit Template Component Testing with data', () => {
  beforeEach(() => {
    render(
      <EditMailTemplate
        backButtonHandler={backButtonHandlerElement}
        employeeTemplate={{
          id: 5,
          templateName: 'testing',
          template: 'good testing',
          templateTypeId: 11,
          templateType: 'selinum',
          assetTypeId: '4',
          assetType: 'test',
          email: 'vinesh',
        }}
        editEmployeeTemplate={{
          id: 4,
          templateName: 'pen',
          template: 'conference booking',
          templateTypeId: 11,
          templateType: 'food',
          assetTypeId: '7',
          assetType: 'text',
          email: 'testing@gmail.com',
        }}
        setEditEmployeeTemplate={editTemplateElement}
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
  screen.debug()
  test('should render with table data ', () => {
    expect(screen.getByText('Edit Template')).toBeInTheDocument()
    const backButtonElement = screen.getByTestId('back-btn')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(backButtonElement).toHaveValue('')
    expect(backButtonHandlerElement).toHaveBeenCalledTimes(1)
  })
  test('should render template type filter', () => {
    const approvalStatus = screen.findByTestId('form-select-type')
    expect(approvalStatus).toBeTruthy()
    expect(screen.getByTestId('form-select-type')).toBeDisabled()
  })
  test('should render Asset Type filter', () => {
    const approvalStatus = screen.findByTestId('form-select-asset-type')
    expect(approvalStatus).toBeTruthy()
    expect(screen.getByTestId('form-select-asset-type')).toBeDisabled()
  })
  test('should render Emaile filter', () => {
    const approvalStatus = screen.findByTestId('email-address')
    expect(approvalStatus).toBeTruthy()
    expect(screen.getByTestId('email-address')).toBeDisabled()
  })
  test('should render title filter', () => {
    const approvalStatus = screen.findByTestId('title-input')
    expect(approvalStatus).toBeTruthy()
    expect(screen.getByTestId('title-input')).toBeDisabled()
  })
  test('should render Template rich text editor', () => {
    const templateDescription = screen.findByTestId('ckEditor-component')
    expect(templateDescription).toBeTruthy()
  })
  test('should click on update button  ', () => {
    const editElement = screen.getAllByTestId('btn-update')
    userEvent.click(editElement[0])
    expect(editElement[0]).toBeInTheDocument()
    expect(screen.getByTestId('btn-update')).toBeEnabled()
  })
  test('render email input', () => {
    userEvent.selectOptions(screen.getByTestId(templateType), 'food')
    const inputEl = screen.getByTestId(emailAddress)
    expect(inputEl).toBeInTheDocument()
    expect(inputEl).toHaveAttribute('type', 'email')
  })
})
