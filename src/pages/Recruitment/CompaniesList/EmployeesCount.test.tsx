import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeesCount from './EmployeesCount'
import { render, screen } from '../../../test/testUtils'

const mockSetTogglePage = jest.fn()

describe('Employees List without data', () => {
  beforeEach(() => {
    render(<EmployeesCount />)
  })
  test('should be able to render Employees List Title', () => {
    expect(screen.getByText('Employees List')).toBeInTheDocument()
  })
  test('should render component with out crashing', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
  })
})
