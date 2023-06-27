import '@testing-library/jest-dom'
import React from 'react'
import ITDeclarationList from './ITDeclarationList'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ITDeclarationList />
  </div>
)

describe('IT Declaration List Component Testing', () => {
  test('should render IT Declaration List component without crashing', () => {
    render(toRender, {
      preloadedState: {
        authentication: {
          authenticatedUser: {
            employeeId: 1990,
          },
        },
      },
    })
    expect(screen.getByText('IT Declaration List')).toBeInTheDocument()
  })
})
