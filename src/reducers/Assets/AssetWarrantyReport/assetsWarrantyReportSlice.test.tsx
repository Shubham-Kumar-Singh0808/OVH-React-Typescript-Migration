import assetsWarrantyListSliceReducer, {
  assetsWarrantyListService,
  initialAssetsWarrantyListState,
} from './assetsWarrantyReportSlice'
// import { GetWarrantyAssetsList } from '../../../types/Assets/AssetWarrantyreport/AssetWarrantyReportTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { GetWarrantyAssetsList } from '../../../types/Assets/AssetWarrantyreport/AssetWarrantyReportTypes'
import { mockAttendanceReport } from '../../../test/data/attendanceReportData'

describe('AssetWaranty Slice', () => {
  describe('AssetWaranty test', () => {
    it('Should be able to set isLoading to "loading" if getAssets is pending', () => {
      const action = {
        type: assetsWarrantyListService.getAssetsWarrantyList.pending.type,
      }
      const state = assetsWarrantyListSliceReducer(
        initialAssetsWarrantyListState,
        action,
      )
      expect(state).toEqual({
        // warrantyAssetsDetails: []
        warrantyAssetsDetails: mockAttendanceReport,
        listSize: 0,
        isLoading: ApiLoadingState.idle,
        getWarrantyAssetsList: {} as GetWarrantyAssetsList,
      })
    })

    it('Should be able to set isLoading to "success" if getAssets is fulfilled', () => {
      const action = {
        type: assetsWarrantyListService.getAssetsWarrantyList.fulfilled.type,
        payload: mockAttendanceReport,
      }
      const state = assetsWarrantyListSliceReducer(
        initialAssetsWarrantyListState,
        action,
      )
      expect(state).toEqual({
        // warrantyAssetsDetails: [],
        warrantyAssetsDetails: mockAttendanceReport,
        listSize: 0,
        isLoading: ApiLoadingState.idle,
        getWarrantyAssetsList: {} as GetWarrantyAssetsList,
      })
    })
  })
})
