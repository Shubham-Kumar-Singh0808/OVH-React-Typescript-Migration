import '@testing-library/jest-dom'
import React from 'react'
import NewBooking from './NewBooking'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <NewBooking />
  </div>
)

describe('NewBooking Component Testing', () => {
  test('should render NewBooking component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('Meeting Request')).toBeInTheDocument()
  })
})
