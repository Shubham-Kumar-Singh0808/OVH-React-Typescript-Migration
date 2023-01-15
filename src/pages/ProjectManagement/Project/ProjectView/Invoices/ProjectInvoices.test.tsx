import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectInvoices from './ProjectInvoices'
import { render, screen } from '../../../../../test/testUtils'

const mockSetToggle = jest.fn()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectInvoices />
  </div>
)

describe('ProjectInvoices Testing', () => {
  test('should render ProjectInvoices component with out crashing', () => {
    render(toRender)
    const addButtonElement = screen.getByTestId('add-btn')
    expect(addButtonElement).toBeInTheDocument()
    userEvent.click(addButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
})
