import React from 'react'
import EditProductSpecification from './EditProductSpecification'
import '@testing-library/jest-dom'
import { fireEvent, screen, render } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockProductSpecificationList } from '../../../../test/data/ProductSpecificationListData'
import { GetProductSpecificationListDetails } from '../../../../types/Assets/ProductSpecificationList/ProductSpecificationListTypes'

const mockSetTogglePage = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EditProductSpecification
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
      setToggle={jest.fn()}
    />
    ,
  </div>
)
describe('EditProductSpecification FilterOptions Component Testing with data', () => {
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
          productSpecificationList: {
            productSpecifications: mockProductSpecificationList,
            getProductSpecificationListDetails:
              {} as GetProductSpecificationListDetails,
            isLoading: ApiLoadingState.succeeded,
            listSize: 0,
          },
        },
      },
    )
  })

  test('should be able to render  Edit Product Specification  Title', () => {
    expect(screen.getByText('Edit Product Specification')).toBeInTheDocument()
  })
  test('should render add Product Specification back button', () => {
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
  })
  test('should render fields', () => {
    const AssetTypeDropdown = screen.getByTestId('form-select1')
    fireEvent.change(AssetTypeDropdown, ['Hardware'])
    expect(AssetTypeDropdown).toBeInTheDocument()
  })
  test('should select Product type', () => {
    const ProductType = screen.getByTestId('form-select2')
    fireEvent.change(ProductType, ['Aluminium Door'])
    expect(ProductType).toHaveValue('')
  })
  test('should select Manufacturer Name', () => {
    const Manufacturer = screen.getByTestId('form-select3')
    fireEvent.change(Manufacturer, ['Apple'])
    expect(Manufacturer).toHaveValue('')
  })
})
