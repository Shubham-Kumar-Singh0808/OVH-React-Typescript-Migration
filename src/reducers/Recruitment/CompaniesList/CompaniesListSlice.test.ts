import companiesListReducer, {
  initialCompaniesListState,
  companiesListService,
} from './CompaniesListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockCompaniesListTotalInfo } from '../../../test/data/CompaniesData'
import {
  CompaniesListResponse,
  CandidatesInfoList,
} from '../../../types/Recruitment/CompaniesList/CompaniesListTypes'

describe('companiesList Slice', () => {
  describe('getAllCompanies test', () => {
    it('Should be able to set isLoading to "loading" if getAllCompanies is pending', () => {
      const action = {
        type: companiesListService.getAllCompanies.pending.type,
      }
      const state = companiesListReducer(initialCompaniesListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        listSize: 0,
        companiesListResponseDetails: {} as CompaniesListResponse,
        companiesListData: [],
        CandidatesInfoListResponseDetails: {} as CandidatesInfoList,
        CandidatesInfoListData: [],
      })
    })
    it('Should be able to set isLoading to "loading" if getAllJobVacancies is fulfilled', () => {
      const action = {
        type: companiesListService.getAllCompanies.fulfilled.type,
        payload: mockCompaniesListTotalInfo,
      }
      const state = companiesListReducer(initialCompaniesListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        listSize: 20,
        companiesListResponseDetails: {} as CompaniesListResponse,
        companiesListData: mockCompaniesListTotalInfo.list,
        CandidatesInfoListResponseDetails: {} as CandidatesInfoList,
        CandidatesInfoListData: [],
      })
    })
  })
})
