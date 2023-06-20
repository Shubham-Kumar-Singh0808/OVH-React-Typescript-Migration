import upComingJoinListSliceReducer, {
  initialUpComingJoinListState,
  upComingJoiningListService,
} from './upComingJoinListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { GetUpComingJoineeList } from '../../../types/Recruitment/UpComingJoinList/UpComingJoinListTypes'
import { mockUpComingJoineeList } from '../../../test/data/upComingJoineeData'

describe('UpComingJoinee Slice', () => {
  describe('UpComingJoinee test', () => {
    it('Should set isLoading to "loading" when UpComingJoinee is pending', () => {
      const action = upComingJoiningListService.getUpConingJoinList.pending
      const state = upComingJoinListSliceReducer(
        initialUpComingJoinListState,
        action,
      )
      expect(state).toEqual({
        upComingJoineeListDetails: [],
        listSize: 0,
        isLoading: ApiLoadingState.loading,
        getUpComingJoineeList: {} as GetUpComingJoineeList,
      })
    })

    it('Should set isLoading to "success" when getUpComingJoinee is fulfilled', () => {
      const action = {
        type: upComingJoiningListService.getUpConingJoinList.fulfilled.type,
        payload: mockUpComingJoineeList,
      }
      const state = upComingJoinListSliceReducer(
        initialUpComingJoinListState,
        action,
      )
      expect(state).toEqual({
        upComingJoineeListDetails: mockUpComingJoineeList.list,
        listSize: 3,
        isLoading: ApiLoadingState.succeeded,
        getUpComingJoineeList: {} as GetUpComingJoineeList,
      })
    })
  })
})
