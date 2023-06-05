import React from 'react'
import '@testing-library/jest-dom'
import FromAndToDate from './FromAndToDate'
import { render, screen } from '../../../../test/testUtils'

const toDateInput = 'event-from-date'
const fromDateInput = 'event-to-date'
describe('render all inputs without crashing', () => {
  beforeEach(() => {
    render(<FromAndToDate fromDate={'31/01/2023'} endDate={'31/01/2023'} />)
  })
  test('should render from Date Input', () => {
    expect(screen.getByTestId(fromDateInput)).toBeDisabled()
  })
  test('should render To Date Input', () => {
    expect(screen.getByTestId(toDateInput)).toBeDisabled()
  })
})
