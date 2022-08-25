import reducer, { clientsService } from './clientsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  ClientsSliceState,
  ClientStatus,
} from '../../../types/ProjectManagement/Clients/clientsTypes'
import {
  mockClientsData,
  mockProjectsUnderClient,
} from '../../../test/data/clientsData'

describe('Clients Slice', () => {
  describe('Reducer', () => {
    const initialClientsState = {
      selectedClientStatus: ClientStatus.active,
      clientsList: { clients: [], totalClients: 0 },
      projectsUnderClient: [],
      isLoading: ApiLoadingState.idle,
      isLoadingProjectDetails: ApiLoadingState.idle,
    } as ClientsSliceState

    it('Should be able to set isLoading to "loading" if getClients is pending', () => {
      const action = {
        type: clientsService.getClients.pending.type,
      }
      const state = reducer(initialClientsState, action)
      expect(state).toEqual({
        selectedClientStatus: ClientStatus.active,
        clientsList: { clients: [], totalClients: 0 },
        projectsUnderClient: [],
        isLoading: ApiLoadingState.loading,
        isLoadingProjectDetails: ApiLoadingState.idle,
      })
    })

    it('Should be able to set isLoading to "success" if getClients is fulfilled', () => {
      const action = {
        type: clientsService.getClients.fulfilled.type,
        payload: mockClientsData,
      }
      const state = reducer(initialClientsState, action)
      expect(state).toEqual({
        selectedClientStatus: ClientStatus.active,
        clientsList: mockClientsData,
        projectsUnderClient: [],
        isLoading: ApiLoadingState.succeeded,
        isLoadingProjectDetails: ApiLoadingState.idle,
      })
    })
    it('Should be able to set isLoading to "success" if getProjectsUnderClient is fulfilled', () => {
      const action = {
        type: clientsService.getProjectsUnderClient.fulfilled.type,
        payload: mockProjectsUnderClient,
      }
      const state = reducer(initialClientsState, action)
      expect(state).toEqual({
        selectedClientStatus: ClientStatus.active,
        clientsList: { clients: [], totalClients: 0 },
        projectsUnderClient: mockProjectsUnderClient,
        isLoading: ApiLoadingState.idle,
        isLoadingProjectDetails: ApiLoadingState.succeeded,
      })
    })

    it('Should be able to set isLoading to "failed" if deleteClient is rejected', () => {
      const rejectedAction = {
        type: clientsService.deleteClient.rejected.type,
      }
      const state = reducer(initialClientsState, rejectedAction)
      expect(state).toEqual({
        selectedClientStatus: ClientStatus.active,
        clientsList: { clients: [], totalClients: 0 },
        projectsUnderClient: [],
        isLoading: ApiLoadingState.failed,
        isLoadingProjectDetails: ApiLoadingState.idle,
      })
    })
  })
})
