import '@testing-library/jest-dom'
import React from 'react'
import ListOfBirthdays from './ListOfBirthdays'
import { render, screen } from '../../../test/testUtils'

describe('List Of Birthdays Component Testing', () => {
  render(<ListOfBirthdays />, {
    preloadedState: {},
  })
  screen.debug()
  test('should render Employee BirthdaysList Page with out crashing', () => {
    expect(screen.getByText('List of Birthdays')).toBeInTheDocument()
  })
})
