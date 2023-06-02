import React from 'react'
import userEvent from '@testing-library/user-event'
import EditProductTypeRecord from './EditProductType'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import '@testing-library/jest-dom'
import { mockProductTypeListGetLookup } from '../../../../test/data/ProductTypeLookupsData'

const mockSetData = jest.fn()
const Product = 'MS Office 2010'
describe('Product type list without data', () => {
  beforeEach(() => {
    render(
      <EditProductTypeRecord
        setToggle={mockSetData}
        setEditProductType={mockSetData}
        EditProductType={{
          assetTypeId: 1,
          assetType: '',
          createdBy: '',
          createdDate: '',
          departmentId: null,
          departmentName: null,
          productId: 0,
          productName: Product,
          updatedBy: '',
          updatedDate: '',
        }}
      />,
      {
        preloadedState: {
          ProductTypeList: {
            manufacturerList: mockProductTypeListGetLookup,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      },
    )
  })
  test('should be able to render Product Type List  Title', () => {
    expect(screen.getByText('Edit Product Type')).toBeInTheDocument()
  })
  test('should render update Product Type with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
  test('should able to click update Button', () => {
    const addBtnElement = screen.getByRole('button', {
      name: 'Back',
    })
    expect(addBtnElement).toBeEnabled()
    fireEvent.click(addBtnElement)
  })
  test('should be able to click update button element', () => {
    const updateBtnElement = screen.getByTestId('save-btn')
    expect(updateBtnElement).toBeInTheDocument()
    fireEvent.click(updateBtnElement)
  })
  test('should render with data ', () => {
    expect(screen.getByText('Asset Type:')).toBeInTheDocument()
    expect(screen.getByText('Product Type:')).toBeInTheDocument()
  })
  test('should select Product Name', () => {
    const assetType = screen.getByTestId('AssetType-test')
    fireEvent.change(assetType, ['Hardware'])
    expect(assetType).toHaveValue('1')
  })
  test('should render on every input of Product Type', async () => {
    const productNameInput = screen.getByTestId('productName')
    fireEvent.change(productNameInput, 'ovh')
    expect(productNameInput).toHaveValue(Product)
    await waitFor(() => {
      expect(productNameInput).toHaveValue(Product)
    })
  })
  test('should render update button as enabled when clicked on edit button', () => {
    expect(screen.getByTestId('save-btn')).toBeEnabled()
  })
  test('should able to Add input field', () => {
    const productNameInput = screen.getByTestId('productName')
    userEvent.type(productNameInput, 'test')
    const assetType = screen.getByTestId('AssetType-test')
    userEvent.selectOptions(assetType, ['Hardware'])
    expect(assetType).toHaveValue('1')
    const updateButton = screen.getByTestId('save-btn')
    expect(updateButton).toBeEnabled()
  })
  test('should call the setToggle function when the back button is clicked', () => {
    const backButton = screen.getByTestId('back-button')
    fireEvent.click(backButton)
    expect(mockSetData).toHaveBeenCalledTimes(1)
    expect(mockSetData).toHaveBeenCalledWith('')
  })
})
