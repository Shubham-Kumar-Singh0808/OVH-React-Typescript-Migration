import '@testing-library/jest-dom'
import React from 'react'
import SQAAuditHistory from './SQAAuditHistory'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <SQAAuditHistory />
  </div>
)

describe('SQAAuditHistory Component Testing', () => {
  test('should render SQAAuditHistory component with out crashing', () => {
    render(toRender)
    expect(screen.getByText('SQA Audit New Details')).toBeInTheDocument()
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
  })
})
