import React from 'react'
import '@testing-library/jest-dom'
import EventStartTimeEndTime from './EventStartTimeEndTime'
import { render, screen } from '../../../../test/testUtils'

const startTimeHrsInput = 'event-startTimeHours'
const endTimeHrsInput = 'event-endTimeHours'
const startTimeMinInput = 'event-startTimeMin'
const endTimeMinInput = 'event-endTimeMin'
const startTimeMeridianInput = 'event-startTimeMeridian'
const endTimeMeridianInput = 'event-endTimeMeridian'

describe('render all inputs without crashing', () => {
  beforeEach(() => {
    render(<EventStartTimeEndTime onSelectStartAndEndTime={jest.fn()} />)
  })
  test('should startTime Hrs name Input', () => {
    expect(screen.getByTestId(startTimeHrsInput)).toBeTruthy()
  })
  test('should render startTimeMins Input', () => {
    expect(screen.getByTestId(startTimeMinInput)).toBeTruthy()
  })
  test('should render startTimeMeridian Input', () => {
    expect(screen.getByTestId(startTimeMeridianInput)).toBeTruthy()
  })
  test('should endTime Hrs name Input', () => {
    expect(screen.getByTestId(endTimeHrsInput)).toBeTruthy()
  })
  test('should render endTimeMins Input', () => {
    expect(screen.getByTestId(endTimeMinInput)).toBeTruthy()
  })
  test('should render endTimeMeridian Input', () => {
    expect(screen.getByTestId(endTimeMeridianInput)).toBeTruthy()
  })
})
