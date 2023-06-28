import '@testing-library/jest-dom'
import React from 'react'
import AssetList from './AssetList'
import ChangeAssetStatus from './ChangeAssetStatus/ChangeAssetStatus'
import { render, screen } from '../../../test/testUtils'
import { mockChangeAssetData } from '../../../test/data/AssetListData'

const mockSetToggle = jest.fn()
describe('AssetList Component Testing', () => {
  test('should render AssetList component without crashing', () => {
    render(<AssetList />)
    // Update the assertion based on the expected element or text in the component
    expect(screen.getByText('Asset List')).toBeInTheDocument()
  })

  test('should render AssetList component without crashing', () => {
    render(
      <ChangeAssetStatus
        setToggle={mockSetToggle}
        changeReportStatus={mockChangeAssetData}
        setChangeReportStatus={jest.fn()}
      />,
    )
  })
})
