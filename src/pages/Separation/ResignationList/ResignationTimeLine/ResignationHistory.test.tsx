import '@testing-library/jest-dom'
import React from 'react'
import ResignationHistory from './ResignationHistory'
import { render, screen } from '../../../../test/testUtils'

describe('Resignation History Component Testing', () => {
  test('should render Resignation History component with out crashing', () => {
    render(<ResignationHistory />)
    expect(screen.getByText('Timeline')).toBeInTheDocument()
  })
})
