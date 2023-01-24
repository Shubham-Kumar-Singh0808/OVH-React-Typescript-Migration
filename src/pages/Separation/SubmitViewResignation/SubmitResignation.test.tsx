import '@testing-library/jest-dom'
import React from 'react'
import SubmitResignation from './SubmitResignation'
import { render, screen } from '../../../test/testUtils'

describe('Submit Resignation Component Testing', () => {
  test('should render Submit Resignation component with out crashing', () => {
    render(<SubmitResignation />)

    expect(screen.getByText('Submit Resignation')).toBeInTheDocument()
  })
})
