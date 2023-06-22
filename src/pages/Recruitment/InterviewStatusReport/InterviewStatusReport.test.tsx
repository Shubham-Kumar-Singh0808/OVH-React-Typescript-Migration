import React from 'react'
import InterviewStatusReport from './InterviewStatusReport'
import {
  getInterviewStatusReportTestId,
  getValueOfCandidateStatusMappings,
} from './InterviewStatusReportHelpers'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockInterviewStatusReportList,
  mockSubmittedFilterOptions,
} from '../../../test/data/InterviewStatusReportData'
import {
  mockGetEmpCountries,
  mockGetTechnology,
} from '../../../test/data/candidateListData'

const toRender = <InterviewStatusReport />

describe('interview status report', () => {
  describe('filter button clicked, data rendered', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          interviewStatusReport: {
            isLoading: ApiLoadingState.succeeded,
            filterOptions: mockSubmittedFilterOptions,
            interviewStatusReportList: mockInterviewStatusReportList,
            allTechnology: mockGetTechnology,
            allEmpCountries: mockGetEmpCountries,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('table columns are rendered', () => {
      expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Interview Date' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Mobile' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Email ID' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Technology' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Experience' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Source' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Recruiter' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Status' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Interview Round' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Interviewer Name' }),
      ).toBeTruthy()
    })

    test('data is rendered in rows', () => {
      // number of rows is correct
      expect(
        screen.getAllByTestId(getInterviewStatusReportTestId('tableRow')),
      ).toHaveLength(mockInterviewStatusReportList.list.length)

      // the data is correct in row
      const indexValue = 1
      const chosenRow = mockInterviewStatusReportList.list[1]
      // serial number
      expect(
        screen.getByTestId(
          getInterviewStatusReportTestId(`tableSNo-${indexValue}`),
        ),
      ).toHaveTextContent(`${indexValue + 1}`)
      // interview date
      expect(
        screen.getByTestId(
          getInterviewStatusReportTestId(`tableIntDate-${indexValue}`),
        ),
      ).toHaveTextContent(chosenRow.interviewDate)
      // mobile number
      expect(
        screen.getByTestId(
          getInterviewStatusReportTestId(`tableMobile-${indexValue}`),
        ),
      ).toHaveTextContent(chosenRow.contactNumber)
      // emailId
      expect(
        screen.getByTestId(
          getInterviewStatusReportTestId(`tableEmail-${indexValue}`),
        ),
      ).toHaveTextContent(chosenRow.emailId)
      // technology
      expect(
        screen.getByTestId(
          getInterviewStatusReportTestId(`tableTechnology-${indexValue}`),
        ),
      ).toHaveTextContent(chosenRow.technology)
      // experience
      expect(
        screen.getByTestId(
          getInterviewStatusReportTestId(`tableExperience-${indexValue}`),
        ),
      ).toHaveTextContent(chosenRow.experiance)
      // source
      expect(
        screen.getByTestId(
          getInterviewStatusReportTestId(`tableSource-${indexValue}`),
        ),
      ).toHaveTextContent(chosenRow.source)
      // recruiter
      expect(
        screen.getByTestId(
          getInterviewStatusReportTestId(`tableRecruiter-${indexValue}`),
        ),
      ).toHaveTextContent(chosenRow.recruiter)
      //status
      expect(
        screen.getByTestId(
          getInterviewStatusReportTestId(`tableCandStatus-${indexValue}`),
        ),
      ).toHaveTextContent(getValueOfCandidateStatusMappings(chosenRow.status))
      // interview round
      expect(
        screen.getByTestId(
          getInterviewStatusReportTestId(`tableIntRound-${indexValue}`),
        ),
      ).toHaveTextContent(chosenRow.interviewRound.toString())
      // interviewer name
      expect(
        screen.getByTestId(
          getInterviewStatusReportTestId(`tableIntName-${indexValue}`),
        ),
      ).toHaveTextContent(chosenRow.interviewerName)
    })

    test('total records shown and pagination functionality', () => {
      expect(
        screen.getByText(
          `Total Records: ${mockInterviewStatusReportList.size}`,
        ),
      ).toBeVisible()

      act(() => {
        fireEvent.click(screen.getByTestId('next-page'))
      })
    })

    test('export btn functionality', () => {
      act(() => {
        fireEvent.click(
          screen.getByTestId(getInterviewStatusReportTestId('exportBtn')),
        )
      })
    })

    test('export interviewer list btn functionality', () => {
      act(() => {
        fireEvent.click(
          screen.getByTestId(
            getInterviewStatusReportTestId('exportInterviewerListBtn'),
          ),
        )
      })
    })
  })
})
