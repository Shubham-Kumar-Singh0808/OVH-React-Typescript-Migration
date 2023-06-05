import '@testing-library/jest-dom'
import React from 'react'
import SQAViewReport from './SQAViewReport'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <SQAViewReport />
  </div>
)

describe('SQAViewReport Component Testing', () => {
  test('should render SQAViewReport component with out crashing', () => {
    render(toRender)
    expect(screen.getByText('Audit Details')).toBeInTheDocument()
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
  })
})
