import intervieweeDetailsReducer, {
  intervieweeDetailsService,
} from './IntervieweeDetailsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  TimeLineList,
  CycleDtOs,
  timeLineDetails,
  EmpScheduleInterviewData,
  IntervieweeDetailsSliceState,
} from '../../../types/Recruitment/IntervieweeDetails/IntervieweeDetailsTypes'
import { mockEmployeeProperties } from '../../../test/data/IntervieDeatilsData'

describe('interview Details Slice', () => {
  describe('interview Details Reducer', () => {
    const initialIntervieweeDetailsState = {
      isLoading: ApiLoadingState.idle,
      listSize: 0,
      timeLineList: {} as TimeLineList,
      cycleDtOs: {} as CycleDtOs,
      CycleDtOsList: [],
      timeLineDetails: {} as timeLineDetails,
      scheduleInterviewData: {} as EmpScheduleInterviewData,
      employeeProperties: [],
    } as IntervieweeDetailsSliceState
    it('Should be able to set isLoading to "loading" if getAllEmployeeDetails is pending', () => {
      const action = {
        type: intervieweeDetailsService.getAllEmployeeDetails.fulfilled.type,
        payload: mockEmployeeProperties,
      }
      const state = intervieweeDetailsReducer(
        initialIntervieweeDetailsState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        listSize: 0,
        timeLineList: {} as TimeLineList,
        cycleDtOs: {} as CycleDtOs,
        CycleDtOsList: [],
        timeLineDetails: {} as timeLineDetails,
        scheduleInterviewData: {} as EmpScheduleInterviewData,
        employeeProperties: mockEmployeeProperties,
      })
    })
  })
})
