import '@testing-library/jest-dom'
import React from 'react'
import AchieverList from './AchieverList'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AchieverList />
  </div>
)

describe('Achiever List Testing', () => {
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
  test('should render Achiever List without crashing', () => {
    expect(screen.getByText("Achiever's List")).toBeInTheDocument()
  })
})
