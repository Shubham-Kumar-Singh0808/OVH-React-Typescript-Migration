import '@testing-library/jest-dom'
import React from 'react'
import AssetList from './AssetList'
import { render, screen } from '../../../test/testUtils'

describe('AssetList Component Testing', () => {
  test('should render AssetList component without crashing', () => {
    render(<AssetList />)
    // Update the assertion based on the expected element or text in the component
    expect(screen.getByText('Asset List')).toBeInTheDocument()
  })
})
