import '@testing-library/jest-dom'
import React from 'react'
import { cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddLocationList from './AddLocationList'
import { render, screen } from '../../../../test/testUtils'

const addButton = 'designationButton'
const locationName = 'Name of the Location:'

describe('Add Location List without data', () => {
  beforeEach(() => {
    render(<AddLocationList />)
  })
  afterEach(cleanup)
  test('should render Add LocationList component with out crashing', () => {
    expect(screen.getByText(locationName)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
  })

  test('should be able to render  Location List  Title', () => {
    expect(screen.getByText('Location List')).toBeInTheDocument()
  })

  test('should render Add button as disabled  initially', () => {
    expect(screen.getByTestId(addButton)).toBeDisabled()
  })

  test('should render Location List screen and back button without crashing', () => {
    const backBtn = screen.getByRole('button', { name: 'Back' })
    expect(backBtn).toBeInTheDocument()
    userEvent.click(backBtn)
  })
})
