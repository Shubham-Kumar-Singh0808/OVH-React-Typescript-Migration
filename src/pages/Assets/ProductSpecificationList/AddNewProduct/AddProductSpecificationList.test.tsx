import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddProductSpecificationList from './AddProductSpecificationList'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render } from '../../../../test/testUtils'
import {
  GetAssetTypeListData,
  ManufacturerList,
} from '../../../../types/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListTypes'

const mockSetTogglePage = jest.fn()
describe('Job Openings without data', () => {
  beforeEach(() => {
    render(<AddProductSpecificationList />, {
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
      name: 'Back',
    })
    expect(addBtnElement).toBeEnabled()
    userEvent.click(addBtnElement)
  })
})
