import React from 'react'
import userEvent from '@testing-library/user-event'
import AddProductType from './AddProductType'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import '@testing-library/jest-dom'
import { mockProductTypeListGetLookup } from '../../../../test/data/ProductTypeLookupsData'

const mockSetData = jest.fn()
describe('Product type list without data', () => {
  beforeEach(() => {
    render(<AddProductType setToggle={mockSetData} />, {
      preloadedState: {
        ProductTypeList: {
          manufacturerList: mockProductTypeListGetLookup,
          isLoading: ApiLoadingState.succeeded,
        },
      },
    })
  })
  test('should be able to render Product Type List  Title', () => {
    expect(screen.getByText('Add Product Type')).toBeInTheDocument()
  })
  test('should render add Add Product Type with out crashing', () => {
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
    const AddBtnElement = screen.getByTestId('Add-btn')
    expect(AddBtnElement).toBeInTheDocument()
    fireEvent.click(AddBtnElement)
  })
  test('should be able to click clear button element', () => {
    const ClearBtnElement = screen.getByTestId('btn-Clear')
    expect(ClearBtnElement).toBeInTheDocument()
    fireEvent.click(ClearBtnElement)
  })
  test('should render Add button as disabled  initially', () => {
    expect(screen.getByTestId('Add-btn')).toBeDisabled()
  })
  test('should select Product Name', () => {
    const assetType = screen.getByTestId('AssetType-test')
    fireEvent.change(assetType, ['Hardware'])
    expect(assetType).toHaveValue('')
  })
  test('should render with data ', () => {
    expect(screen.getByText('Asset Type:')).toBeInTheDocument()
    expect(screen.getByText('Product Type:')).toBeInTheDocument()
  })
  test('should render on every input of Product Type', async () => {
    const productNameInput = screen.getByTestId('productName')
    fireEvent.change(productNameInput, 'ovh')
    expect(productNameInput).toHaveValue('')
    await waitFor(() => {
      expect(productNameInput).toHaveValue('')
    })
  })
  test('should able to Add input field', () => {
    const productNameInput = screen.getByTestId('productName')
    userEvent.type(productNameInput, 'test')
    const assetType = screen.getByTestId('AssetType-test')
    userEvent.selectOptions(assetType, ['Hardware'])
    expect(assetType).toHaveValue('1')
    const addButton = screen.getByTestId('Add-btn')
    expect(addButton).toBeEnabled()
  })
  test('should call the setToggle function when the back button is clicked', () => {
    const backButton = screen.getByTestId('back-Button')
    fireEvent.click(backButton)
    expect(mockSetData).toHaveBeenCalledTimes(1)
    expect(mockSetData).toHaveBeenCalledWith('')
  })
})
