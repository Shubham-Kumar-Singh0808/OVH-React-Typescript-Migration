import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AddProductSpecificationList from './AddProductSpecificationList'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render, screen } from '../../../../test/testUtils'
import {
  GetAssetTypeListData,
  ManufacturerList,
} from '../../../../types/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListTypes'

const mockSetTogglePage = jest.fn()

describe('Product Specification without data', () => {
  beforeEach(() => {
    render(<AddProductSpecificationList setToggle={jest.fn()} />, {
      preloadedState: {
        addProduct: {
          assetType: [],
          productType: [],
          isLoading: ApiLoadingState.idle,
          getAssetTypeListData: {} as GetAssetTypeListData,
          assetTypeList: [],
          manufactureList: {} as ManufacturerList,
        },
      },
    })
  })
  test('should be able to render  Add Product Specification  Title', () => {
    expect(screen.getByText('Add Product Specification')).toBeInTheDocument()
  })
  test('should render add Product Specification back button', () => {
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
  test('should able to click Add Button', () => {
    const addBtnElement = screen.getByRole('button', {
      name: 'Add',
    })
    expect(addBtnElement).toBeEnabled()
    userEvent.click(addBtnElement)
  })
  test('should be able to click save button element', () => {
    const saveBtnElement = screen.getByTestId('add-btn')
    expect(saveBtnElement).toBeInTheDocument()
    userEvent.click(saveBtnElement)
  })
  test('should be able to click edit button element', () => {
    const clearBtnElement = screen.getByTestId('clear-btn')
    expect(clearBtnElement).toBeInTheDocument()
    userEvent.click(clearBtnElement)
  })
  test('pass comments to test input value', () => {
    render(
      <CKEditor
        initData={process.env.JEST_WORKER_ID !== undefined && <p>Test</p>}
      />,
    )
  })

  test('should enable add button after selecting form option', () => {
    const assetTypeSelect = screen.getByTestId('asset-type')
    userEvent.selectOptions(assetTypeSelect, '')
    expect(assetTypeSelect).toHaveValue('')

    const productTypeSelect = screen.getByTestId('product-type')
    userEvent.selectOptions(productTypeSelect, '')
    expect(productTypeSelect).toHaveValue('')

    const manufacturerSelect = screen.getByTestId('manufacturer-type')
    userEvent.selectOptions(manufacturerSelect, '')
    expect(manufacturerSelect).toHaveValue('')
  })
})
