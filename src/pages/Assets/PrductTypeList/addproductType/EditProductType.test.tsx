import React from 'react'
import userEvent from '@testing-library/user-event'
import AddProductType from './AddProductType'
import EditProductTypeRecord from './EditProductType'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import '@testing-library/jest-dom'
import { mockProductTypeListGetLookup } from '../../../../test/data/ProductTypeLookupsData'

const mockSetData = jest.fn()
describe('Job Openings without data', () => {
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
          productName: 'MS Office 2010',
          updatedBy: '',
          updatedDate: '',
        }} // backButtonHandler={mockSetData}
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
    const AddBtnElement = screen.getByTestId('save-btn')
    expect(AddBtnElement).toBeInTheDocument()
    fireEvent.click(AddBtnElement)
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
})
