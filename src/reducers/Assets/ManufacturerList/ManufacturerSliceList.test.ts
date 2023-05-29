import ManufacturerListReducer, {
  initialManufacturerListState,
  ManufacturerListService,
} from './ManufacturerSliceList'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  GetAllManufacturerName,
  ManufacturerList,
} from '../../../types/Assets/ManufacturerList/ManufacturerType'
import { mockManufacturerData } from '../../../test/data/ManufacturerListData'
import { mockManufactureGetLookup } from '../../../test/data/EditManufacturerMockData'

describe('Manufacturer Slice', () => {
  describe('Manufacturer test', () => {
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
        getAllManufacturerName: {} as GetAllManufacturerName,
        isLoading: ApiLoadingState.loading,
        listSize: 0,
        manufacturerList: {} as ManufacturerList,
      })
    })
  })
  describe('getManufacturerList test', () => {
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
