/* eslint-disable import/named */
import '@testing-library/jest-dom'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeEmailTemplateTable from './EmployeeEmailTemplateTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import stateStore from '../../../stateStore'
import { mockEmailTemplate } from '../../../test/data/employeeMailConfigurationData'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
describe('email Template List Table Testing', () => {
  test('should render No data to display if Mail template is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeEmailTemplateTable
          employeeTemplate={{
            id: 0,
            templateName: '',
            template: '',
            templateTypeId: '',
          }}
        />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('No Records found...')).toBeInTheDocument()
    })
  })
  test('should render correct number of page records', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeEmailTemplateTable
          employeeTemplate={{
            id: 0,
            templateName: '',
            template: '',
            templateTypeId: '',
          }}
        />
      </ReduxProvider>,
    )

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(1)
    })
  })
  test('should render Email Template details table component without crashing', () => {
    render(
      <EmployeeEmailTemplateTable
        employeeTemplate={{
          id: 0,
          templateName: '',
          template: '',
          templateTypeId: '',
        }}
      />,
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
  })
describe('Email Template component with data', () => {
  beforeEach(() => {
    render(<EmployeeEmailTemplateTable
      employeeTemplate={{
        id: 70,
        templateName: 'old',
        template: 'tyhu',
        templateTypeId: '5',
      }}
    />, {
      preloadedState: {
        employeeMailConfiguration: {
          employeeGetEmailTemplate: mockEmailTemplate,
        },
      },
    })
  })
  test('should render delete button', () => {
    expect(screen.getByTestId('btn-delete0')).toHaveClass(
      'btn btn-danger btn-ovh me-2',
    )
  })
 
  it('should render Delete modal on clicking delete button from Actions', async () => {
    const deleteButtonElement = screen.getByTestId('btn-delete1')
    userEvent.click(deleteButtonElement)    
    await waitFor(() => {
      expect(screen.getByText('Delete Template')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
    })
  })
 
  it('should close the modal on clicking No button from the popup', async () => {
    const deleteButtonElement = screen.getByTestId('btn-delete0')
    userEvent.click(deleteButtonElement)
    const yesButtonElement = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(yesButtonElement)
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(3)
    })
  })
  it('should render template modal on clicking link from Actions', async () => {
    const deleteButtonElement = screen.getByTestId('mail-lin0')
    userEvent.click(deleteButtonElement)    
    await waitFor(() => {
      expect(screen.getByText('Template model')).toBeInTheDocument()
      })
  })
})
})
