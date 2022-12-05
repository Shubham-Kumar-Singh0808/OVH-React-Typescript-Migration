import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeAccounts from './EmployeeAccounts'
import { render, screen } from '../../../test/testUtils'
import { ReduxProvider } from '../../../components/Helper'
import stateStore from '../../../stateStore'

const mockHandleExport = jest.fn()
const searchInputTestId = 'multi-search-btn'

describe('Employee Accounts Table without data', () => {
  beforeEach(() => {
    render(<EmployeeAccounts />)
  })
  test('should be able to render Employee Accounts  Title', () => {
    expect(screen.getByText('Employee Accounts')).toBeInTheDocument()
  })
  test('should able to click "click to to export" button', () => {
    const exportBtn = screen.getByRole('button', { name: 'Click to Export' })
    userEvent.click(exportBtn)
    expect(mockHandleExport).toHaveBeenCalledTimes(0)
  })
  test('multi search button should enable only if we enter the value', () => {
    render(
      <div>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <div id="root">
          <ReduxProvider reduxStore={stateStore}>
            <EmployeeAccounts />
          </ReduxProvider>
        </div>
      </div>,
    )
    expect(screen.getByTestId(searchInputTestId)).not.toBeEnabled()
    userEvent.type(screen.getByPlaceholderText('Multiple Search'), 'Admin')
    expect(screen.getByTestId(searchInputTestId)).toBeEnabled()
  })
})
