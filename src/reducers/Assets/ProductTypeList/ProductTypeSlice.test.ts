import ProductTypeListReducer, {
  initialProductTypeSliceState,
  ProductTypeListService,
} from './ProductTypeSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockProductTypeList } from '../../../test/data/ProductTypeListData'
import { ManufacturerList } from '../../../types/Assets/ProductTypeList/addproducttype/AddProductType'
import { mockProductTypeListGetLookup } from '../../../test/data/ProductTypeLookupsData'

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
        manufacturerList: {} as ManufacturerList,
      })
    })
    it('Should be able to set isLoading to "loading" if getProductTypeList is rejected', () => {
      const action = {
        type: ProductTypeListService.getProductTypeList.fulfilled.type,
        payload: mockProductTypeList,
      }
      const state = ProductTypeListReducer(initialProductTypeSliceState, action)
      expect(state).toEqual({
        ProductTypeListModel: [],
        listSize: 167,
        isLoading: ApiLoadingState.succeeded,
        productTypeResponse: mockProductTypeList,
        manufacturerList: {} as ManufacturerList,
      })
    })
    it('Should be able to set isLoading to "loading" if getProductTypeList is pending', () => {
      const action = {
        type: ProductTypeListService.getAllLookUpsApi.pending.type,
      }
      const state = ProductTypeListReducer(initialProductTypeSliceState, action)
      expect(state).toEqual({
        ProductTypeListModel: [],
        listSize: 0,
        isLoading: ApiLoadingState.idle,
        productTypeResponse: { list: [], size: 0 },
        manufacturerList: {} as ManufacturerList,
      })
    })
    it('Should be able to set isLoading to "loading" if getProductTypeList is rejected', () => {
      const action = {
        type: ProductTypeListService.getAllLookUpsApi.fulfilled.type,
        payload: mockProductTypeListGetLookup,
      }
      const state = ProductTypeListReducer(initialProductTypeSliceState, action)
      expect(state).toEqual({
        ProductTypeListModel: [],
        listSize: 0,
        isLoading: ApiLoadingState.succeeded,
        manufacturerList: mockProductTypeListGetLookup,
        productTypeResponse: { list: [], size: 0 },
      })
    })
  })
})
