import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import AddConfigurationOptions from './AddConfigurationOptions'
import { fireEvent, render, screen } from '../../../../test/testUtils'

const mockLevel = jest.fn()
const mockActiveStatus = jest.fn()
const mockServicePeriod = jest.fn()

describe('Add Configuration Component Testing', () => {
  beforeEach(() => {
    render(
      <AddConfigurationOptions
        selectActiveStatus={'false'}
        setSelectActiveStatus={mockActiveStatus}
        level={1}
        setLevel={mockLevel}
        servicePeriod={1}
        setServicePeriod={mockServicePeriod}
      />,
    )
  })

  test('should render Configuration  component with out crashing', () => {
    expect(screen.getByText('Level:')).toBeInTheDocument()
    expect(
      screen.getByText('Minimum Service Period (days):'),
    ).toBeInTheDocument()
  })

  test('should render on  input of Configuration', () => {
    const level = screen.getByPlaceholderText('level')
    userEvent.type(level, '1')
    expect(level).toHaveValue('1')

    const minimumServicePeriod = screen.getByPlaceholderText(
      'Minimum Service Period',
    )
    userEvent.type(minimumServicePeriod, '1')
    expect(minimumServicePeriod).toHaveValue('1')
  })

  test('Radio button should be  "true" or "false"', () => {
    const activeState = screen.getByRole('radio', {
      name: 'Yes',
    }) as HTMLInputElement

    const inactiveState = screen.getByRole('radio', {
      name: 'No',
    }) as HTMLInputElement

    expect(activeState.checked).toEqual(false)
    expect(inactiveState.checked).toEqual(true)

    fireEvent.click(inactiveState)

    expect(activeState.checked).toEqual(false)
  })
})
