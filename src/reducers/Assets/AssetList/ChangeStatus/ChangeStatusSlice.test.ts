import reducer, { changeStatusService } from './ChangeStatusSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockAllAssetListData } from '../../../../test/data/AssetListData'
import {
  ChangeAssetStatusSliceState,
  GetAllAssetResponse,
  SaveEmployee,
} from '../../../../types/Assets/AssetList/ChangeStatusTypes/ChangeStatusTypes'
import { mockSaveEmployee } from '../../../../test/data/saveEmployeeData'

describe('Change Asset Status Slice', () => {
  describe('Reducer', () => {
    const initialAllAssetStatusState = {
      saveEmployee: {} as SaveEmployee,
      getAllAssetResponse: {} as GetAllAssetResponse,
      isLoading: ApiLoadingState.idle,
    } as ChangeAssetStatusSliceState
    it('Should be able to set isLoading to "loading" if `getAllAssets` is pending', () => {
      const action = {
        type: changeStatusService.getAllAssets.pending.type,
      }
      const state = reducer(initialAllAssetStatusState, action)
      expect(state).toEqual({
        saveEmployee: {} as SaveEmployee,
        getAllAssetResponse: {} as GetAllAssetResponse,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `getAllAssets` is fulfilled', () => {
      const action = {
        type: changeStatusService.getAllAssets.fulfilled.type,
        payload: mockAllAssetListData.list,
      }
      const state = reducer(initialAllAssetStatusState, action)
      expect(state).toEqual({
        saveEmployee: {} as SaveEmployee,
        getAllAssetResponse: {} as GetAllAssetResponse,
        isLoading: ApiLoadingState.succeeded,
      })
    })
  })
})
describe('saveEmployee ', () => {
  const initialAllAssetStatusState = {
    saveEmployee: {} as SaveEmployee,
    getAllAssetResponse: {} as GetAllAssetResponse,
    isLoading: ApiLoadingState.idle,
  } as ChangeAssetStatusSliceState
  it('Should be able to set to "loading" if saveEmployee is pending', () => {
    const action = {
      type: changeStatusService.saveEmployee.pending.type,
    }
    const state = reducer(initialAllAssetStatusState, action)
    expect(state).toEqual({
      saveEmployee: {} as SaveEmployee,
      getAllAssetResponse: {} as GetAllAssetResponse,
      isLoading: ApiLoadingState.idle,
    })
  })

  it('Should be able to set to "fullfilled" if saveEmployee is fullfilled', () => {
    const action = {
      type: changeStatusService.saveEmployee.fulfilled.type,
      payload: mockSaveEmployee,
    }
    const state = reducer(initialAllAssetStatusState, action)
    expect(state).toEqual({
      saveEmployee: {},
      getAllAssetResponse: {} as GetAllAssetResponse,
      isLoading: ApiLoadingState.succeeded,
    })
  })
})
