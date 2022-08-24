import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import clientsApi from '../../../middleware/api/ProjectManagement/Clients/clientsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  Client,
  ClientCountry,
  ClientsSliceState,
  ClientStatus,
  GetClientsProps,
  ProjectsUnderClient,
} from '../../../types/ProjectManagement/Clients/clientsTypes'

const getClients = createAsyncThunk(
  'clients/getClients',
  async (props: GetClientsProps, thunkApi) => {
    try {
      return await clientsApi.getClients(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getProjectsUnderClient = createAsyncThunk(
  'clients/getProjectsUnderClient',
  async (clientId: number, thunkApi) => {
    try {
      return await clientsApi.getProjectsUnderClient(clientId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const searchClients = createAsyncThunk(
  'clients/searchClients',
  async (props: GetClientsProps, thunkApi) => {
    try {
      return await clientsApi.searchClients(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (clientId: number, thunkApi) => {
    try {
      return await clientsApi.deleteClient(clientId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getClientToEdit = createAsyncThunk(
  'clients/getClientToEdit',
  async (clientId: number, thunkApi) => {
    try {
      return await clientsApi.getClientToEdit(clientId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateClient = createAsyncThunk(
  'clients/updateClient',
  async (updatedClientDetails: Client, thunkApi) => {
    try {
      return await clientsApi.updateClient(updatedClientDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getClientCountries = createAsyncThunk(
  'clients/getClientCountries',
  async (_, thunkApi) => {
    try {
      return await clientsApi.getClientCountries()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialClientsSliceState: ClientsSliceState = {
  selectedClientStatus: ClientStatus.active,
  clientsList: { clients: [], totalClients: 0 },
  projectsUnderClient: [],
  isLoading: ApiLoadingState.idle,
  isLoadingProjectDetails: ApiLoadingState.idle,
  editClient: {} as Client,
  clientCountries: [],
}

const clientsSlice = createSlice({
  name: 'clients',
  initialState: initialClientsSliceState,
  reducers: {
    changeSelectedClientStatus: (state, action) => {
      state.selectedClientStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectsUnderClient.fulfilled, (state, action) => {
        state.isLoadingProjectDetails = ApiLoadingState.succeeded
        state.projectsUnderClient = action.payload
      })
      .addCase(getProjectsUnderClient.pending, (state) => {
        state.isLoadingProjectDetails = ApiLoadingState.loading
      })
      .addCase(deleteClient.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addCase(deleteClient.rejected, (state) => {
        state.isLoading = ApiLoadingState.failed
      })
      .addCase(getClientToEdit.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.editClient = action.payload
      })
      .addCase(getClientCountries.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.clientCountries = action.payload
      })
      .addMatcher(
        isAnyOf(getClients.fulfilled, searchClients.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.clientsList = action.payload
        },
      )
      .addMatcher(
        isAnyOf(
          getClients.pending,
          searchClients.pending,
          deleteClient.pending,
          getClientToEdit.pending,
          getClientCountries.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState => state.clients.isLoading

const isLoadingProjectDetails = (state: RootState): LoadingState =>
  state.clients.isLoadingProjectDetails

const allClients = (state: RootState): Client[] =>
  state.clients.clientsList.clients

const projectsUnderClient = (state: RootState): ProjectsUnderClient[] =>
  state.clients.projectsUnderClient

const clientsListSize = (state: RootState): number =>
  state.clients.clientsList.totalClients

const selectedClientStatus = (state: RootState): ClientStatus =>
  state.clients.selectedClientStatus

const getClient = (state: RootState): Client => state.clients.editClient
const clientCountries = (state: RootState): ClientCountry[] =>
  state.clients.clientCountries

const clientsThunk = {
  getClients,
  getProjectsUnderClient,
  searchClients,
  deleteClient,
  getClientToEdit,
  updateClient,
  getClientCountries,
}

const clientsSelectors = {
  isLoading,
  allClients,
  clientsListSize,
  selectedClientStatus,
  projectsUnderClient,
  isLoadingProjectDetails,
  getClient,
  clientCountries,
}

export const clientsService = {
  ...clientsThunk,
  actions: clientsSlice.actions,
  selectors: clientsSelectors,
}

export default clientsSlice.reducer
