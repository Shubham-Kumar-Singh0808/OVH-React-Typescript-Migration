/* eslint-disable no-duplicate-imports */
/* eslint-disable import/no-duplicates */
import assetListSliceReducer, {
  assetListService,
  initialAssetTypeChangeListState,
} from './AssetListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ManufacturerList } from '../../../types/Assets/AssetList/AssetListTypes'
import {
  mockAllAssetListData,
  mockAssetTypeChangeList,
} from '../../../test/data/AssetListData'
import { mockAssetHistory } from '../../../test/data/assetHistoryData'

describe('Asset List Slice', () => {
  describe('Asset List test', () => {
    it('Should set isLoading to "loading" when getAssets is pending', () => {
      const action = assetListService.getAllAssetListData.pending
      const state = assetListSliceReducer(
        initialAssetTypeChangeListState,
        action,
      )
      expect(state).toEqual({
        asset: [],
        isLoading: ApiLoadingState.idle,
        manufacturerList: {} as ManufacturerList,
        allAssetList: [],
        listSize: 0,
        assetHistoryList: [],
        currentPage: 1,
        pageSize: 20,
      })
    })
    it('Should set isLoading to "loading" when getAssets is pending testing', () => {
      const action = assetListService.getAssetTypeChangeList.pending
      const state = assetListSliceReducer(
        initialAssetTypeChangeListState,
        action,
      )
      expect(state).toEqual({
        asset: [],
        isLoading: ApiLoadingState.loading,
        manufacturerList: {} as ManufacturerList,
        allAssetList: [],
        listSize: 0,
        assetHistoryList: [],
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should set isLoading to "loading" when asset History is pending testing', () => {
      const action = assetListService.getAllAssetHistoryData.pending
      const state = assetListSliceReducer(
        initialAssetTypeChangeListState,
        action,
      )
      expect(state).toEqual({
        asset: [],
        isLoading: ApiLoadingState.loading,
        manufacturerList: {} as ManufacturerList,
        allAssetList: [],
        listSize: 0,
        assetHistoryList: [],
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should set isLoading to "loading" when getAssets is fullfilled', () => {
      const action = {
        type: assetListService.getAllAssetListData.fulfilled.type,
        payload: mockAssetTypeChangeList,
      }

      const state = assetListSliceReducer(
        initialAssetTypeChangeListState,
        action,
      )
      expect(state).toEqual({
        asset: [],
        isLoading: ApiLoadingState.succeeded,
        manufacturerList: {} as ManufacturerList,
        allAssetList: undefined,
        listSize: undefined,
        assetHistoryList: [],
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should set isLoading to "success" when getAssets type change is fulfilled', () => {
      const action = assetListService.getAssetTypeChangeList.fulfilled
      const state = assetListSliceReducer(
        initialAssetTypeChangeListState,
        action,
      )
      expect(state).toEqual({
        asset: undefined,
        isLoading: ApiLoadingState.succeeded,
        manufacturerList: {} as ManufacturerList,
        allAssetList: [],
        listSize: 0,
        assetHistoryList: [],
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should set isLoading to "success" when Asset history data is fulfilled', () => {
      const action = {
        type: assetListService.getAllAssetHistoryData.fulfilled.type,
        payload: mockAssetHistory,
      }
      const state = assetListSliceReducer(
        initialAssetTypeChangeListState,
        action,
      )
      expect(state).toEqual({
        asset: [],
        isLoading: ApiLoadingState.succeeded,
        manufacturerList: {} as ManufacturerList,
        allAssetList: [],
        listSize: 0,
        assetHistoryList: mockAssetHistory,
        currentPage: 1,
        pageSize: 20,
      })
    })
  })
})
