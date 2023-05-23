import reducer, { addProductService } from './AddProductSpecificationListSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  GetAssetTypeListData,
  ManufacturerList,
} from '../../../../types/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListTypes'

describe('Add Product Specification Slice test', () => {
  it('Should be able to set isLoading to "loading" if      is pending', () => {
    const action = {
      type: addProductService.getAssetTypeList.pending.type,
    }
    const state = reducer(initialAddProductState, action)
    expect(state).toEqual({
      assetType: [],
      productType: [],
      isLoading: ApiLoadingState.idle,
      getAssetTypeListData: {} as GetAssetTypeListData,
      assetTypeList: [],
      manufactureList: {} as ManufacturerList,
    })
  })

  it('Should be able to set isLoading to "success" if getAllTechnology is fulfilled', () => {
    const action = {
      type: addProductService.getAssetTypeList.fulfilled.type,
      payload: ,
    }
    const state = reducer(initialAddProductState, action)
    expect(state).toEqual({
      assetType: [],
      productType: [],
      isLoading: ApiLoadingState.idle,
      getAssetTypeListData: {} as GetAssetTypeListData,
      assetTypeList: [],
      manufactureList: {} as ManufacturerList,
    })
  })
})
