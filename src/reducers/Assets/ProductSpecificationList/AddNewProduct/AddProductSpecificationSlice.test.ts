import addProductreducer, {
  addProductService,
  initialAddProductState,
} from './AddProductSpecificationListSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  AddBtnProducts,
  GetAssetTypeListData,
  ManufacturerList,
  UpdateProductSpecificationTypes,
} from '../../../../types/Assets/ProductSpecificationList/AddNewProduct/AddProductSpecificationListTypes'
import {
  mockAddBtnProducts,
  mockAssetTypeData,
  mockProductTypeData,
} from '../../../../test/data/AddProductSpecificationData'

describe('Add Product Specification Slice test', () => {
  describe('getAssetTypeList', () => {
    it('Should be able to set to "loading" if getAssetTypeList is pending', () => {
      const action = {
        type: addProductService.getAssetTypeList.pending.type,
      }
      const state = addProductreducer(initialAddProductState, action)
      expect(state).toEqual({
        assetType: [],
        productType: [],
        isLoading: ApiLoadingState.loading,
        getAssetTypeListData: {} as GetAssetTypeListData,
        assetTypeList: [],
        manufactureList: {} as ManufacturerList,
        updateProductSpecification: {} as UpdateProductSpecificationTypes,
        getAddBtnProducts: {} as AddBtnProducts,
      })
    })

    it('Should be able to set to "loading" if getAssetTypeList is fullfilled', () => {
      const action = {
        type: addProductService.getAssetTypeList.fulfilled.type,
        payload: mockAssetTypeData,
      }
      const state = addProductreducer(initialAddProductState, action)
      expect(state).toEqual({
        assetType: mockAssetTypeData,
        productType: [],
        isLoading: ApiLoadingState.succeeded,
        getAssetTypeListData: {} as GetAssetTypeListData,
        assetTypeList: [],
        manufactureList: {} as ManufacturerList,
        updateProductSpecification: {} as UpdateProductSpecificationTypes,
        getAddBtnProducts: {} as AddBtnProducts,
      })
    })
  })
  describe('getProductTypeList', () => {
    it('Should be able to set to "loading" if getProductTypeList is pending', () => {
      const action = {
        type: addProductService.getProductTypeList.pending.type,
      }
      const state = addProductreducer(initialAddProductState, action)
      expect(state).toEqual({
        assetType: [],
        productType: [],
        isLoading: ApiLoadingState.loading,
        getAssetTypeListData: {} as GetAssetTypeListData,
        assetTypeList: [],
        manufactureList: {} as ManufacturerList,
        updateProductSpecification: {} as UpdateProductSpecificationTypes,
        getAddBtnProducts: {} as AddBtnProducts,
      })
    })

    it('Should be able to set to "fullfilled" if getAssetTypeList is fullfilled', () => {
      const action = {
        type: addProductService.getProductTypeList.fulfilled.type,
        payload: mockProductTypeData,
      }
      const state = addProductreducer(initialAddProductState, action)
      expect(state).toEqual({
        assetType: [],
        productType: mockProductTypeData,
        isLoading: ApiLoadingState.succeeded,
        getAssetTypeListData: {} as GetAssetTypeListData,
        assetTypeList: [],
        manufactureList: {} as ManufacturerList,
        updateProductSpecification: {} as UpdateProductSpecificationTypes,
        getAddBtnProducts: {} as AddBtnProducts,
      })
    })
  })
  describe('addProductSpecifications ', () => {
    it('Should be able to set to "loading" if addProductSpecifications is pending', () => {
      const action = {
        type: addProductService.addProductSpecifications.pending.type,
      }
      const state = addProductreducer(initialAddProductState, action)
      expect(state).toEqual({
        assetType: [],
        productType: [],
        isLoading: ApiLoadingState.idle,
        getAssetTypeListData: {} as GetAssetTypeListData,
        assetTypeList: [],
        manufactureList: {} as ManufacturerList,
        updateProductSpecification: {} as UpdateProductSpecificationTypes,
        getAddBtnProducts: {} as AddBtnProducts,
      })
    })

    it('Should be able to set to "fullfilled" if getAssetTypeList is fullfilled', () => {
      const action = {
        type: addProductService.addProductSpecifications.fulfilled.type,
        payload: mockAddBtnProducts,
      }
      const state = addProductreducer(initialAddProductState, action)
      expect(state).toEqual({
        assetType: [],
        productType: [],
        isLoading: ApiLoadingState.idle,
        getAssetTypeListData: {} as GetAssetTypeListData,
        assetTypeList: [],
        manufactureList: {} as ManufacturerList,
        updateProductSpecification: {} as UpdateProductSpecificationTypes,
        getAddBtnProducts: {},
      })
    })
  })
})
