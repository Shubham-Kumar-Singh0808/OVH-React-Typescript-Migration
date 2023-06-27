import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AssetList from './AssetList'
import { render, screen } from '../../../test/testUtils'

const mockSetToggle = jest.fn()
describe('AssetList Component Testing', () => {
  test('should render AssetList component without crashing', () => {
    render(<AssetList />)
    // Update the assertion based on the expected element or text in the component
    expect(screen.getByText('Asset List')).toBeInTheDocument()
  })
  test('should render  Change Asset component with out crashing', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
})
