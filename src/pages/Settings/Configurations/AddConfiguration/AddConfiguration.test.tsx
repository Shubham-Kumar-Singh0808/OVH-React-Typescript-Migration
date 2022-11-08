import { render, screen } from '@testing-library/react'
import React from 'react'
import AddConfiguration from './AddConfiguration'

const mockSetTogglePage = jest.fn()
const saveButton = 'save-btn'
const clearButton = 'clear-btn'

describe('Add Configuration Component Testing', () => {
  beforeEach(() => {
    render(<AddConfiguration setToggle={mockSetTogglePage} />)
  })
  test('should be able to render  Add Configuration  Title', () => {
    expect(screen.getByText('Add Configuration')).toBeInTheDocument()
  })
  test('should render Configuration  component with out crashing', () => {
    expect(screen.getByText('Review Title:')).toBeInTheDocument()
    expect(screen.getByText('Review Type:')).toBeInTheDocument()
    expect(screen.getByText('Review Period From:')).toBeInTheDocument()
    expect(screen.getByText('Review Period To:')).toBeInTheDocument()
    expect(screen.getByText('Review Start Date:')).toBeInTheDocument()
    expect(screen.getByText('Review End Date:')).toBeInTheDocument()
    expect(screen.getByText('Review Duration (days):')).toBeInTheDocument()
    expect(screen.getByText('Level:')).toBeInTheDocument()
    expect(
      screen.getByText('Minimum Service Period (days):'),
    ).toBeInTheDocument()
    expect(screen.getByText('Active:')).toBeInTheDocument()
    expect(screen.getByText('Description:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  test('should render Add button as disabled and Clear Button not disabled initially', () => {
    expect(screen.getByTestId(saveButton)).toBeDisabled()
    expect(screen.getByTestId(clearButton)).toBeEnabled()
  })
  test('should render clear button', () => {
    const clearButton = screen.getByTestId('clear-btn')
    expect(clearButton).toBeEnabled()
  })

  test('should enabled add button when input is not empty', () => {
    expect(screen.getByTestId(clearButton)).not.toBeDisabled()
    expect(screen.getByTestId(saveButton)).toBeDisabled()
  })
})
