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
        }
        const state = reducer(initialVendorListState, action)
        expect(state).toEqual({
          vendors: mockVendorDetails.list,
          listSize: mockVendorDetails.size,
          getAllVendorDetails: {} as GetAllVendorDetails,
          isLoading: ApiLoadingState.succeeded,
          getVendorById: mockVendorDetails.list,
        })
      })
      // it('Should be able to set isLoading to "failed" if updateClient is rejected', () => {
      //   const action = {
      //     type: clientsService.updateClient.rejected.type,
      //     payload: 500,
      //   }
      //   const state = clientsReducer(initialClientsSliceState, action)
      //   expect(state).toEqual({
      //     selectedClientStatus: ClientStatus.active,
      //     clientsList: { clients: [], totalClients: 0 },
      //     projectsUnderClient: [],
      //     isLoading: ApiLoadingState.failed,
      //     isLoadingProjectDetails: ApiLoadingState.idle,
      //     editClient: {} as Client,
      //     clientCountries: [],
      //     error: 500,
      //   })
      // })
    })
  })
})
