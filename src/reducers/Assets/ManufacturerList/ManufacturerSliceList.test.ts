import ManufacturerListReducer, {
  initialManufacturerListState,
  ManufacturerListService,
} from './ManufacturerSliceList'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  GetAllManufacturerName,
  ManufacturerList,
} from '../../../types/Assets/ManufacturerList/ManufacturerType'
import { mockManufactureGetLookup, mockManufacturerDetails } from '../../../test/data/EditManufacturerMockData'
import { mockManufacturerData } from '../../../test/data/ManufacturerListData'

describe('notification Slice', () => {
  describe('jobOpenings test', () => {
    it('Should be able to set isLoading to "failed" if getManufacturerList is rejected', () => {
      const action = {
        type: ManufacturerListService.getManufacturerList.rejected.type,
        payload: mockManufacturerData,
      }
      const state = ManufacturerListReducer(
        initialManufacturerListState,
        action,
      )
      expect(state).toEqual({
        manufacturerDetails: [],
        getManufacturerList: undefined,
        getAllManufacturerName: {} as GetAllManufacturerName,
        isLoading: ApiLoadingState.idle,
        listSize: 0,
        manufacturerList: {} as ManufacturerList,
      })
    })
  })
  describe('getAllTechnology test', () => {
    it('Should be able to set isLoading to "loading" if getAllLookUps is pending', () => {
      const action = {
        type: ManufacturerListService.getManufacturerList.pending.type,
      }
      const state = ManufacturerListReducer(
        initialManufacturerListState,
        action,
      )
      expect(state).toEqual({
        manufacturerDetails: [],
        getAllManufacturerName: {} as GetAllManufacturerName,
        isLoading: ApiLoadingState.loading,
        listSize: 0,
        manufacturerList: {} as ManufacturerList,
      })
    })

    it('Should be able to set isLoading to "success" if getAllLookUps is fulfilled', () => {
      const action = {
        type: ManufacturerListService.getAllLookUps.fulfilled.type,
        payload: mockManufactureGetLookup,
      }
      const state = ManufacturerListReducer(
        initialManufacturerListState,
        action,
      )
      expect(state).toEqual({
        manufacturerList: mockManufactureGetLookup,
        manufacturerDetails: [],
        getAllManufacturerName: {} as GetAllManufacturerName,
        isLoading: ApiLoadingState.succeeded,
        listSize: 0,
      })
    })
  })
})
