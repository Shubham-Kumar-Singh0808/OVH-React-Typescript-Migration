import '@testing-library/jest-dom'
import React from 'react'
import EditBooking from './EditBooking'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EditBooking />
  </div>
)

describe('EditBooking Component Testing', () => {
  test('should render EditBooking component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Meeting Request Edit')).toBeInTheDocument()
  })
})
