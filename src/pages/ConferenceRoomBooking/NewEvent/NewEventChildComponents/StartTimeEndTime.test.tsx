import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import StartTimeEndTime from './StartTimeEndTime'
import { render, screen } from '../../../../test/testUtils'

describe('StartTime and EndTime Component', () => {
  beforeEach(() => {
    render(
      <StartTimeEndTime
        onSelectStartAndEndTime={jest.fn()}
        shouldReset={false}
      />,
    )
  })

  test('should able to select values for options for respective select element', () => {
    const startTimeHours = screen.getByTestId('startTimeHours')
    userEvent.selectOptions(startTimeHours, ['01'])
    expect(startTimeHours).toHaveValue('01')

    const startTimeMinutes = screen.getByTestId('startTimeMin')
    userEvent.selectOptions(startTimeMinutes, ['15'])
    expect(startTimeMinutes).toHaveValue('15')

    const startTimeMeridian = screen.getByTestId('startTimeMeridian')
    userEvent.selectOptions(startTimeMeridian, ['AM'])
    expect(startTimeMeridian).toHaveValue('AM')

    const endTimeHour = screen.getByTestId('endTimeHours')
    userEvent.selectOptions(endTimeHour, ['01'])
    expect(endTimeHour).toHaveValue('01')

    const endTimeMinute = screen.getByTestId('endTimeMin')
    userEvent.selectOptions(endTimeMinute, ['15'])
    expect(endTimeMinute).toHaveValue('15')

    const endTimeMeridian = screen.getByTestId('endTimeMeridian')
    userEvent.selectOptions(endTimeMeridian, ['PM'])
    expect(endTimeMeridian).toHaveValue('PM')
  })
})
