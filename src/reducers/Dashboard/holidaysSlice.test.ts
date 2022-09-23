import reducer, { holidaysService } from './holidaysSlice'
import { ApiLoadingState } from '../../middleware/api/apiList'
import {
  mockEditHoliday,
  mockUpcomingHolidays,
} from '../../test/data/upcomingHolidaysData'
import {
  EditHolidayDetails,
  HolidaysSliceState,
  SaveHoliday,
} from '../../types/Dashboard/Holidays/upcomingHolidaysTypes'

describe('Holidays Slice', () => {
  describe('Holidays Reducer', () => {
    const initialHolidaysState = {
      isLoading: ApiLoadingState.idle,
      upcomingHolidays: [],
      refreshList: false,
      currentPage: 1,
      pageSize: 20,
      error: null,
      addNewHoliday: {} as SaveHoliday,
      editHoliday: {} as EditHolidayDetails,
    } as HolidaysSliceState

    it('Should be able to set isLoading to "loading" if getAllUpcomingHolidaysList is pending', () => {
      const action = {
        type: holidaysService.getAllUpcomingHolidaysList.pending.type,
      }
      const state = reducer(initialHolidaysState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        upcomingHolidays: [],
        refreshList: false,
        currentPage: 1,
        pageSize: 20,
        error: null,
        addNewHoliday: {} as SaveHoliday,
        editHoliday: {} as EditHolidayDetails,
      })
    })

    it('Should be able to set isLoading to "success" if getAllUpcomingHolidaysList is fulfilled', () => {
      const action = {
        type: holidaysService.getAllUpcomingHolidaysList.fulfilled.type,
        payload: mockUpcomingHolidays,
      }
      const state = reducer(initialHolidaysState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        upcomingHolidays: mockUpcomingHolidays,
        refreshList: false,
        currentPage: 1,
        pageSize: 20,
        error: null,
        addNewHoliday: {} as SaveHoliday,
        editHoliday: {} as EditHolidayDetails,
      })
    })

    it('Should be able to set isLoading to "success" if addHoliday is fulfilled', () => {
      const action = {
        type: holidaysService.addHoliday.fulfilled.type,
      }
      const state = reducer(initialHolidaysState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        upcomingHolidays: [],
        refreshList: false,
        currentPage: 1,
        pageSize: 20,
        error: null,
        addNewHoliday: {} as SaveHoliday,
        editHoliday: {} as EditHolidayDetails,
      })
    })

    it('Should be able to set isLoading to "pending" if addHoliday is pending', () => {
      const action = {
        type: holidaysService.addHoliday.pending.type,
      }
      const state = reducer(initialHolidaysState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        upcomingHolidays: [],
        refreshList: false,
        currentPage: 1,
        pageSize: 20,
        error: null,
        addNewHoliday: {} as SaveHoliday,
        editHoliday: {} as EditHolidayDetails,
      })
    })

    it('Should be able to set isLoading to "success" if getUpcomingHolidays is fulfilled', () => {
      const action = {
        type: holidaysService.getUpcomingHolidays.fulfilled.type,
        payload: mockUpcomingHolidays,
      }
      const state = reducer(initialHolidaysState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        upcomingHolidays: mockUpcomingHolidays,
        refreshList: false,
        currentPage: 1,
        pageSize: 20,
        error: null,
        addNewHoliday: {} as SaveHoliday,
        editHoliday: {} as EditHolidayDetails,
      })
    })

    it('Should be able to set isLoading to "pending" if getUpcomingHolidays is pending', () => {
      const action = {
        type: holidaysService.getUpcomingHolidays.pending.type,
      }
      const state = reducer(initialHolidaysState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        upcomingHolidays: [],
        refreshList: false,
        currentPage: 1,
        pageSize: 20,
        error: null,
        addNewHoliday: {} as SaveHoliday,
        editHoliday: {} as EditHolidayDetails,
      })
    })

    it('Should be able to set isLoading to "success" if getHolidayInformation is fulfilled', () => {
      const action = {
        type: holidaysService.getHolidayInformation.fulfilled.type,
        payload: mockEditHoliday,
      }
      const state = reducer(initialHolidaysState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        upcomingHolidays: [],
        refreshList: false,
        currentPage: 1,
        pageSize: 20,
        error: null,
        addNewHoliday: {} as SaveHoliday,
        editHoliday: mockEditHoliday,
      })
    })

    it('Should be able to set isLoading to "pending" if getHolidayInformation is pending', () => {
      const action = {
        type: holidaysService.getHolidayInformation.pending.type,
      }
      const state = reducer(initialHolidaysState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        upcomingHolidays: [],
        refreshList: false,
        currentPage: 1,
        pageSize: 20,
        error: null,
        addNewHoliday: {} as SaveHoliday,
        editHoliday: {} as EditHolidayDetails,
      })
    })

    it('Should be able to set isLoading to "pending" if updateHoliday is pending', () => {
      const action = {
        type: holidaysService.updateHoliday.pending.type,
      }
      const state = reducer(initialHolidaysState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        upcomingHolidays: [],
        refreshList: false,
        currentPage: 1,
        pageSize: 20,
        error: null,
        addNewHoliday: {} as SaveHoliday,
        editHoliday: {} as EditHolidayDetails,
      })
    })

    it('Should be able to set isLoading to "success" if updateHoliday is fulfilled', () => {
      const action = {
        type: holidaysService.updateHoliday.fulfilled.type,
      }
      const state = reducer(initialHolidaysState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        upcomingHolidays: [],
        refreshList: false,
        currentPage: 1,
        pageSize: 20,
        error: null,
        addNewHoliday: {} as SaveHoliday,
        editHoliday: {} as EditHolidayDetails,
      })
    })

    it('Should be able to set isLoading to "pending" if deleteHoliday is pending', () => {
      const action = {
        type: holidaysService.deleteHoliday.pending.type,
      }
      const state = reducer(initialHolidaysState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        upcomingHolidays: [],
        refreshList: false,
        currentPage: 1,
        pageSize: 20,
        error: null,
        addNewHoliday: {} as SaveHoliday,
        editHoliday: {} as EditHolidayDetails,
      })
    })

    it('Should be able to set isLoading to "success" if deleteHoliday is fulfilled', () => {
      const action = {
        type: holidaysService.deleteHoliday.fulfilled.type,
      }
      const state = reducer(initialHolidaysState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        upcomingHolidays: [],
        refreshList: false,
        currentPage: 1,
        pageSize: 20,
        error: null,
        addNewHoliday: {} as SaveHoliday,
        editHoliday: {} as EditHolidayDetails,
      })
    })
  })
})
