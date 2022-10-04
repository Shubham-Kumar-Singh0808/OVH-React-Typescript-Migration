import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import EditClient from './EditClient'
import { cleanup, render, screen } from '../../../../test/testUtils'
import {
  mockGetClientCountries,
  mockEditClient,
} from '../../../../test/data/editClientData'
import { mockClientsData } from '../../../../test/data/clientsData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EditClient />
  </div>
)
describe('Edit Client Component Testing', () => {
  describe('Edit Client Component Testing without data', () => {
    beforeEach(() => {
      render(toRender)
    })
    test('should render edit client component with out crashing', () => {
      expect(screen.getByText('Edit Client')).toBeInTheDocument()
    })
    test('should render edit client', () => {
      const backButton = screen.getByTestId('backBtn')
      expect(backButton).toBeTruthy()
    })
    test('should render client code input field ', () => {
      const clientCodeInput = screen.findByTestId('clientCodeInput')
      expect(clientCodeInput).toBeTruthy()
    })
    test('should render organization input field ', () => {
      const organizationInput = screen.findByTestId('organizationInput')
      expect(organizationInput).toBeTruthy()
    })
    test('should render client name input field', () => {
      const clientNameInput = screen.findByTestId('clientNameInput')
      expect(clientNameInput).toBeTruthy()
    })
    test('should render contact person input field', () => {
      const contactPersonInput = screen.findByTestId('contactInput')
      expect(contactPersonInput).toBeTruthy()
    })
    test('should render contact person email address ', () => {
      const contactPersonEmail = screen.findByTestId('emailAddress')
      expect(contactPersonEmail).toBeTruthy()
    })
    test('should render country select element ', () => {
      const countryInput = screen.findByTestId('countryInput')
      expect(countryInput).toBeTruthy()
    })
    test('should render gst code input field ', () => {
      const gstCodeInput = screen.findByTestId('gstCodeInput')
      expect(gstCodeInput).toBeTruthy()
    })
  })

  describe('Edit Client Component Testing with data', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          clients: {
            clientsList: mockClientsData,
            isLoading: ApiLoadingState.succeeded,
            editClient: mockEditClient,
            clientCountries: mockGetClientCountries,
          },
        },
      })
    })
    afterEach(cleanup)
    test('should be able to select country', () => {
      const countrySelectElement = screen.getByTestId('countryInput')
      expect(countrySelectElement).toBeInTheDocument()
      userEvent.selectOptions(countrySelectElement, ['USA'])
      expect(countrySelectElement).toHaveValue('USA')
    })
    test('should be able to update the input fields ', () => {
      // Client Code
      const clientCodeInput = screen.getByTestId('clientCodeInput')
      userEvent.type(clientCodeInput, '121')
      expect(clientCodeInput).toHaveValue(`${mockEditClient.clientCode}121`)

      // Organization
      const organizationInput = screen.getByTestId('organizationInput')
      userEvent.type(organizationInput, 'test')

      // Client Name
      const clientNameInput = screen.getByTestId('clientNameInput')
      userEvent.type(clientNameInput, 'testing')

      // Client Contact Person
      const contactPersonInput = screen.getByTestId('contactInput')
      userEvent.type(contactPersonInput, 'test dev')

      // Contact Person Email
      const contactPersonEmail = screen.getByTestId('emailAddress')
      userEvent.type(contactPersonEmail, 'com')

      // Mobile Country code
      const mobileNumberCode = screen.getByTestId('mobileNumberCode')
      userEvent.type(mobileNumberCode, '2')

      // Mobile Number
      const mobileNumberInput = screen.getByTestId('mobileNumberInput')
      userEvent.type(mobileNumberInput, '246346356')

      // GST Code
      const gstCodeInput = screen.getByTestId('gstCodeInput')
      userEvent.type(gstCodeInput, 'GST657HT64')

      // GST Code
      const clientAddressInput = screen.getByTestId('clientAddressInput')
      userEvent.type(clientAddressInput, 'test location')

      // Update Button
      const updateBtnElement = screen.getByTestId('updateBtn')
      userEvent.click(updateBtnElement)
      expect(updateBtnElement).not.toBeDisabled()
    })
  })
})
