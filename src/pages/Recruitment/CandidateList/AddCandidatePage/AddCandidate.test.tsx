import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AddCandidate from './AddCandidate'
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
  mockAllEmployeeDetailsList,
  mockGetTechnology,
  mockAllCompaniesData,
  mockGetEmpCountries,
  mockAllVacaniciesListNewCandidate,
} from '../../../../test/data/candidateListData'
import {
  CandidateJobTypeEnum,
  CandidateSourceType,
} from '../../../../types/Recruitment/CandidateList/CandidateListTypes'
import {
  getDataInputTestId,
  getLabelAsterixDataTestId,
  initialCandidateAppliedForList,
  initialCandidateCountry,
} from '../CandidateListHelpers'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'

const toRender = <AddCandidate />

const requiredlabelsList = [
  // all required fields
  'First Name', //0
  'Last Name', //1
  'Applied For', //2
  'Email', //3
  'Source Type', //4
  'Experience', //5
  'Source Name', //6
  'Technology', //7
  'DOB', //8
  'Mobile', //9
  'Skills', //10
  'CTC', //11
  'ECTC', //12
  'Current Location', //13
  'Notice Period', //14
  'Job Type', //15
  'Country', //16
  'Reason For Change', //17
]
const nonRequiredLabelsList = [
  //all non required fields
  'Aadhar Number',
  'PAN Number',
  'LinkedIn ID',
  'Recruiter Name',
  'Current Employer',
  'Skype ID',
  'Upload Resume',
  'WhatsApp Notifications',
]

