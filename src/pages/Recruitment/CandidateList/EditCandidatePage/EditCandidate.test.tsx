import React from 'react'
import EditCandidate from './EditCandidate'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockAllCompaniesData,
  mockEditCandidateData,
  mockGetEmpCountries,
  mockGetTechnology,
  mockAllVacaniciesListNewCandidate,
  mockCandidateUserAccessToFeatures,
  mockAllEmployeeDetailsList,
} from '../../../../test/data/candidateListData'
import { getDataInputTestId } from '../CandidateListHelpers'

const toRender = <EditCandidate />

describe('Edit Candidate', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          candidateList: {
            isLoading: ApiLoadingState.succeeded,
            allJobVacancies: mockAllVacaniciesListNewCandidate,
            getAllTechnology: mockGetTechnology,
            allCompaniesData: mockAllCompaniesData,
            empCountries: mockGetEmpCountries,
            allEmployeeDetailsList: mockAllEmployeeDetailsList,
            editCandidateData: mockEditCandidateData,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockCandidateUserAccessToFeatures,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('data is rendered', async () => {
      const firstName = screen.getByTestId(getDataInputTestId('fName'))
      const lastName = screen.getByTestId(getDataInputTestId('lName'))
      const appliedFor = screen.getByTestId(getDataInputTestId('appliedFor'))
      const email = screen.getByTestId(getDataInputTestId('email'))
      const sourceType = screen.getByTestId(getDataInputTestId('sourceType'))
      const experience = screen.getByTestId(getDataInputTestId('experience'))
      const technology = screen.getByTestId(getDataInputTestId('technology'))
      const mobileCode = screen.getByTestId(getDataInputTestId('mobileCode'))
      const mobileNumber = screen.getByTestId(
        getDataInputTestId('mobileNumber'),
      )
      const skills = screen.getByTestId(getDataInputTestId('skills'))
      const ctc = screen.getByTestId(getDataInputTestId('ctc'))
      const ectc = screen.getByTestId(getDataInputTestId('ectc'))
      const currentLoc = screen.getByTestId(getDataInputTestId('currentLoc'))
      const noticePeriod = screen.getByTestId(getDataInputTestId('noticeP'))
      const jobType = screen.getByTestId(getDataInputTestId('jobType'))
      const country = screen.getByTestId(getDataInputTestId('country'))

      // all non-required fields
      const aadharNumber = screen.getByTestId(getDataInputTestId('aNum'))
      const panNumber = screen.getByTestId(getDataInputTestId('pNum'))
      const linkedin = screen.getByTestId(getDataInputTestId('linkedin'))
      const skype = screen.getByTestId(getDataInputTestId('skype'))
      const whatsAppYes = screen.getByTestId(
        `${getDataInputTestId('whatsapp')}-yes`,
      ) as HTMLInputElement
      const updateBtn = screen.getByTestId('editCand-updateBtn')

      expect(firstName).toHaveValue(mockEditCandidateData.candidateFirstName)
      expect(lastName).toHaveValue(mockEditCandidateData.candidateLastName)
      expect(aadharNumber).toHaveValue(mockEditCandidateData.adhar)
      expect(panNumber).toHaveValue(mockEditCandidateData.pan)
      //   expect(appliedFor).toHaveValue(mockEditCandidateData.appliedFor.id)
      expect(email).toHaveValue(mockEditCandidateData.candidateEmail)
      expect(sourceType).toHaveValue(mockEditCandidateData.sourceType)
      expect(experience).toHaveValue(mockEditCandidateData.experience)
      expect(technology).toHaveValue(mockEditCandidateData.technology)
      expect(linkedin).toHaveValue(mockEditCandidateData.linkedin)
      expect(mobileCode).toHaveValue(
        mockEditCandidateData.countryCode.toString(),
      )
      expect(mobileNumber).toHaveValue(mockEditCandidateData.mobile)
      expect(skills).toHaveValue(mockEditCandidateData.skills)
      expect(ctc).toHaveValue(mockEditCandidateData.ctc)
      expect(ectc).toHaveValue(mockEditCandidateData.ectc)
      expect(currentLoc).toHaveValue(mockEditCandidateData.currentLocation)
      expect(noticePeriod).toHaveValue(mockEditCandidateData.np)
      expect(jobType).toHaveValue(mockEditCandidateData.jobTypeName)
      expect(skype).toHaveValue(mockEditCandidateData.skypeId)
      expect(country).toHaveValue(mockEditCandidateData.countryId.toString())
      expect(whatsAppYes.checked).toBe(true)
      act(() => {
        fireEvent.click(screen.getByTestId('candidate-downloadResume'))
      })
      await waitFor(() => {
        expect(
          screen.getByTestId(getDataInputTestId('sourceName-ext')),
        ).toHaveValue(mockEditCandidateData.sourceName)
      })

      expect(updateBtn).toBeEnabled()
      act(() => {
        fireEvent.click(updateBtn)
      })
    })
  })
})
