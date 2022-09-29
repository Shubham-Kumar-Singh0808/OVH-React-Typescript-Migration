import clientsReducer, { clientsService } from './clientsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  Client,
  ClientsSliceState,
  ClientStatus,
} from '../../../types/ProjectManagement/Clients/clientsTypes'
import {
  mockClientsData,
  mockProjectsUnderClient,
} from '../../../test/data/clientsData'
import {
  mockGetClientCountries,
  mockEditClient,
} from '../../../test/data/editClientData'

describe('Clients Slice', () => {
  describe('clientsReducer', () => {
    const initialClientsState = {
      selectedClientStatus: ClientStatus.active,
      clientsList: { clients: [], totalClients: 0 },
      projectsUnderClient: [],
      isLoading: ApiLoadingState.idle,
      isLoadingProjectDetails: ApiLoadingState.idle,
      editClient: {} as Client,
      clientCountries: [],
    } as ClientsSliceState

    it('Should be able to set isLoading to "loading" if getClients is pending', () => {
      const action = {
        type: clientsService.getClients.pending.type,
      }
      const state = clientsReducer(initialClientsState, action)
      expect(state).toEqual({
        selectedClientStatus: ClientStatus.active,
        clientsList: { clients: [], totalClients: 0 },
        projectsUnderClient: [],
        isLoading: ApiLoadingState.loading,
        isLoadingProjectDetails: ApiLoadingState.idle,
        editClient: {} as Client,
        clientCountries: [],
      })
    })

    it('Should be able to set isLoading to "success" if getClients is fulfilled', () => {
      const action = {
        type: clientsService.getClients.fulfilled.type,
        payload: mockClientsData,
      }
      const state = clientsReducer(initialClientsState, action)
      expect(state).toEqual({
        selectedClientStatus: ClientStatus.active,
        clientsList: mockClientsData,
        projectsUnderClient: [],
        isLoading: ApiLoadingState.succeeded,
        isLoadingProjectDetails: ApiLoadingState.idle,
        editClient: {} as Client,
        clientCountries: [],
      })
    })
    it('Should be able to set isLoading to "success" if getProjectsUnderClient is fulfilled', () => {
      const action = {
        type: clientsService.getProjectsUnderClient.fulfilled.type,
        payload: mockProjectsUnderClient,
      }
      const state = clientsReducer(initialClientsState, action)
      expect(state).toEqual({
        selectedClientStatus: ClientStatus.active,
        clientsList: { clients: [], totalClients: 0 },
        projectsUnderClient: mockProjectsUnderClient,
        isLoading: ApiLoadingState.idle,
        isLoadingProjectDetails: ApiLoadingState.succeeded,
        editClient: {} as Client,
        clientCountries: [],
      })
    })

    it('Should be able to set isLoading to "success" if getClientToEdit is fulfilled', () => {
      const action = {
        type: clientsService.getClientToEdit.fulfilled.type,
        payload: mockEditClient,
      }
      const state = clientsReducer(initialClientsState, action)
      expect(state).toEqual({
        selectedClientStatus: ClientStatus.active,
        clientsList: { clients: [], totalClients: 0 },
        projectsUnderClient: [],
        isLoading: ApiLoadingState.succeeded,
        isLoadingProjectDetails: ApiLoadingState.idle,
        editClient: mockEditClient,
        clientCountries: [],
      })
    })

    it('Should be able to set isLoading to "success" if getClientCountries is fulfilled', () => {
      const action = {
        type: clientsService.getClientCountries.fulfilled.type,
        payload: mockGetClientCountries,
      }
      const state = clientsReducer(initialClientsState, action)
      expect(state).toEqual({
        selectedClientStatus: ClientStatus.active,
        clientsList: { clients: [], totalClients: 0 },
        projectsUnderClient: [],
        isLoading: ApiLoadingState.succeeded,
        isLoadingProjectDetails: ApiLoadingState.idle,
        editClient: {} as Client,
        clientCountries: mockGetClientCountries,
      })
    })

    it('Should be able to set isLoading to "failed" if deleteClient is rejected', () => {
      const rejectedAction = {
        type: clientsService.deleteClient.rejected.type,
      }
      const state = clientsReducer(initialClientsState, rejectedAction)
      expect(state).toEqual({
        selectedClientStatus: ClientStatus.active,
        clientsList: { clients: [], totalClients: 0 },
        projectsUnderClient: [],
        isLoading: ApiLoadingState.failed,
        isLoadingProjectDetails: ApiLoadingState.idle,
        editClient: {} as Client,
        clientCountries: [],
      })
    })

    it('Should be able to set isLoading to "success" if updateClient is fulfilled', () => {
      const action = {
        type: clientsService.updateClient.fulfilled.type,
      }
      const state = clientsReducer(initialClientsState, action)
      expect(state).toEqual({
        selectedClientStatus: ClientStatus.active,
        clientsList: { clients: [], totalClients: 0 },
        projectsUnderClient: [],
        isLoading: ApiLoadingState.succeeded,
        isLoadingProjectDetails: ApiLoadingState.idle,
        editClient: {} as Client,
        clientCountries: [],
      })
    })
    it('Should be able to set isLoading to "success" if isOrganizationExists is fulfilled', () => {
      const action = {
        type: clientsService.isOrganizationExists.fulfilled.type,
      }
      const state = clientsReducer(initialClientsState, action)
      expect(state).toEqual({
        selectedClientStatus: ClientStatus.active,
        clientsList: { clients: [], totalClients: 0 },
        projectsUnderClient: [],
        isLoading: ApiLoadingState.succeeded,
        isLoadingProjectDetails: ApiLoadingState.idle,
        editClient: {} as Client,
        clientCountries: [],
      })
    })
  })
})
