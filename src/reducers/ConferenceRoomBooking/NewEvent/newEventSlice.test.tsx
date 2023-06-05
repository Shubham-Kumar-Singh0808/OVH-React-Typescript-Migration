import newEventReducer, {
  initialNewEventState,
  newEventService,
} from './newEventSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  LoggedEmployee,
  TrainerDetails,
} from '../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

describe('New Event  Slice', () => {
  describe('newEventReducer', () => {
    it('Should be able to set isLoading to "loading" if getAllEmployees is pending', () => {
      const action = {
        type: newEventService.getAllEmployees.pending.type,
      }
      const state = newEventReducer(initialNewEventState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        loggedEmployee: {} as LoggedEmployee,
        roomsByLocation: [],
        allEmployeesProfiles: [],
        projectMembers: [],
        error: null,
        allBookedDetailsForEvent: [],
        trainer: {} as TrainerDetails,
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
        trainer: {},
      })
    })

    it('Should be able to set isLoading to "loading" if getRoomsByLocation is pending', () => {
      const action = {
        type: newEventService.getRoomsByLocation.pending.type,
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
        trainer: {},
      })
    })

    it('Should be able to set isLoading to "loading" if getProjectMembers is pending', () => {
      const action = {
        type: newEventService.getProjectMembers.pending.type,
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
        trainer: {},
      })
    })

    it('Should be able to set isLoading to "loading" if uniqueAttendee is pending', () => {
      const action = {
        type: newEventService.uniqueAttendee.pending.type,
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
        trainer: {},
      })
    })

    it('Should be able to set isLoading to "loading" if getAllBookedDetailsForEvent is pending', () => {
      const action = {
        type: newEventService.getAllBookedDetailsForEvent.pending.type,
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
        trainer: {},
      })
    })

    it('Should be able to set isLoading to "loading" if addNewEvent is pending', () => {
      const action = {
        type: newEventService.addNewEvent.pending.type,
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
        trainer: {},
      })
    })

    it('Should be able to set isLoading to "loading" if getLoggedEmployee is fullfilled', () => {
      const action = {
        type: newEventService.getLoggedEmployee.fulfilled.type,
      }
      const state = newEventReducer(initialNewEventState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        loggedEmployee: undefined,
        roomsByLocation: [],
        allEmployeesProfiles: [],
        projectMembers: [],
        error: null,
        allBookedDetailsForEvent: [],
        trainer: {},
      })
    })
    it('Should be able to set isLoading to "loading" if getRoomsByLocation is fullfilled', () => {
      const action = {
        type: newEventService.getRoomsByLocation.fulfilled.type,
      }
      const state = newEventReducer(initialNewEventState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        loggedEmployee: {} as LoggedEmployee,
        roomsByLocation: undefined,
        allEmployeesProfiles: [],
        projectMembers: [],
        error: null,
        allBookedDetailsForEvent: [],
        trainer: {},
      })
    })

    it('Should be able to set isLoading to "loading" if getAllEmployees is fullfilled', () => {
      const action = {
        type: newEventService.getAllEmployees.fulfilled.type,
      }
      const state = newEventReducer(initialNewEventState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        loggedEmployee: {} as LoggedEmployee,
        roomsByLocation: [],
        allEmployeesProfiles: undefined,
        projectMembers: [],
        error: null,
        allBookedDetailsForEvent: [],
        trainer: {},
      })
    })

    it('Should be able to set isLoading to "loading" if getProjectMembers is fullfilled', () => {
      const action = {
        type: newEventService.getProjectMembers.fulfilled.type,
      }
      const state = newEventReducer(initialNewEventState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        loggedEmployee: {} as LoggedEmployee,
        roomsByLocation: [],
        allEmployeesProfiles: [],
        projectMembers: undefined,
        error: null,
        allBookedDetailsForEvent: [],
        trainer: {},
      })
    })

    it('Should be able to set isLoading to "loading" if uniqueAttendee is fullfilled', () => {
      const action = {
        type: newEventService.uniqueAttendee.fulfilled.type,
      }
      const state = newEventReducer(initialNewEventState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        loggedEmployee: {} as LoggedEmployee,
        roomsByLocation: [],
        allEmployeesProfiles: [],
        projectMembers: [],
        error: null,
        allBookedDetailsForEvent: [],
        trainer: {},
      })
    })

    it('Should be able to set isLoading to "loading" if getAllBookedDetailsForEvent is fullfilled', () => {
      const action = {
        type: newEventService.getAllBookedDetailsForEvent.fulfilled.type,
      }
      const state = newEventReducer(initialNewEventState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        loggedEmployee: {} as LoggedEmployee,
        roomsByLocation: [],
        allEmployeesProfiles: [],
        projectMembers: [],
        error: null,
        allBookedDetailsForEvent: undefined,
        trainer: {},
      })
    })
  })
})
