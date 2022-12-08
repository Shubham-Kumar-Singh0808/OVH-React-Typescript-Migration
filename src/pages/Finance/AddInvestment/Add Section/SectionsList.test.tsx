import '@testing-library/jest-dom'
import React from 'react'
import SectionsList from './SectionsList'
import { render, screen } from '../../../../test/testUtils'

describe('IT Declaration List Component Testing', () => {
  test('should render IT Declaration List component without crashing', () => {
    render(<SectionsList />, {
      preloadedState: {},
    })
    expect(screen.getByText("Section's")).toBeInTheDocument()
  })
})
