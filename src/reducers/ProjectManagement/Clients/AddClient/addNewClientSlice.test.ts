import reducer, { addNewClientService } from './addNewClientSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  AddClientDetails,
  AddNewClientSliceState,
} from '../../../../types/ProjectManagement/Clients/AddClient/addNewClientTypes'
import {
  mockAddNewClient,
  mockClientCountries,
} from '../../../../test/data/addNewClientData'

describe('addNewClient Slice', () => {
  describe('Reducer', () => {
    const initialAddClientState = {
      clientCountries: [],
      isLoading: ApiLoadingState.idle,
      error: null,
      addClientDetails: {} as AddClientDetails,
    } as AddNewClientSliceState

    it('Should be able to set isLoading to "loading" if getClientCountries is pending', () => {
      const action = {
        type: addNewClientService.getClientCountries.pending.type,
      }
      const state = reducer(initialAddClientState, action)
      expect(state).toEqual({
        clientCountries: [],
        isLoading: ApiLoadingState.loading,
        error: null,
        addClientDetails: {} as AddClientDetails,
      })
    })

    it('Should be able to set isLoading to "success" if getClientCountries is fulfilled', () => {
      const action = {
        type: addNewClientService.getClientCountries.fulfilled.type,
        payload: mockClientCountries,
      }
      const state = reducer(initialAddClientState, action)
      expect(state).toEqual({
        clientCountries: mockClientCountries,
        isLoading: ApiLoadingState.succeeded,
        error: null,
        addClientDetails: {} as AddClientDetails,
      })
    })
    it('Should be able to set isLoading to "failed" if getClientCountries is rejected', () => {
      const rejectedAction = {
        type: addNewClientService.getClientCountries.rejected.type,
      }
      const state = reducer(initialAddClientState, rejectedAction)
      expect(state).toEqual({
        clientCountries: [],
        isLoading: ApiLoadingState.failed,
        error: null,
        addClientDetails: {} as AddClientDetails,
      })
    })
    it('Should be able to set isLoading to "success" if addNewClient is fulfilled', () => {
      const action = {
        type: addNewClientService.addNewClient.fulfilled.type,
      }
      const state = reducer(initialAddClientState, action)
      expect(state).toEqual({
        clientCountries: [],
        isLoading: ApiLoadingState.succeeded,
        error: null,
        addClientDetails: {} as AddClientDetails,
      })
    })
    it('Should be able to set isLoading to "loading" if addNewClient is pending', () => {
      const action = {
        type: addNewClientService.addNewClient.pending.type,
      }
      const state = reducer(initialAddClientState, action)
      expect(state).toEqual({
        clientCountries: [],
        isLoading: ApiLoadingState.loading,
        error: null,
        addClientDetails: {} as AddClientDetails,
      })
    })
    it('Should be able to set isLoading to "failed" if addNewClient is rejected', () => {
      const rejectedAction = {
        type: addNewClientService.addNewClient.rejected.type,
      }
      const state = reducer(initialAddClientState, rejectedAction)
      expect(state).toEqual({
        clientCountries: [],
        isLoading: ApiLoadingState.failed,
        addClientDetails: {} as AddClientDetails,
      })
    })
    it('Should be able to set isLoading to "loading" if checkClientOrgExist is pending', () => {
      const action = {
        type: addNewClientService.checkClientOrgExist.pending.type,
      }
      const state = reducer(initialAddClientState, action)
      expect(state).toEqual({
        clientCountries: [],
        isLoading: ApiLoadingState.loading,
        error: null,
        addClientDetails: {} as AddClientDetails,
      })
    })

    it('Should be able to set isLoading to "success" if checkClientOrgExist is fulfilled', () => {
      const action = {
        type: addNewClientService.checkClientOrgExist.fulfilled.type,
      }
      const state = reducer(initialAddClientState, action)
      expect(state).toEqual({
        clientCountries: [],
        isLoading: ApiLoadingState.succeeded,
        error: null,
        addClientDetails: {} as AddClientDetails,
      })
    })
    it('Should be able to set isLoading to "failed" if checkClientOrgExist is rejected', () => {
      const rejectedAction = {
        type: addNewClientService.checkClientOrgExist.rejected.type,
      }
      const state = reducer(initialAddClientState, rejectedAction)
      expect(state).toEqual({
        clientCountries: [],
        isLoading: ApiLoadingState.failed,
        addClientDetails: {} as AddClientDetails,
      })
    })
  })
})
