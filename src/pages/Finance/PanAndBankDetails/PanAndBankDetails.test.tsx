import '@testing-library/jest-dom'
import React from 'react'
import PanAndBankDetails from './PanAndBankDetails'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <PanAndBankDetails />,
  </div>
)
describe('Pan And Bank Details Component Testing', () => {
  test('should render Pan And Bank Details component with out crashing', () => {
    render(toRender)
    expect(screen.getByText('P.F. & PAN Details')).toBeInTheDocument()
  })
})
