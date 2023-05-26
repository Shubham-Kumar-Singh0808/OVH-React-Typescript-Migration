import React, { SetStateAction } from 'react'
import userEvent from '@testing-library/user-event'
import EditManufacturerList from './EditManufacturerList'
import { mockManufactureGetLookup } from '../../../test/data/EditManufacturerMockData'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { fireEvent, render, screen } from '../../../test/testUtils'

const mockSetData = jest.fn()
describe('Job Openings without data', () => {
  beforeEach(() => {
    render(
      <EditManufacturerList
        setToggle={mockSetData}
        editManufacturerData={{
          manufacturerId: 0,
          manufacturerName: '',
          productId: 0,
          productName: '',
          departmentId: null,
          departmentName: null,
          createdBy: '',
          updatedBy: '',
          createdDate: '',
          updatedDate: '',
        }}
        setEditManufacturerData={mockSetData}
      />,
      {
        preloadedState: {
          ProductTypeList: {
            manufacturerList: mockManufactureGetLookup,
            isLoading: ApiLoadingState.succeeded,
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
  test('should be able to click edit button element', () => {
    const deleteBtnElement = screen.getByTestId('updateBtn')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
  test('should render component with out crashing', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetData).toHaveBeenCalledTimes(1)
  })
  test('should render with data ', () => {
    expect(screen.getByText('Product Type:')).toBeInTheDocument()
    expect(screen.getByText('Manufacturer Name')).toBeInTheDocument()
  })
  test('should select Product type', () => {
    const ProductType = screen.getByTestId('form-select')
    fireEvent.change(ProductType, ['Books'])
    expect(ProductType).toHaveValue('')
  })
  test('should able to Add input field', () => {
    const productNameInput = screen.getByTestId('productName')
    userEvent.type(productNameInput, 'test')
    const updateButton = screen.getByTestId('updateBtn')
    expect(updateButton).toBeDisabled()
  })
})
