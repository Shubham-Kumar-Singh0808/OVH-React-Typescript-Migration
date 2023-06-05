import '@testing-library/jest-dom'
import React from 'react'
import AddNominee from './AddNominee'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AddNominee />
  </div>
)

describe('AddNominee Component Testing', () => {
  test('should render AddNominee component with out crashing', () => {
    render(toRender)
    expect(screen.getByText('Add Nominee')).toBeInTheDocument()
  })
})
