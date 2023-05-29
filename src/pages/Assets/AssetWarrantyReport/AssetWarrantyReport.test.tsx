import '@testing-library/jest-dom'
import React from 'react'
import AssetWarrantyReport from './AssetWarrantyReport'
import { render, screen } from '../../../test/testUtils'

describe('AssetWarrantyReport Component Testing', () => {
  test('should render AssetWarrantyReport component without crashing', () => {
    render(<AssetWarrantyReport />)

    // Update the assertion based on the expected element or text in the component
    expect(screen.getByText('Warranty Asset Report')).toBeInTheDocument()
  })
})
