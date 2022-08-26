import reducer, { projectReportsService } from './projectReportSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockProjectReportData } from '../../../test/data/projectReportData'
import { ProjectsReportSliceState } from '../../../types/ProjectManagement/Project/ProjectTypes'

describe('Project Report Slice', () => {
  describe('getFetchActiveProjectReports', () => {
    const initialProjectsState = {
      listSize: 0,
    } as ProjectsReportSliceState

    it('Should be able to set isLoading to "loading" if getFetchActiveProjectReports is pending', () => {
      const action = {
        type: projectReportsService.getFetchActiveProjectReports.pending.type,
      }
      const state = reducer(initialProjectsState, action)
      expect(state).toEqual({
        isProjectLoading: ApiLoadingState.loading,
        isClientProjectLoading: ApiLoadingState.loading,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "success" if getFetchActiveProjectReports is fulfilled', () => {
      const action = {
        type: projectReportsService.getFetchActiveProjectReports.fulfilled.type,
        payload: mockProjectReportData.Projs,
      }
      const state = reducer(initialProjectsState, action)
      expect(state).toEqual({
        Clients: undefined,
        ProjectDetails: mockProjectReportData.Projs,
        isProjectLoading: ApiLoadingState.succeeded,
        listSize: undefined,
      })
    })

    it('Should be able to set isLoading to "failed" if getFetchActiveProjectReports is rejected', () => {
      const rejectedAction = {
        type: projectReportsService.getFetchActiveProjectReports.rejected.type,
      }
      const state = reducer(initialProjectsState, rejectedAction)
      expect(state).toEqual({
        // Clients: mockProjectReportData.Projs,
        isProjectLoading: ApiLoadingState.failed,
        error: undefined,
        isClientProjectLoading: 'failed',
        listSize: 0,
      })
    })
  })

  describe('getFetchSearchAllocationReport', () => {
    const initialProjectsState = {
      listSize: 0,
    } as ProjectsReportSliceState

    it('Should be able to set isLoading to "loading" if getFetchSearchAllocationReport is pending', () => {
      const action = {
        type: projectReportsService.getFetchSearchAllocationReport.pending.type,
      }
      const state = reducer(initialProjectsState, action)
      expect(state).toEqual({
        isProjectLoading: ApiLoadingState.loading,
        isClientProjectLoading: ApiLoadingState.loading,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "success" if getFetchSearchAllocationReport is fulfilled', () => {
      const action = {
        type: projectReportsService.getFetchSearchAllocationReport.fulfilled
          .type,
        payload: mockProjectReportData.Projs,
      }
      const state = reducer(initialProjectsState, action)
      expect(state).toEqual({
        Clients: undefined,
        ProjectDetails: mockProjectReportData.Projs,
        isProjectLoading: ApiLoadingState.succeeded,
        listSize: undefined,
      })
    })

    it('Should be able to set isLoading to "failed" if getFetchSearchAllocationReport is rejected', () => {
      const rejectedAction = {
        type: projectReportsService.getFetchSearchAllocationReport.rejected
          .type,
      }
      const state = reducer(initialProjectsState, rejectedAction)
      expect(state).toEqual({
        isProjectLoading: ApiLoadingState.failed,
        error: undefined,
        isClientProjectLoading: 'failed',
        listSize: 0,
      })
    })
  })

  describe('getFetchProjectClients', () => {
    const initialProjectsState = {
      listSize: 0,
    } as ProjectsReportSliceState

    it('Should be able to set isLoading to "loading" if getFetchProjectClients is pending', () => {
      const action = {
        type: projectReportsService.getFetchProjectClients.pending.type,
      }
      const state = reducer(initialProjectsState, action)
      expect(state).toEqual({
        isProjectLoading: ApiLoadingState.loading,
        isClientProjectLoading: ApiLoadingState.loading,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "success" if getFetchProjectClients is fulfilled', () => {
      const action = {
        type: projectReportsService.getFetchProjectClients.fulfilled.type,
        payload: mockProjectReportData.Projs,
      }
      const state = reducer(initialProjectsState, action)
      expect(state).toEqual({
        ClientProjects: mockProjectReportData.Projs,
        isClientProjectLoading: ApiLoadingState.succeeded,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if getFetchProjectClients is rejected', () => {
      const rejectedAction = {
        type: projectReportsService.getFetchProjectClients.rejected.type,
      }
      const state = reducer(initialProjectsState, rejectedAction)
      expect(state).toEqual({
        isProjectLoading: ApiLoadingState.failed,
        error: undefined,
        isClientProjectLoading: 'failed',
        listSize: 0,
      })
    })
  })
})
