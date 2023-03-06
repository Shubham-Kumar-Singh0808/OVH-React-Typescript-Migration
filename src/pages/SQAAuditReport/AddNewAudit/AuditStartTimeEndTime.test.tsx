import React from 'react'
import '@testing-library/jest-dom'
import AuditStartTimeEndTime from './AuditStartTimeEndTime'
import { render, screen } from '../../../test/testUtils'

const startTimeHrsInput = 'audit-startTimeHours'
const endTimeHrsInput = 'audit-endTimeHours'
const startTimeMinInput = 'audit-startTimeMin'
const endTimeMinInput = 'audit-endTimeMin'
const startTimeMeridianInput = 'audit-startTimeMeridian'
const endTimeMeridianInput = 'audit-endTimeMeridian'

describe('render all inputs without crashing', () => {
  beforeEach(() => {
    render(<AuditStartTimeEndTime onSelectStartAndEndTime={jest.fn()} />)
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
