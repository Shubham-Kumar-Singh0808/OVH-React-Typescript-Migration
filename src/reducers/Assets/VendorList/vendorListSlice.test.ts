import reducer, { vendorListService } from './vendorListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  VendorListSliceState,
  GetAllVendorDetails,
  VendorDetails,
} from '../../../types/Assets/VendorList/vendorListTypes'
import {
  mockVendorDetails,
  mockVendorList,
} from '../../../test/data/vendorListData'

describe('Vendor List Slice', () => {
  describe('Vendor List Reducer', () => {
    const initialVendorListState: VendorListSliceState = {
      vendors: [],
      listSize: 0,
      getAllVendorDetails: {} as GetAllVendorDetails,
      isLoading: ApiLoadingState.idle,
      getVendorById: {} as VendorDetails,
    } as VendorListSliceState

    it('Should be able to set isLoading to "loading" if getAllVendors is pending', () => {
      const action = {
        type: vendorListService.getVendors.pending.type,
      }
      const state = reducer(initialVendorListState, action)
      expect(state).toEqual({
        vendors: [],
        listSize: 0,
        getAllVendorDetails: {} as GetAllVendorDetails,
        isLoading: ApiLoadingState.loading,
        getVendorById: {} as VendorDetails,
      })
    })

    it('Should be able to set isLoading to "loading" if updateVendorDetails is pending', () => {
      const action = {
        type: vendorListService.updateVendorDetails.pending.type,
      }
      const state = reducer(initialVendorListState, action)
      expect(state).toEqual({
        vendors: [],
        listSize: 0,
        getAllVendorDetails: {} as GetAllVendorDetails,
        isLoading: ApiLoadingState.loading,
        getVendorById: {} as VendorDetails,
      })
    })

    it('Should be able to set isLoading to "loading" if deleteVendorDetails is pending', () => {
      const action = {
        type: vendorListService.deleteVendorDetails.pending.type,
      }
      const state = reducer(initialVendorListState, action)
      expect(state).toEqual({
        vendors: [],
        listSize: 0,
        getAllVendorDetails: {} as GetAllVendorDetails,
        isLoading: ApiLoadingState.loading,
        getVendorById: {} as VendorDetails,
      })
    })

    it('Should be able to set isLoading to "success" if getAllVendors is fulfilled', () => {
      const action = {
        type: vendorListService.getVendors.fulfilled.type,
        payload: mockVendorDetails,
      }
      const state = reducer(initialVendorListState, action)
      expect(state).toEqual({
        vendors: mockVendorDetails.list,
        listSize: mockVendorDetails.size,
        getAllVendorDetails: {} as GetAllVendorDetails,
        isLoading: ApiLoadingState.succeeded,
        getVendorById: {} as VendorDetails,
      })
    })

    describe('update Vendor Details test', () => {
      it('Should be able to set isLoading to "success" if update Vendor Details is fulfilled', () => {
        const action = {
          type: vendorListService.updateVendorDetails.fulfilled.type,
          payload: mockVendorList,
        }
        const state = reducer(initialVendorListState, action)
        expect(state).toEqual({
          vendors: [],
          listSize: 0,
          getAllVendorDetails: {} as GetAllVendorDetails,
          isLoading: ApiLoadingState.idle,
          getVendorById: {} as VendorDetails,
        })
      })

      describe('delete Vendor details test', () => {
        it('Should be able to set isLoading to "failed" if get Vendor details is rejected', () => {
          const rejectedAction = {
            type: vendorListService.getVendors.rejected.type,
          }
          const state = reducer(initialVendorListState, rejectedAction)
          expect(state).toEqual({
            vendors: [],
            listSize: 0,
            getAllVendorDetails: {} as GetAllVendorDetails,
            isLoading: ApiLoadingState.failed,
            getVendorById: {} as VendorDetails,
          })
        })

        it('Should be able to set isLoading to "failed" if update Vendor details is rejected', () => {
          const rejectedAction = {
            type: vendorListService.updateVendorDetails.rejected.type,
          }
          const state = reducer(initialVendorListState, rejectedAction)
          expect(state).toEqual({
            vendors: [],
            listSize: 0,
            getAllVendorDetails: {} as GetAllVendorDetails,
            isLoading: ApiLoadingState.failed,
            getVendorById: {} as VendorDetails,
          })
        })

        it('Should be able to set isLoading to "failed" if delete Vendor details is rejected', () => {
          const rejectedAction = {
            type: vendorListService.deleteVendorDetails.rejected.type,
          }
          const state = reducer(initialVendorListState, rejectedAction)
          expect(state).toEqual({
            vendors: [],
            listSize: 0,
            getAllVendorDetails: {} as GetAllVendorDetails,
            isLoading: ApiLoadingState.failed,
            getVendorById: {} as VendorDetails,
          })
        })
      })
    })
  })
})
