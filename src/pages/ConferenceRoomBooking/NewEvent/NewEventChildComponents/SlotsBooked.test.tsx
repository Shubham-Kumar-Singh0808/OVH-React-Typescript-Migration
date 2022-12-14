import '@testing-library/jest-dom'
import React from 'react'
import SlotsBooked from './SlotsBooked'
import { mockAllBookedDetailsForEvent } from '../../../../test/data/newEventData'
import { render, screen } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <SlotsBooked />
  </div>
)

describe('SlotsBooked Component Testing with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        newEvent: {
          allBookedDetailsForEvent: mockAllBookedDetailsForEvent,
        },
      },
    })
  })
  screen.debug()
  test('should able to select values for options for respective select element', () => {
    expect(screen.getByText('14/12/2022')).toBeInTheDocument()
    expect(screen.getByText('06:30 PM to 07:30 PM')).toBeInTheDocument()
  })
})
