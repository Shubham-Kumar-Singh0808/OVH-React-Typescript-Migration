import '@testing-library/jest-dom'
import React from 'react'
import AssetTransactionalList from './AssetTransactionalList'
import { render, screen } from '../../../test/testUtils'

describe('AssetWarrantyReport Component Testing', () => {
  test('should render Asset Transaction List component without crashing', () => {
    render(<AssetTransactionalList />)

    // Update the assertion based on the expected element or text in the component
    expect(screen.getByText('Asset Transactional History')).toBeInTheDocument()
  })
})
