import React from 'react'
import '@testing-library/jest-dom'
import AddNewAudit from './AddNewAudit'
import { render, screen } from '../../test/testUtils'

const startTimeHrsInput = 'audit-startTimeHours'
const endTimeHrsInput = 'audit-endTimeHours'
const startTimeMinInput = 'audit-startTimeMin'
const endTimeMinInput = 'audit-endTimeMin'
const startTimeMeridianInput = 'audit-startTimeMeridian'
const endTimeMeridianInput = 'audit-endTimeMeridian'

describe('render all inputs without crashing', () => {
  beforeEach(() => {
    render(<AddNewAudit />)
  })
  test('should render Add Audit Header Text', () => {
    expect(screen.getByText('Add New Audit')).toBeInTheDocument()
  })
  test('should render Save and Submit Buttons', () => {
    const saveBtnElement = screen.getByRole('button', { name: 'Save' })
    expect(saveBtnElement).toBeTruthy()
    const submitBtnElement = screen.getByRole('button', { name: 'Submit' })
    expect(submitBtnElement).toBeTruthy()
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
