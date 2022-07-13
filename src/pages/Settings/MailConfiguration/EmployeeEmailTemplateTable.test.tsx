/* eslint-disable import/named */
import '@testing-library/jest-dom'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import EmployeeEmailTemplateTable from './EmployeeEmailTemplateTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import stateStore from '../../../stateStore'

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
})
