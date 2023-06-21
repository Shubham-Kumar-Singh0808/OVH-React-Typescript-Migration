import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { PassportDetails } from './PassportDetails'
import { render, screen, waitFor } from '../../../test/testUtils'
import { employeePersonalInfoData } from '../../../test/data/employeePersonalInfoData'
import { dateFormatPerLocale } from '../../../utils/dateFormatUtils'

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language
const localeDateFormat = dateFormatPerLocale.filter(
  (lang) => lang.label === deviceLocale,
)
const dateFormat = localeDateFormat[0].format

describe('Employee Passport Details', () => {
  describe('Without data', () => {
    beforeEach(() => {
      render(<PassportDetails />)
    })
    test('should render "Passport Details" title', () => {
      const projectName = screen.getByRole('heading', {
        name: 'Passport Details',
      })
      expect(projectName).toBeTruthy()
    })
    test('should render passport number input', () => {
      const numberInput = screen.findByTestId('passportNumber')
      expect(numberInput).toBeTruthy()
    })
    test('should render passport issued place input', () => {
      const placeOfIssueInput = screen.findByTestId('passportIssue')
      expect(placeOfIssueInput).toBeTruthy()
    })
    test('should render passport issued date input', () => {
      const issuedDateInput = screen.findByTestId('passportIssuedDate')
      expect(issuedDateInput).toBeTruthy()
    })
    test('should render passport expired date input', () => {
      const expiredDateInput = screen.findByTestId('passportExpDate')
      expect(expiredDateInput).toBeTruthy()
    })
    test('should render passport front image upload', () => {
      const frontUpload = screen.findByTestId('frontUpload')
      expect(frontUpload).toBeTruthy()
    })
    test('should render passport back image upload', () => {
      const backUpload = screen.findByTestId('backUpload')
      expect(backUpload).toBeTruthy()
    })
    test('should have the place of issue input disabled', () => {
      const placeOfIssueInput = screen.getByTestId('placeOfIssueInput')
      expect(placeOfIssueInput).toBeDisabled()
    })
    test('should have front upload input disabled', () => {
      const frontUploadInput = screen.getByTestId('frontUploadInput')
      expect(frontUploadInput).toBeDisabled()
    })
    test('should have back upload input disabled', () => {
      const backUploadInput = screen.getByTestId('backUploadInput')
      expect(backUploadInput).toBeDisabled()
    })
    test('should enable the disabled fields', () => {
      const passportNumberInput = screen.getByTestId('passportNumberInput')
      userEvent.type(passportNumberInput, '123123123')
      expect(passportNumberInput).toHaveValue('123123123')
      const placeOfIssueInput = screen.getByTestId('placeOfIssueInput')
      expect(placeOfIssueInput).not.toBeDisabled()
      userEvent.type(placeOfIssueInput, '123123123')
      expect(placeOfIssueInput).toHaveValue('123123123')
      const issuedDateInput = screen.getAllByPlaceholderText(dateFormat)
      userEvent.type(
        issuedDateInput[0],
        new Date('12/20/2021').toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      )
      userEvent.type(
        issuedDateInput[1],
        new Date('12/21/2022').toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      )
      const frontUploadInput = screen.getByTestId('frontUploadInput')
      expect(frontUploadInput).not.toBeDisabled()
      const backUploadInput = screen.getByTestId('backUploadInput')
      expect(backUploadInput).not.toBeDisabled()
    })
  })
  describe('Without data', () => {
    beforeEach(() => {
      render(<PassportDetails employeeDetails={employeePersonalInfoData} />)
    })
    test('should render passport number input with values', () => {
      const passportNumberInput = screen.getByTestId('passportNumberInput')
      expect(passportNumberInput).toHaveValue(
        employeePersonalInfoData.passportNumber,
      )
    })

    test('should upload front image', async () => {
      const fileToUpload = new File(['(⌐□_□)'], 'chucknorris.png', {
        type: 'image/png',
      })
      const uploader = screen.getByTestId(
        'frontUploadInput',
      ) as HTMLInputElement

      await waitFor(() => {
        userEvent.upload(uploader, fileToUpload)
      })

      expect(uploader).toBeTruthy()
    })
    test('should upload back image', async () => {
      const fileToUpload = new File(['(⌐□_□)'], 'testFile.png', {
        type: 'image/png',
      })
      const uploader = screen.getByTestId('backUploadInput') as HTMLInputElement

      await waitFor(() => {
        userEvent.upload(uploader, fileToUpload)
      })

      expect(uploader).toBeTruthy()
    })
  })
})
