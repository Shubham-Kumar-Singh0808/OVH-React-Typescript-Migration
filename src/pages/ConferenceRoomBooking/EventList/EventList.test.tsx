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
describe('EventList Component Testing', () => {
  render(toRender, {
    preloadedState: {
      authentication: {
        authenticatedUser: {
          employeeName: 'admin',
          employeeId: '1983',
          userName: 'admin',
          role: 'admin',
          tenantKey: 'abc',
          token: 'test',
          designation: 'developer',
        },
      },
    },
  })
  screen.debug()
  test('should render EventList Page without crashing', () => {
    expect(screen.getByText('Event List')).toBeInTheDocument()
  })
})
