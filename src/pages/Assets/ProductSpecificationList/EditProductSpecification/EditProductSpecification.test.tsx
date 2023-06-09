import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditProductSpecification from './EditProductSpecification'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render, screen } from '../../../../test/testUtils'
import {
  GetAssetTypeListData,
  ManufacturerList,
} from '../../../../types/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListTypes'

const mockSetTogglePage = jest.fn()

describe('Job Openings without data', () => {
  beforeEach(() => {
    render(
      <EditProductSpecification
        setToggle={jest.fn()}
        editProductSpecification={{
          id: 0,
          productId: 0,
          productName: '',
          manufacturerId: 0,
          manufacturerName: '',
          assetTypeId: 0,
          assetType: '',
          productSpecification: '',
          createdBy: '',
          createdDate: '',
          updatedBy: '',
          updatedDate: '',
          departmentId: null,
          departmentName: null,
          roleId: null,
        }}
        setEditProductSpecification={mockSetTogglePage}
      />,
      {
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
      },
    )
  })
  test('should be able to render  Add Product Specification  Title', () => {
    expect(screen.getByText('Edit Product Specification')).toBeInTheDocument()
  })
  test('should render add Product Specification back button', () => {
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
  test('should able to click Add Button', () => {
    const addBtnElement = screen.getByRole('button', {
      name: 'Back',
    })
    expect(addBtnElement).toBeEnabled()
    userEvent.click(addBtnElement)
  })
})
