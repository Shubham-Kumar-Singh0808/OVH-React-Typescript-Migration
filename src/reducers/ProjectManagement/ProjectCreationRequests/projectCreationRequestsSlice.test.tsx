import projectCreationRequestReducer, {
  projectCreationRequestService,
} from './projectCreationRequestsSlice.'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  GetProjectRequest,
  ProjectCreationRequestState,
} from '../../../types/ProjectManagement/ProjectCreationRequests/projectCreationRequestsTypes'

describe(' Slice', () => {
  describe('projectCreationRequestSlice Reducer', () => {
    const initialProjectCreationReuestState = {
      getAllProjectRequestList: {
        projectRequestListSize: 0,
        projectrequestList: [],
      },
      getProjectRequest: {} as GetProjectRequest,
      projectRequestHistoryDetails: [],
      isLoading: ApiLoadingState.idle,
      currentPage: 1,
      pageSize: 20,
    } as ProjectCreationRequestState
    it('Should be able to set isLoading to "loading" if getAllProjectRequestList is pending', () => {
      const action = {
        type: projectCreationRequestService.getAllProjectRequestList.pending
          .type,
      }
      const state = projectCreationRequestReducer(
        initialProjectCreationReuestState,
        action,
      )
      expect(state).toEqual({
        getAllProjectRequestList: {
          projectRequestListSize: 0,
          projectrequestList: [],
        },
        getProjectRequest: {} as GetProjectRequest,
        projectRequestHistoryDetails: [],
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
      })
    })
    it('Should be able to set isLoading to "success" if getAllProjectRequestList is fulfilled', () => {
      const action = {
        type: projectCreationRequestService.getAllProjectRequestList.fulfilled
          .type,
      }
      const state = projectCreationRequestReducer(
        initialProjectCreationReuestState,
        action,
      )
      expect(state).toEqual({
        getAllProjectRequestList: undefined,
        getProjectRequest: {} as GetProjectRequest,
        projectRequestHistoryDetails: [],
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "loading" if getProjectRequest is pending', () => {
      const action = {
        type: projectCreationRequestService.getProjectRequest.pending.type,
      }
      const state = projectCreationRequestReducer(
        initialProjectCreationReuestState,
        action,
      )
      expect(state).toEqual({
        getAllProjectRequestList: {
          projectRequestListSize: 0,
          projectrequestList: [],
        },
        getProjectRequest: {} as GetProjectRequest,
        projectRequestHistoryDetails: [],
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "loading" if projectRequestHistoryDetails is pending', () => {
      const action = {
        type: projectCreationRequestService.projectRequestHistoryDetails.pending
          .type,
      }
      const state = projectCreationRequestReducer(
        initialProjectCreationReuestState,
        action,
      )
      expect(state).toEqual({
        getAllProjectRequestList: {
          projectRequestListSize: 0,
          projectrequestList: [],
        },
        getProjectRequest: {} as GetProjectRequest,
        projectRequestHistoryDetails: [],
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "success" if getProjectRequest is fulfilled', () => {
      const action = {
        type: projectCreationRequestService.getProjectRequest.fulfilled.type,
      }
      const state = projectCreationRequestReducer(
        initialProjectCreationReuestState,
        action,
      )
      expect(state).toEqual({
        getAllProjectRequestList: {
          projectRequestListSize: 0,
          projectrequestList: [],
        },
        getProjectRequest: undefined,
        projectRequestHistoryDetails: [],
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "success" if projectRequestHistoryDetails is fulfilled', () => {
      const action = {
        type: projectCreationRequestService.projectRequestHistoryDetails
          .fulfilled.type,
      }
      const state = projectCreationRequestReducer(
        initialProjectCreationReuestState,
        action,
      )
      expect(state).toEqual({
        getAllProjectRequestList: {
          projectRequestListSize: 0,
          projectrequestList: [],
        },
        getProjectRequest: {} as GetProjectRequest,
        projectRequestHistoryDetails: undefined,
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
      })
    })
  })
})
