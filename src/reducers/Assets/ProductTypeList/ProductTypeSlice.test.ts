import ProductTypeListReducer, {
  initialProductTypeSliceState,
  ProductTypeListService,
} from './ProductTypeSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockProductTypeList } from '../../../test/data/ProductTypeListData'

describe('Product Type Slice', () => {
  describe('product Type list test', () => {
    it('Should be able to set isLoading to "loading" if getProductTypeList is pending', () => {
      const action = {
        type: ProductTypeListService.getProductTypeList.pending.type,
      }
      const state = ProductTypeListReducer(initialProductTypeSliceState, action)
      expect(state).toEqual({
        ProductTypeListModel: [],
        listSize: 0,
        isLoading: ApiLoadingState.loading,
        productTypeResponse: { list: [], size: 0 },
      })
    })
    it('Should be able to set isLoading to "loading" if getProductTypeList is rejected', () => {
      const action = {
        type: ProductTypeListService.getProductTypeList.fulfilled.type,
        payload: mockProductTypeList.list,
      }
      const state = ProductTypeListReducer(initialProductTypeSliceState, action)
      expect(state).toEqual({
        ProductTypeListModel: [],
        listSize: undefined,
        isLoading: ApiLoadingState.succeeded,
        productTypeResponse: mockProductTypeList.list,
      })
    })
  })
})
