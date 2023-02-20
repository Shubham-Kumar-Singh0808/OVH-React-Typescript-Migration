import React from 'react'
import '@testing-library/jest-dom'
import EditAuditStartTimeEndTime from './EditAuditStartTimeEndTime'
import { render, screen } from '../../../test/testUtils'

const auditStartTimeHrsInput = 'editAudit-startTimeHours'
const auditEndTimeHrsInput = 'editAudit-endTimeHours'
const auditStartTimeMinInput = 'editAudit-startTimeMin'
const auditEndTimeMinInput = 'editAudit-endTimeMin'
const auditStartTimeMeridianInput = 'editAudit-startTimeMeridian'
const auditEndTimeMeridianInput = 'editAudit-endTimeMeridian'

describe('render all inputs without crashing', () => {
  beforeEach(() => {
    render(
      <EditAuditStartTimeEndTime onSelectAuditStartAndEndTime={jest.fn()} />,
    )
  })
  test('should startTime Hrs name Input', () => {
    expect(screen.getByTestId(auditStartTimeHrsInput)).toBeTruthy()
  })
  test('should render startTimeMins Input', () => {
    expect(screen.getByTestId(auditStartTimeMinInput)).toBeTruthy()
  })
  test('should render startTimeMeridian Input', () => {
    expect(screen.getByTestId(auditStartTimeMeridianInput)).toBeTruthy()
  })
  test('should endTime Hrs name Input', () => {
    expect(screen.getByTestId(auditEndTimeHrsInput)).toBeTruthy()
  })
  test('should render endTimeMins Input', () => {
    expect(screen.getByTestId(auditEndTimeMinInput)).toBeTruthy()
  })
  test('should render endTimeMeridian Input', () => {
    expect(screen.getByTestId(auditEndTimeMeridianInput)).toBeTruthy()
  })
})
