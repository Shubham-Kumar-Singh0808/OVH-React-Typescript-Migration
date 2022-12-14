import newEventReducer, {
  initialNewEventState,
  newEventService,
} from './newEventSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { LoggedEmployee } from '../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

describe('New Event  Slice', () => {
  describe('newEventReducer', () => {
    it('Should be able to set isLoading to "loading" if getAllEmployees is pending', () => {
      const action = {
        type: newEventService.getAllEmployees.pending.type,
      }
      const state = newEventReducer(initialNewEventState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        loggedEmployee: {} as LoggedEmployee,
        roomsByLocation: [],
        allEmployeesProfiles: [],
        projectMembers: [],
        error: null,
        allBookedDetailsForEvent: [],
      })
    })

    it('Should be able to set isLoading to "loading" if getLoggedEmployee is pending', () => {
      const action = {
        type: newEventService.getLoggedEmployee.pending.type,
      }
      const state = newEventReducer(initialNewEventState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        loggedEmployee: {} as LoggedEmployee,
        roomsByLocation: [],
        allEmployeesProfiles: [],
        projectMembers: [],
        error: null,
        allBookedDetailsForEvent: [],
      })
    })
  })
})
