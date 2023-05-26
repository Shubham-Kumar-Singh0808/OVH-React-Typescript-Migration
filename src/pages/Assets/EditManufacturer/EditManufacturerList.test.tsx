import React from 'react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import EditManufacturerList from './EditManufacturerList'
import { fireEvent, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockManufactureGetLookup,
  mockManufacturerDetails,
} from '../../../test/data/EditManufacturerMockData'

const mockSetData = jest.fn()
describe('Job Openings without data', () => {
  beforeEach(() => {
    render(
      <EditManufacturerList
        setToggle={mockSetData}
        editManufacturerData={{
          manufacturerId: 1,
          manufacturerName: 'Microsoft',
          productId: 14,
          productName: 'MS Office 2008',
          departmentId: 1,
          departmentName: 'Networking',
          createdBy: null,
          updatedBy: null,
          createdDate: null,
          updatedDate: null,
        }}
        setEditManufacturerData={mockSetData}
      />,
      {
        preloadedState: {
          ProductTypeList: {
            isLoading: ApiLoadingState.succeeded,
            manufacturerDetails: mockManufacturerDetails,
          },
        },
      },
    )
  })
  test('should be able to render  edit Manufacturer List Title', () => {
    expect(screen.getByText('Edit Manufacturer Name')).toBeInTheDocument()
  })
  test('should render add Manufacturer component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
  test('should able to click Add Button', () => {
    const addBtnElement = screen.getByRole('button', {
      name: 'Back',
    })
    expect(addBtnElement).toBeEnabled()
    fireEvent.click(addBtnElement)
  })
  test('should be able to click Add button element', () => {
    const AddBtnElement = screen.getByTestId('updateBtn')
    expect(AddBtnElement).toBeInTheDocument()
    fireEvent.click(AddBtnElement)
  })
  test('should render with data ', () => {
    expect(screen.getByText('Product Type:')).toBeInTheDocument()
    expect(screen.getByText('Manufacturer Name')).toBeInTheDocument()
  })
  test('should select Product Name', () => {
    const assetType = screen.getByTestId('form-select')
    fireEvent.change(assetType, ['MS Office 2007'])
    expect(assetType).toHaveValue('')
  })
  test('should render update button as enabled when clicked on edit button', () => {
    expect(screen.getByTestId('updateBtn')).toBeEnabled()
  })
  test('should able to Add input field', () => {
    const productNameInput = screen.getByTestId('form-select')
    fireEvent.change(productNameInput, ['MS Office 2007'])
    expect(productNameInput).toHaveValue('')
    const assetType = screen.getByTestId('manufacturerName')
    userEvent.type(assetType, 'test')

    const updateButton = screen.getByTestId('updateBtn')
    expect(updateButton).toBeEnabled()
  })
})
