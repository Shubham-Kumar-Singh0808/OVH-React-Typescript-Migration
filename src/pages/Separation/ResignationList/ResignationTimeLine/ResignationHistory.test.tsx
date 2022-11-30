import '@testing-library/jest-dom'
import React from 'react'
import ResignationHistory from './ResignationHistory'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ResignationHistory />,
  </div>
)

describe('Resignation History Component Testing', () => {
  test('should render Resignation History component with out crashing', () => {
    render(toRender)
    expect(screen.getByText('Timeline')).toBeInTheDocument()
  })
})