describe('Add Candidate', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          candidateList: {
            isLoading: ApiLoadingState.succeeded,
            getAllTechnology: mockGetTechnology,
            allEmployeeDetailsList: mockAllEmployeeDetailsList,
            allCompaniesData: mockAllCompaniesData,
            allJobVacancies: mockAllVacaniciesListNewCandidate,
            empCountries: mockGetEmpCountries,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('all labels are rendered', () => {
      requiredlabelsList.forEach((label) => {
        expect(
          screen.getByTestId(`${getLabelAsterixDataTestId(label)[0]}`),
        ).toHaveTextContent(`${label}:`)
      })
      nonRequiredLabelsList.forEach((nonReqLabel) => {
        expect(
          screen.getByTestId(`${getLabelAsterixDataTestId(nonReqLabel)[0]}`),
        ).toHaveTextContent(`${nonReqLabel}:`)
      })
    })
    test('applied for has correct number of selected options for job vacancies', () => {
      expect(screen.getAllByTestId('addCandOpt-jobVacancies')).toHaveLength(
        mockAllVacaniciesListNewCandidate.size + 1,
      )
    })
    test('applied for has correct number of selected options for country', () => {
      expect(screen.getAllByTestId('addCandOpt-countryOpt')).toHaveLength(
        mockGetEmpCountries.length + 1,
      )
    })
    test('applied for has correct number of selected options for technology', () => {
      expect(screen.getAllByTestId('addCandOpt-techOpt')).toHaveLength(
        mockGetTechnology.length + 1,
      )
    })
    test('add button functionality', async () => {
      // all required fields
      const firstName = screen.getByTestId(`${getDataInputTestId('fName')}`)
      const lastName = screen.getByTestId(`${getDataInputTestId('lName')}`)
      const appliedFor = screen.getByTestId(
        `${getDataInputTestId('appliedFor')}`,
      )
      const email = screen.getByTestId(`${getDataInputTestId('email')}`)
      const sourceType = screen.getByTestId(
        `${getDataInputTestId('sourceType')}`,
      )
      const experience = screen.getByTestId(
        `${getDataInputTestId('experience')}`,
      )
      const technology = screen.getByTestId(
        `${getDataInputTestId('technology')}`,
      )
      const mobileCode = screen.getByTestId(
        `${getDataInputTestId('mobileCode')}`,
      )
      const mobileNumber = screen.getByTestId(
        `${getDataInputTestId('mobileNumber')}`,
      )
      const skills = screen.getByTestId(`${getDataInputTestId('skills')}`)
      const ctc = screen.getByTestId(`${getDataInputTestId('ctc')}`)
      const ectc = screen.getByTestId(`${getDataInputTestId('ectc')}`)
      const currentLoc = screen.getByTestId(
        `${getDataInputTestId('currentLoc')}`,
      )
      const noticePeriod = screen.getByTestId(
        `${getDataInputTestId('noticeP')}`,
      )
      const jobType = screen.getByTestId(`${getDataInputTestId('jobType')}`)
      const country = screen.getByTestId(`${getDataInputTestId('country')}`)

      // all non-required fields
      const aadharNumber = screen.getByTestId(`${getDataInputTestId('aNum')}`)
      const panNumber = screen.getByTestId(`${getDataInputTestId('pNum')}`)
      const linkedin = screen.getByTestId(`${getDataInputTestId('linkedin')}`)
      const skype = screen.getByTestId(`${getDataInputTestId('skype')}`)
      const whatsAppYes = screen.getByTestId(
        `${getDataInputTestId('whatsapp')}-yes`,
      ) as HTMLInputElement
      const whatsAppNo = screen.getByTestId(
        `${getDataInputTestId('whatsapp')}-no`,
      ) as HTMLInputElement
      const addButton = screen.getByTestId('addCand-addBtn')
      const resumeUpload = screen.getByTestId(
        getDataInputTestId('resumeUpload'),
      ) as HTMLInputElement

      //all required fields have red asterix
      requiredlabelsList.forEach((label) => {
        expect(
          screen.getByTestId(`${getLabelAsterixDataTestId(label)[1]}`),
        ).toHaveClass(TextDanger)
      })

      //all non required fields have white asterix
      nonRequiredLabelsList.forEach((label) => {
        expect(
          screen.getByTestId(`${getLabelAsterixDataTestId(label)[1]}`),
        ).toHaveClass(TextWhite)
      })

      // add button is disabled initially
      expect(addButton).toBeDisabled()

      // testing all required fields now

      // firstName
      expect(firstName).toHaveValue('')
      userEvent.type(firstName, 'First')
      expect(firstName).toHaveValue('First')
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[0])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      // lastName
      expect(lastName).toHaveValue('')
      userEvent.type(lastName, 'Last')
      expect(lastName).toHaveValue('Last')
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[1])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      //appliedFor
      const chosenMockAppliedFor = mockAllVacaniciesListNewCandidate.list[1]
      expect(appliedFor).toHaveValue(
        initialCandidateAppliedForList.id.toString(),
      )
      userEvent.selectOptions(appliedFor, chosenMockAppliedFor.id.toString())
      expect(appliedFor).toHaveValue(chosenMockAppliedFor.id.toString())
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[2])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      // email
      expect(email).toHaveValue('')
      userEvent.type(email, 'testing@example.com')
      expect(email).toHaveValue('testing@example.com')
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[3])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      // source type
      expect(sourceType).toHaveValue('')
      userEvent.selectOptions(
        sourceType,
        CandidateSourceType.external.toString(),
      )
      expect(sourceType).toHaveValue(CandidateSourceType.external.toString())
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[4])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      //experience
      expect(experience).toHaveValue('')
      userEvent.type(experience, '3')
      expect(experience).toHaveValue('3')
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[5])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      // source name
      const notInternalSourceName = screen.getByTestId(
        getDataInputTestId('sourceName-ext'),
      )
      expect(notInternalSourceName).toHaveValue('')
      userEvent.type(notInternalSourceName, 'notInternal')
      expect(notInternalSourceName).toHaveValue('notInternal')
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[6])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      //technology
      const chosenMockTechnology = mockGetTechnology[2]
      expect(technology).toHaveValue('')
      userEvent.selectOptions(technology, chosenMockTechnology.name)
      expect(technology).toHaveValue(chosenMockTechnology.name)
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[7])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      //dob
      const dobDate = screen.getAllByPlaceholderText('dd/mm/yyyy')[0]
      expect(dobDate).toHaveValue('')
      await waitFor(() => {
        fireEvent.change(dobDate, {
          target: { value: '01/06/2004' },
        })
      })
      expect(dobDate).toHaveValue('06/01/2004') // date is stored in interchange, but changed to correct format when giving for api
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[8])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      // mobile
      const chosenMockCode = mockGetEmpCountries[3]
      expect(mobileCode).toHaveValue(initialCandidateCountry.id.toString())
      userEvent.selectOptions(mobileCode, chosenMockCode.id.toString())
      expect(mobileCode).toHaveValue(chosenMockCode.id.toString())
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[9])[1]}`,
        ),
      ).toHaveClass(TextDanger) // mobile number is also required
      expect(mobileNumber).toHaveValue('')
      userEvent.type(mobileNumber, '43434')
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[9])[1]}`,
        ),
      ).toHaveClass(TextDanger) // mobile number must be 10 digits
      userEvent.type(mobileNumber, '43432')
      expect(mobileNumber).toHaveValue('4343443432')
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[9])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      // skills
      expect(skills).toHaveValue('')
      userEvent.type(skills, 'C#')
      expect(skills).toHaveValue('C#')
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[10])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      // ctc
      expect(ctc).toHaveValue('')
      userEvent.type(ctc, '23')
      expect(ctc).toHaveValue('23')
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[11])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      // ectc
      expect(ectc).toHaveValue('')
      userEvent.type(ectc, '10')
      expect(ectc).toHaveValue('10')
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[12])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      // current location
      expect(currentLoc).toHaveValue('')
      userEvent.type(currentLoc, 'Hyderabad')
      expect(currentLoc).toHaveValue('Hyderabad')
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[13])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      // notice period
      expect(noticePeriod).toHaveValue('')
      userEvent.type(noticePeriod, '5')
      expect(noticePeriod).toHaveValue('5')
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[14])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      //jobType
      expect(jobType).toHaveValue('')
      userEvent.selectOptions(jobType, CandidateJobTypeEnum.fullTime.toString())
      expect(jobType).toHaveValue(CandidateJobTypeEnum.fullTime.toString())
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[15])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      //country
      const mockChosenCountry = mockGetEmpCountries[2]
      expect(country).toHaveValue(initialCandidateCountry.id.toString())
      userEvent.selectOptions(country, mockChosenCountry.id.toString())
      expect(country).toHaveValue(mockChosenCountry.id.toString())
      expect(
        screen.getByTestId(
          `${getLabelAsterixDataTestId(requiredlabelsList[16])[1]}`,
        ),
      ).toHaveClass(TextWhite)
      expect(addButton).toBeDisabled()

      //testing all non-required fields now

      //aadhar card
      expect(aadharNumber).toHaveValue('')
      userEvent.type(aadharNumber, '53543554354')
      expect(aadharNumber).toHaveValue('53543554354')
      expect(addButton).toBeEnabled()

      // pan number
      expect(panNumber).toHaveValue('')
      userEvent.type(panNumber, 'jojo4343')
      expect(panNumber).toHaveValue('jojo4343')
      expect(addButton).toBeEnabled()

      // linkedin
      expect(linkedin).toHaveValue('')
      userEvent.type(linkedin, 'reee322')
      expect(linkedin).toHaveValue('reee322')
      expect(addButton).toBeEnabled()

      // Recruiter Name
      const recruiterName = screen.getByPlaceholderText('Recruiter Name')
      expect(recruiterName).toHaveValue('')
      recruiterName.click()
      recruiterName.focus()
      fireEvent.change(recruiterName, { target: { value: 'C' } })
      const recruitersListAuto = screen.getAllByTestId(
        'addCand-empNames-autoComplete',
      )
      act(() => {
        fireEvent.click(recruitersListAuto[0])
      })

      // current employer
      const currentEmployer = screen.getByPlaceholderText('Current Employer')
      expect(currentEmployer).toHaveValue('')
      currentEmployer.click()
      currentEmployer.focus()
      fireEvent.change(currentEmployer, { target: { value: 'P' } })
      const allCompaniesOptions = screen.getAllByTestId(
        'autoComplete-currentEmployer',
      )
      act(() => {
        fireEvent.click(allCompaniesOptions[0])
      })

      // skype
      expect(skype).toHaveValue('')
      userEvent.type(skype, 'prrr12')
      expect(skype).toHaveValue('prrr12')
      expect(addButton).toBeEnabled()

      // whatsapp checked
      expect(whatsAppYes.checked).toBe(true)
      expect(whatsAppNo.checked).toBe(false)
      expect(addButton).toBeEnabled()

      // file upload
      const fileToUpload = new File(['(⌐□_□)'], 'test.pdf', {
        type: 'application/pdf',
      })
      await waitFor(() => {
        act(() => {
          userEvent.upload(resumeUpload, fileToUpload)
        })
      })
      expect(resumeUpload).toBeTruthy()
      expect(addButton).toBeEnabled()
    })
  })
})
