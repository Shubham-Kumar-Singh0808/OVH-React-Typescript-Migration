import '@testing-library/jest-dom'
import React from 'react'
import PanDetails from './PanDetails'
import { render, screen } from '../../../test/testUtils'

describe('P.F. & PAN Details Component Testing', () => {
  test('should be able to render P.F. & PAN Details  Title', () => {
    render(<PanDetails />)

    expect(screen.getByText('P.F. & PAN Details')).toBeInTheDocument()
  })
  test('should render P.F. & PAN Details component with out crashing', () => {
    expect(screen.getByText('P.F. A/C No :')).toBeInTheDocument()
    expect(screen.getByText('UAN :')).toBeInTheDocument()
    expect(screen.getByText('Pan Card No :')).toBeInTheDocument()
    expect(screen.getByText('Aadhar Card No :')).toBeInTheDocument()
    expect(screen.getByText('Attachment :')).toBeInTheDocument()
  })
})
