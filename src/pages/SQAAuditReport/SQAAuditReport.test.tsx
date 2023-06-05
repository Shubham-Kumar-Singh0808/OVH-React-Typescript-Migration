import '@testing-library/jest-dom'
import React from 'react'
import SQAAuditReport from './SQAAuditReport'
import { render, screen } from '../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <SQAAuditReport />
  </div>
)

describe('SQAAuditReport Component Testing', () => {
  test('should render SQAAuditReport component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('SQA Audit Report')).toBeInTheDocument()
  })
})
