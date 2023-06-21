import reducer, { AddAssetListService } from './AddAssetListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  AddEditSliceState,
  UpdateAssetListSliceState,
} from '../../../types/Assets/AssetList/addEditListTypes'
import {
  mockassetData,
  mocktypeChangeSpecifications,
  mockupdateAddAsset,
} from '../../../test/data/AddassetLIstmockData'

describe('Add Asset List  Slice', () => {
  describe('Reducer', () => {
    const initialAddAssetListState = {
      isLoading: ApiLoadingState.idle,
      listSize: 0,
      typeChangeSpecificationsData: [],
    } as AddEditSliceState
    it('Should be able to set isLoading to "loading" if `getAddAssetList` is pending', () => {
      const action = {
        type: AddAssetListService.getAddAssetList.pending.type,
      }
      const state = reducer(initialAddAssetListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        listSize: 0,
        typeChangeSpecificationsData: [],
      } as AddEditSliceState)
    })
    it('Should be able to set isLoading to "success" if `getAddAssetList` is fulfilled', () => {
      const action = {
        type: AddAssetListService.getAddAssetList.fulfilled.type,
        payload: mockassetData,
      }
      const state = reducer(initialAddAssetListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        listSize: 0,
        typeChangeSpecificationsData: [],
      } as AddEditSliceState)
    })
  })

  describe('Reducer', () => {
    const AddAssetListThunk = {
      isLoading: ApiLoadingState.idle,
      listSize: 0,
      typeChangeSpecificationsData: [],
    }
    it('Should be able to set isLoading to "loading" if `checkAssetNumberExist` is pending', () => {
      const action = {
        type: AddAssetListService.checkAssetNumberExist.pending.type,
      }
      const state = reducer(AddAssetListThunk, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        listSize: 0,
        typeChangeSpecificationsData: [],
      } as AddEditSliceState)
    })
    it('Should be able to set isLoading to "success" if `checkAssetNumberExist` is fulfilled', () => {
      const action = {
        type: AddAssetListService.checkAssetNumberExist.fulfilled.type,
      }
      const state = reducer(AddAssetListThunk, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        listSize: 0,
        typeChangeSpecificationsData: [],
      } as AddEditSliceState)
    })
  })
  describe('Reducer', () => {
    const AddAssetListThunk = {
      isLoading: ApiLoadingState.loading,
      listSize: 0,
      typeChangeSpecificationsData: [],
    }
    it('Should be able to set isLoading to "loading" if `typeChangeSpecifications` is pending', () => {
      const action = {
        type: AddAssetListService.typeChangeSpecifications.pending.type,
      }
      const state = reducer(AddAssetListThunk, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        listSize: 0,
        typeChangeSpecificationsData: [],
      } as AddEditSliceState)
    })
    it('Should be able to set isLoading to "success" if `typeChangeSpecifications` is fulfilled', () => {
      const action = {
        type: AddAssetListService.typeChangeSpecifications.fulfilled.type,
        payload: mocktypeChangeSpecifications,
      }
      const state = reducer(AddAssetListThunk, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        listSize: 0,
        typeChangeSpecificationsData: mocktypeChangeSpecifications,
      } as unknown as AddEditSliceState)
    })
  })
})
