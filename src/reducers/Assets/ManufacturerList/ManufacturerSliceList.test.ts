import configureStore, { MockStoreEnhanced } from 'redux-mock-store'
import thunk from 'redux-thunk'
import reducer, { ManufacturerListService } from './ManufacturerSliceList'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import ManufacturerApi from '../../../middleware/Assets/ManufacturerList/ManufacturerListApi'
import {
  GetAllManufacturerName,
  ManufacturerListSliceState,
} from '../../../types/Assets/ManufacturerList/ManufacturerType'
import { mockManufacturerData } from '../../../test/data/ManufacturerListData'

describe('Achievements Slice', () => {
  describe('Achievements Reducer', () => {
    const initialAchievementsState = {
      manufacturerDetails: [],
      getAllManufacturerName: {} as GetAllManufacturerName,
      listSize: 0,
      isLoading: ApiLoadingState.idle,
    } as ManufacturerListSliceState

    it('Should be able to set isLoading to "loading" if getAllAchievements is pending', () => {
      const action = {
        type: ManufacturerListService.getManufacturerList.pending.type,
      }
      const state = reducer(initialAchievementsState, action)
      expect(state).toEqual({
        manufacturerDetails: [],
        getAllManufacturerName: {} as GetAllManufacturerName,
        listSize: 0,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "success" if getAllAchievements is fulfilled', () => {
      const action = {
        type: ManufacturerListService.getManufacturerList.fulfilled.type,
        payload: mockManufacturerData,
      }
      const state = reducer(initialAchievementsState, action)
      expect(state).toEqual({
        manufacturerDetails: undefined,
        getAllManufacturerName: {} as GetAllManufacturerName,
        listSize: undefined,
        isLoading: ApiLoadingState.succeeded,
      })
    })
  })
})
