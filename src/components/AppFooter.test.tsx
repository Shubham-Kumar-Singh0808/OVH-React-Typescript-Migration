import '@testing-library/jest-dom'
import React from 'react'
import AppFooter from './AppFooter'
import { render, screen } from '../test/testUtils'

describe('App Footer Component Testing', () => {
  test('should render Footer without crashing', () => {
    render(<AppFooter />, {
      preloadedState: {},
    })
    expect(
      screen.getByText('Copyright © Ray Business Technologies 2023'),
    ).toBeInTheDocument()
  })
})
