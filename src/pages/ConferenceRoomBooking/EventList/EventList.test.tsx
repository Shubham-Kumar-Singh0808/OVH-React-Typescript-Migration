import '@testing-library/jest-dom'
import React from 'react'
import EventList from './EventList'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>

    <EventList />
  </div>
)
describe('List Of Birthdays Component Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  screen.debug()
  test('should render EventList Page without crashing', () => {
    expect(screen.getByText('Event List')).toBeInTheDocument()
  })
})
