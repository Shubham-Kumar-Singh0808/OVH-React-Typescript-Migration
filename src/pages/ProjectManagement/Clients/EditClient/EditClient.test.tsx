import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import EditClient from './EditClient'
import { cleanup, render, screen, waitFor } from '../../../../test/testUtils'
import {
  mockGetClientCountries,
  mockEditClient,
} from '../../../../test/data/editClientData'
import { mockClientsData } from '../../../../test/data/clientsData'
import {
  ApiLoadingState,
  clientsApiConfig,
} from '../../../../middleware/api/apiList'
import { server } from '../../../../test/server'
import { Client } from '../../../../types/ProjectManagement/Clients/clientsTypes'

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

  const clientCodeId = 'clientCodeInput'
  const organizationId = 'organizationInput'
  const clientNameId = 'clientNameInput'
  const contactPersonId = 'contactInput'
  const contactPersonEmailId = 'emailAddress'
  const mobileNumberCodeId = 'mobileNumberCode'
  const mobileNumberId = 'mobileNumberInput'
  const gstCodeInputId = 'gstCodeInput'
  const clientAddressId = 'clientAddressInput'
  const updateBtnElementId = 'updateBtn'

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
    test('should be able to update the input fields ', () => {
      // Client Code
      const clientCodeInput = screen.getByTestId(clientCodeId)
      userEvent.type(clientCodeInput, '121')
      expect(clientCodeInput).toHaveValue(`${mockEditClient.clientCode}121`)

      // Organization
      const organizationInput = screen.getByTestId(organizationId)
      userEvent.clear(organizationInput)
      userEvent.type(organizationInput, 'Rooftop Digital')

      // Client Name
      const clientNameInput = screen.getByTestId(clientNameId)
      userEvent.type(clientNameInput, 'AM Solutions')

      // Client Contact Person
      const contactPersonInput = screen.getByTestId(contactPersonId)
      userEvent.type(contactPersonInput, 'test dev')

      // Contact Person Email
      const contactPersonEmail = screen.getByTestId(contactPersonEmailId)
      userEvent.type(contactPersonEmail, 'com')

      // Mobile Country code
      const mobileNumberCode = screen.getByTestId(mobileNumberCodeId)
      userEvent.type(mobileNumberCode, '2')

      // Mobile Number
      const mobileNumberInput = screen.getByTestId(mobileNumberId)
      userEvent.type(mobileNumberInput, '246346356')

      // GST Code
      const gstCodeInput = screen.getByTestId(gstCodeInputId)
      userEvent.type(gstCodeInput, 'GST657HT64')

      // GST Code
      const clientAddressInput = screen.getByTestId(clientAddressId)
      userEvent.type(clientAddressInput, 'test location new')

      // Update Button
      const updateBtnElement = screen.getByTestId(updateBtnElementId)
      userEvent.click(updateBtnElement)
      expect(updateBtnElement).not.toBeDisabled()
    })
  })

  describe('Edit Client Component', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          clients: {
            clientsList: mockClientsData,
            // isLoading: ApiLoadingState.succeeded,
            // editClient: mockEditClient,
            clientCountries: mockGetClientCountries,
          },
        },
      })
    })
    afterEach(cleanup)
    test('should be able to select country', () => {
      const countrySelectElement = screen.getByTestId('countryInput')
      expect(countrySelectElement).toBeInTheDocument()
      userEvent.selectOptions(countrySelectElement, ['AUSTRALIA'])
      expect(countrySelectElement).toHaveValue('AUSTRALIA')
    })
    test('update button should disable upon providing existing organization name ', async () => {
      // Client Code
      const clientCodeInput = screen.getByTestId(clientCodeId)
      userEvent.type(clientCodeInput, '999')
      expect(clientCodeInput).toHaveValue(`999`)

      // Organization
      const organizationInput = screen.getByTestId(organizationId)
      userEvent.type(organizationInput, 'ABS-CBN International')

      // Client Name
      const clientNameInput = screen.getByTestId(clientNameId)
      userEvent.type(clientNameInput, 'newTestClient')

      // Client Contact Person
      const contactPersonInput = screen.getByTestId(contactPersonId)
      userEvent.type(contactPersonInput, 'test dev')

      // Contact Person Email
      const contactPersonEmail = screen.getByTestId(contactPersonEmailId)
      userEvent.type(contactPersonEmail, 'com')

      // Mobile Country code
      const mobileNumberCode = screen.getByTestId(mobileNumberCodeId)
      userEvent.type(mobileNumberCode, '2')

      // Mobile Number
      const mobileNumberInput = screen.getByTestId(mobileNumberId)
      userEvent.type(mobileNumberInput, '246346356')

      // GST Code
      const gstCodeInput = screen.getByTestId(gstCodeInputId)
      userEvent.type(gstCodeInput, 'GST657HT64')

      // GST Code
      const clientAddressInput = screen.getByTestId(clientAddressId)
      userEvent.type(clientAddressInput, 'test location')

      // Update Button
      const updateBtnElement = screen.getByTestId(updateBtnElementId)
      userEvent.click(updateBtnElement)
      await waitFor(() => {
        expect(updateBtnElement).toBeDisabled()
      })
    })
  })
  describe('Edit Client Component', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          clients: {
            clientsList: mockClientsData,
            // isLoading: ApiLoadingState.succeeded,
            editClient: mockEditClient,
            clientCountries: mockGetClientCountries,
          },
        },
      })
    })
    afterEach(cleanup)
    test('update button should disable upon providing existing client name ', async () => {
      // Client Code
      const clientCodeInput = screen.getByTestId(clientCodeId)
      userEvent.clear(clientCodeInput)
      userEvent.type(clientCodeInput, '888')
      expect(clientCodeInput).toHaveValue(`888`)

      // Organization
      const organizationInput = screen.getByTestId(organizationId)
      userEvent.clear(organizationInput)
      userEvent.type(organizationInput, 'new test')

      // Client Name
      const clientNameInput = screen.getByTestId(clientNameId)
      userEvent.type(clientNameInput, 'Overseas Connect INC')

      // Client Contact Person
      const contactPersonInput = screen.getByTestId(contactPersonId)
      userEvent.type(contactPersonInput, 'test dev')

      // Contact Person Email
      const contactPersonEmail = screen.getByTestId(contactPersonEmailId)
      userEvent.type(contactPersonEmail, 'test@gmail.com')

      // Mobile Country code
      const mobileNumberCode = screen.getByTestId(mobileNumberCodeId)
      userEvent.type(mobileNumberCode, '91')

      // Mobile Number
      const mobileNumberInput = screen.getByTestId(mobileNumberId)
      userEvent.type(mobileNumberInput, '246346567')

      // GST Code
      const gstCodeInput = screen.getByTestId(gstCodeInputId)
      userEvent.type(gstCodeInput, 'GST657HT73')

      // GST Code
      const clientAddressInput = screen.getByTestId(clientAddressId)
      userEvent.type(clientAddressInput, 'test location')

      // Update Button
      const updateBtnElement = screen.getByTestId(updateBtnElementId)
      userEvent.click(updateBtnElement)
      await waitFor(() => {
        expect(updateBtnElement).toBeDisabled()
      })
    })
  })
})
