import React from 'react'
import userEvent from '@testing-library/user-event'
import InterviewStatusReportFilterOptions from './InterviewStatusReportFilterOptions'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../../../test/testUtils'
import {
  mockGetEmpCountries,
  mockGetTechnology,
} from '../../../../test/data/candidateListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { initialStatusReportFilters } from '../../../../reducers/Recruitment/InterviewStatusReport/InterviewStatusReportSliceConstants'
import {
  CandidateCheckBoxFilterEnum,
  OutgoingCandidateSelectionStatusEnum,
  OutgoingCandidateStatusEnum,
} from '../../../../types/Recruitment/InterviewStatusReport/InterviewStatusReportTypes'
import {
  getInterviewStatusReportTestId,
  candidateCheckBoxFilterList,
} from '../InterviewStatusReportHelpers'

const toRender = (
  <InterviewStatusReportFilterOptions setCurrentPage={jest.fn()} />
)

const selectionStatusTestId =
  getInterviewStatusReportTestId('selectionStatusSel')
const searchInputTestId = getInterviewStatusReportTestId('searchInput')

describe('interview status report filter options', () => {
  describe('initial - no data entered', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          isLoading: ApiLoadingState.succeeded,
          filterOptions: initialStatusReportFilters,
          interviewStatusReportList: { size: 0, list: [] },
          allTechnology: mockGetTechnology,
          allEmpCountries: mockGetEmpCountries,
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('clear button functionality', () => {
      const clearBtn = screen.getByTestId(
        getInterviewStatusReportTestId('clearBtn'),
      )
      const selectionStatus = screen.getByTestId(selectionStatusTestId)
      expect(clearBtn).toBeDisabled()
      act(() => {
        userEvent.selectOptions(
          selectionStatus,
          OutgoingCandidateSelectionStatusEnum.currentMonth,
        )
      })
      expect(selectionStatus).toHaveValue(
        OutgoingCandidateSelectionStatusEnum.currentMonth,
      )
      expect(clearBtn).toBeEnabled()
      act(() => {
        userEvent.click(clearBtn)
      })
    })

    test('filter functionality', () => {
      const viewBtn = screen.getByTestId(
        getInterviewStatusReportTestId('viewBtn'),
      )
      const selectionStatus = screen.getByTestId(selectionStatusTestId)
      const candidateStatus = screen.getByTestId(
        getInterviewStatusReportTestId('candidateStatusSel'),
      )
      const selectionTechnology = screen.getByTestId(
        getInterviewStatusReportTestId('selectionTechnologySel'),
      )
      const selectionCountry = screen.getByTestId(
        getInterviewStatusReportTestId('selectionCountrySel'),
      )
      const searchInput = screen.getByTestId(searchInputTestId)
      const searchButton = screen.getByTestId(
        getInterviewStatusReportTestId('searchBtn'),
      )

      // initial
      expect(viewBtn).toBeDisabled()
      expect(searchButton).toBeDisabled()

      //selectionStatus
      expect(selectionStatus).toHaveValue('')
      act(() => {
        userEvent.selectOptions(
          selectionStatus,
          OutgoingCandidateSelectionStatusEnum.custom.toString(),
        )
      })
      expect(selectionStatus).toHaveValue(
        OutgoingCandidateSelectionStatusEnum.custom.toString(),
      )
      expect(viewBtn).toBeDisabled() // as we have selected custom, have to enter from and to dates

      //candidateStatus
      expect(candidateStatus).toHaveValue(
        OutgoingCandidateStatusEnum.inProgress.toString(),
      )
      act(() => {
        userEvent.selectOptions(
          candidateStatus,
          OutgoingCandidateStatusEnum.all.toString(),
        )
      })
      expect(candidateStatus).toHaveValue(
        OutgoingCandidateStatusEnum.all.toString(),
      )
      expect(viewBtn).toBeDisabled()

      //selectionTechnology
      const chosenTechnology = mockGetTechnology[3]
      expect(selectionTechnology).toHaveValue('')
      act(() => {
        fireEvent.select(selectionTechnology, {
          target: { value: chosenTechnology.name },
        })
      })
      expect(viewBtn).toBeDisabled()

      //selectionCountry
      expect(selectionCountry).toHaveValue('')
      const chosenCountry = mockGetEmpCountries[2]
      act(() => {
        fireEvent.select(selectionCountry, {
          target: { value: chosenCountry.id.toString() },
        })
      })
      expect(viewBtn).toBeDisabled()

      expect((searchInput as HTMLInputElement).readOnly).toBe(true) // initially true as none checkbox is selected
      //check options
      candidateCheckBoxFilterList.forEach((candidateCheckBox) => {
        const checkBoxItem = screen.getByTestId(
          getInterviewStatusReportTestId(candidateCheckBox),
        ) as HTMLInputElement
        expect(checkBoxItem.checked).toBe(false)
        act(() => {
          userEvent.click(checkBoxItem)
        })
        expect(checkBoxItem.checked).toBe(true)
        expect(viewBtn).toBeDisabled()
        expect((searchInput as HTMLInputElement).readOnly).toBe(false)
      })
      expect(searchInput).toHaveValue('')
      expect(searchButton).toBeDisabled()
      act(() => {
        fireEvent.change(searchInput, { target: { value: 'Testing Search' } })
      })
      expect(searchInput).toHaveValue('Testing Search')
      expect(searchButton).toBeEnabled()
      expect(viewBtn).toBeDisabled()

      const dates = screen.getAllByPlaceholderText('dd/mm/yyyy')
      act(() => {
        fireEvent.change(dates[0], { target: { value: '04/06/2023' } })
      })
      expect(viewBtn).toBeDisabled()
      act(() => {
        fireEvent.change(dates[1], { target: { value: '05/06/2023' } })
      })
      expect(viewBtn).toBeEnabled()

      act(() => {
        userEvent.click(viewBtn)
      })
    })

    test('search button functionality', () => {
      const selectionStatus = screen.getByTestId(selectionStatusTestId)
      const searchBtn = screen.getByTestId(
        getInterviewStatusReportTestId('searchBtn'),
      )
      const searchInput = screen.getByTestId(searchInputTestId)
      const searchByExperience = screen.getByTestId(
        getInterviewStatusReportTestId(
          CandidateCheckBoxFilterEnum.searchByExperience,
        ),
      ) as HTMLInputElement
      // initial
      expect((searchInput as HTMLInputElement).readOnly).toBe(true)
      expect(searchBtn).toBeDisabled()

      act(() => {
        userEvent.selectOptions(
          selectionStatus,
          OutgoingCandidateSelectionStatusEnum.lastMonth,
        )
      })

      expect(searchBtn).toBeDisabled()
      act(() => {
        userEvent.click(searchByExperience)
      })
      expect((searchInput as HTMLInputElement).readOnly).toBe(false)
      expect(searchBtn).toBeDisabled()

      act(() => {
        fireEvent.change(searchInput, { target: { value: 'te' } })
      })
      expect(searchInput).toHaveValue('te')
      expect(searchBtn).toBeEnabled()

      act(() => {
        userEvent.click(searchBtn)
      })
    })
  })
})
