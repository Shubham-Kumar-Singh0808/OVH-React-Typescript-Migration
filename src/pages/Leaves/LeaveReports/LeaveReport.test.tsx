import '@testing-library/jest-dom'
import React from 'react'
import LeaveReport from './LeaveReport'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <LeaveReport />
  </div>
)

describe('Leave Report Component Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  test('should render Leave Report component with out crashing', () => {
    expect(screen.getByText('Leave Reports')).toBeInTheDocument()
  })
})
