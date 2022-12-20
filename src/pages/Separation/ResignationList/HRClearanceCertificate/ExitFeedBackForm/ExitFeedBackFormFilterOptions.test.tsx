import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ExitFeedBackFormFilterOptions from './ExitFeedBackFormFilterOptions'
import { render, screen, waitFor } from '../../../../../test/testUtils'

describe('Exit FeedBack Filter Options Component Testing with data', () => {
  beforeEach(() => {
    render(<ExitFeedBackFormFilterOptions />)
  })
  screen.debug()
  test('should able to select values for options for respective select element', async () => {
    const salary = screen.getByTestId('salary-test')
    userEvent.type(salary, '6000')
    expect(salary).toHaveValue('6000')

    const opportunityForGrowth = screen.getByTestId('opportunityForGrowth-test')
    userEvent.type(opportunityForGrowth, 'development')
    expect(opportunityForGrowth).toHaveValue('development')

    const recognitionwork = screen.getByTestId('recognition-work')
    userEvent.type(recognitionwork, 'java')
    expect(recognitionwork).toHaveValue('java')

    const promotion = screen.getByTestId('promotion-test')
    userEvent.type(promotion, 'manager')
    expect(promotion).toHaveValue('manager')

    const educationalBackground = screen.getByTestId(
      'educationalBackground-name',
    )
    userEvent.type(educationalBackground, 'master')
    expect(educationalBackground).toHaveValue('master')

    const personnelPolicies = screen.getByTestId('personal-policies')
    userEvent.type(personnelPolicies, 'hike')
    expect(personnelPolicies).toHaveValue('hike')

    const organization = screen.getByTestId('culture-organization')
    userEvent.type(organization, 'RBT')
    expect(organization).toHaveValue('RBT')

    const roleClarity = screen.getByTestId('role-clarity')
    userEvent.type(roleClarity, 'testing')
    expect(roleClarity).toHaveValue('testing')

    const superiorName = screen.getByTestId('superior-name')
    userEvent.type(superiorName, 'ramesh')
    expect(superiorName).toHaveValue('ramesh')

    const joinCompany = screen.getByTestId('join-company')
    userEvent.type(joinCompany, 'cognine')
    expect(joinCompany).toHaveValue('cognine')

    const expectations = screen.getByTestId('expectations-test')
    userEvent.type(expectations, 'hike')
    expect(expectations).toHaveValue('hike')

    const dislike = screen.getByTestId('dislike-test')
    userEvent.type(dislike, 'testings')
    expect(dislike).toHaveValue('testings')

    const joinLater = screen.getByTestId('join-later')
    userEvent.type(joinLater, 'time')
    expect(joinLater).toHaveValue('time')

    const fileToUpload = new File(['(⌐□_□)'], 'testFile.png', {
      type: 'image/png',
    })
    const uploader = screen.getByTestId('file-upload') as HTMLInputElement

    await waitFor(() => {
      userEvent.upload(uploader, fileToUpload)
    })

    expect(uploader).toBeTruthy()

    const relievingFileToUpload = new File(['(⌐□_□)'], 'testFile.png', {
      type: 'image/png',
    })
    const upload = screen.getByTestId(
      'relievingFile-upload',
    ) as HTMLInputElement

    await waitFor(() => {
      userEvent.upload(upload, relievingFileToUpload)
    })

    expect(uploader).toBeTruthy()

    const createBtnElement = screen.getByRole('button', { name: 'Submit' })
    expect(createBtnElement).toBeEnabled()
    userEvent.click(createBtnElement)
    userEvent.click(screen.getByTestId('clear-btn'))
    userEvent.type(salary, '')
    userEvent.type(opportunityForGrowth, '')
    userEvent.type(recognitionwork, '')
    userEvent.type(promotion, '')
    userEvent.type(educationalBackground, '')
    userEvent.type(personnelPolicies, '')
    userEvent.type(organization, '')
    userEvent.type(roleClarity, '')
    userEvent.type(superiorName, '')
    userEvent.type(joinCompany, '')
    userEvent.type(expectations, '')
    userEvent.type(dislike, '')
    userEvent.type(joinLater, '')
  })
})
