import React from 'react'
import userEvent from '@testing-library/user-event'
import EmailConfigTemplateTable from './EmailConfigTemplateTable'
import { render, screen } from '../../../test/testUtils'
import { mockEmailTemplate } from '../../../test/data/employeeMailConfigurationData'

const emailTemplateTableElement = jest.fn()

describe('Email Configuration Template Component Testing with data', () => {
  beforeEach(() => {
    render(
      <EmailConfigTemplateTable
        userDeleteAccess={true}
        userEditAccess={true}
        employeeTemplate={{
          id: 5,
          templateName: 'testing',
          template: 'good testing',
          templateTypeId: 5,
          templateType: 'selinum',
          assetTypeId: '4',
          assetType: 'test',
          email: 'vinesh',
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
        editTemplateButtonHandler={emailTemplateTableElement}
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
  test('should Click on delete button ', () => {
    const deleteElement = screen.getAllByTestId('btn-delete1')
    expect(deleteElement[0]).toBeInTheDocument()
    userEvent.click(deleteElement[0])
    const confirmDeleteBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(confirmDeleteBtn)
    expect(confirmDeleteBtn)
  })
  test('should click on edit button  ', () => {
    const editElement = screen.getAllByTestId('edit-btn22')
    userEvent.click(editElement[0])
    expect(editElement[0]).toBeInTheDocument()
    expect(emailTemplateTableElement).toHaveBeenCalledTimes(1)
  })
  test('should render with table data ', () => {
    expect(screen.getByText('old')).toBeInTheDocument()
    expect(screen.getByText('tyhu')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('Conference Room Booking')).toBeInTheDocument()
    expect(screen.getByText('dmcod')).toBeInTheDocument()
    expect(screen.getByText('Support Management')).toBeInTheDocument()
  })
  test('should render with table record ', () => {
    expect(
      screen.getByText('Total Records: ' + mockEmailTemplate.length),
    ).toBeInTheDocument()
  })
})
