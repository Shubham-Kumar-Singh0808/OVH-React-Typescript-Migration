import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ResignationView from './ResignationView'
import { render, screen } from '../../../test/testUtils'

const mockSetToggle = jest.fn()
describe('ResignationView Component Testing', () => {
  test('should render ResignationView component with out crashing', () => {
    render(<ResignationView />)
    expect(screen.getByText('Employee View')).toBeInTheDocument()
    const resignationButtonElement = screen.getByTestId('resignation-btn')
    expect(resignationButtonElement).toBeInTheDocument()
    userEvent.click(resignationButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)
  })
})
