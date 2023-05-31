import reducer, {
  productSpecificationListService,
} from './ProductSpecificationListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  GetProductSpecificationListDetails,
  ProductSpecificationListSliceState,
} from '../../../types/Assets/ProductSpecificationList/ProductSpecificationListTypes'
import { mockProductSpecification } from '../../../test/data/ProductSpecificationListData'

describe('Product Specification List  Slice', () => {
  describe('Reducer', () => {
    const initialProductSpecificationListState = {
      productSpecifications: [],
      getProductSpecificationListDetails:
        {} as GetProductSpecificationListDetails,
      isLoading: ApiLoadingState.idle,
      listSize: 0,
    } as ProductSpecificationListSliceState
    it('Should be able to set isLoading to "loading" if `getProductSpecificationListDetails` is pending', () => {
      const action = {
        type: productSpecificationListService.getProductSpecificationList
          .pending.type,
      }
      const state = reducer(initialProductSpecificationListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        productSpecifications: [],
        getProductSpecificationListDetails:
          {} as GetProductSpecificationListDetails,
        listSize: 0,
      })
    })
    it('Should be able to set isLoading to "success" if `getProductSpecificationListDetails` is fulfilled', () => {
      const action = {
        type: productSpecificationListService.getProductSpecificationList
          .fulfilled.type,
        payload: mockProductSpecification.list,
      }
      const state = reducer(initialProductSpecificationListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        productSpecifications: undefined,
        getProductSpecificationListDetails:
          {} as GetProductSpecificationListDetails,
        listSize: undefined,
      })
    })
  })
})
