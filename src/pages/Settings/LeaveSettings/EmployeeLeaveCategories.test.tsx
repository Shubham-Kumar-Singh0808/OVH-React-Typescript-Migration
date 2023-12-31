import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import EmployeeLeaveCategories from './EmployeeLeaveCategories'
import stateStore from '../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
describe('Employee Leave Categories Testing', () => {
  render(
    <ReduxProvider reduxStore={stateStore}>
      <EmployeeLeaveCategories
        setToggle={function (): void {
          // eslint-disable-next-line sonarjs/no-duplicate-string
          throw new Error('Function not implemented.')
        }}
      />
    </ReduxProvider>,
  )
  test('should render the "Leave Categories" header', () => {
    const pageTitle = screen.getByRole('heading', { name: 'Leave categories' })
    expect(pageTitle).toBeTruthy()
  })
  test('should render correct number of page records', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeLeaveCategories
          setToggle={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(1)
    })
  })

  test('should render Leave Categories component with out crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeLeaveCategories
          setToggle={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByText('Category')).toBeInTheDocument()
  })
  test('should render no data to display if LeaveCategoryTable is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeLeaveCategories
          setToggle={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('No Records found')).toBeInTheDocument()
    })
  })
  test('should enabled add Leave category button when input is not empty', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeLeaveCategories
          setToggle={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button')).not.toBeDisabled()
  })
})
