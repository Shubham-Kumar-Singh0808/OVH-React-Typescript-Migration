import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import AddNewClient from './AddNewClient'
import { render, screen, waitFor } from '../../../../test/testUtils'
import {
  mockAddNewClient,
  mockClientCountries,
} from '../../../../test/data/addNewClientData'
import { emailAddress } from '../../../../test/constants'

const clientCodeElement = 'clientCode-input'
const clientNameElement = 'clientName-input'
const clientOrgElement = 'org-input'
const clientEmailElement = 'email-address'
const contactPersonElement = 'contact-input'
const clientCountryElement = 'country-input'
const clientAddressElement = 'clientAddress-input'
const clientActiveStatus = 'activeClient-input'
const clientInActiveStatus = 'inActiveClient-input'
const countryCodeElement = 'mobileNumberCode'
const clientMobileNumberElement = 'mobileNumberInput'
const gstCodeElement = 'gstCode-input'

describe('Add Template Component Testing', () => {
  describe('render all inputs without crashing', () => {
    beforeEach(() => {
      render(<AddNewClient />)
    })
    test('should render "AddTemplate" title', () => {
      const addClientTitle = screen.getByRole('heading', {
        name: 'Add Client',
      })
      expect(addClientTitle).toBeTruthy()
    })
    test('should render Client Code Input', () => {
      expect(screen.getByTestId(clientCodeElement)).toBeTruthy()
    })
    test('should render client organization input', () => {
      expect(screen.getByTestId(clientOrgElement)).toBeTruthy()
    })
    test('should render client Name', () => {
      expect(screen.getByTestId(clientNameElement)).toBeTruthy()
    })
    test('should render client email', () => {
      expect(screen.getByTestId(clientEmailElement)).toBeTruthy()
    })
    test('should render contact person input', () => {
      expect(screen.getByTestId(contactPersonElement)).toBeTruthy()
    })
    test('should render client email-address input', () => {
      expect(screen.getByTestId(emailAddress)).toBeTruthy()
    })
    test('should render country input', () => {
      expect(screen.getByTestId(clientCountryElement)).toBeTruthy()
    })
    test('should render country-code input', () => {
      expect(screen.getByTestId(countryCodeElement)).toBeTruthy()
    })
    test('should render mobile number input', () => {
      expect(screen.getByTestId(clientMobileNumberElement)).toBeTruthy()
    })
    test('should render GST code input', () => {
      expect(screen.getByTestId(gstCodeElement)).toBeTruthy()
    })
    test('should render Address input', () => {
      expect(screen.getByTestId(clientAddressElement)).toBeTruthy()
    })
    test('should render active client status input', () => {
      expect(screen.getByTestId(clientActiveStatus)).toBeTruthy()
    })
    test('should render in-active client status input', () => {
      expect(screen.getByTestId(clientInActiveStatus)).toBeTruthy()
    })
    test('should render Add button', () => {
      expect(screen.getByTestId('add-btn')).toBeTruthy()
    })
    test('should render Back button', () => {
      expect(screen.getByTestId('back-btn')).toBeTruthy()
    })
    test('should render Clear button', () => {
      expect(screen.getByTestId('clear-btn')).toBeTruthy()
    })
  })

  describe('Add Client form testing without crashing', () => {
    const history = createMemoryHistory()
    beforeEach(() => {
      render(
        <Router history={history}>
          <AddNewClient />
        </Router>,
        {
          preloadedState: {
            addNewClient: {
              clientCountries: mockClientCountries,
              addClientDetails: mockAddNewClient,
            },
          },
        },
      )
    })
    it('should render Add button as enabled and Clear Button as disabled', () => {
      expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Clear' })).toBeEnabled()
    })
    test('pass valid email to test email input field', async () => {
      const inputEl = screen.getByTestId('email-address')
      userEvent.type(inputEl, 'test@gmail.com')
      expect(screen.getByTestId(emailAddress)).toHaveValue('test@gmail.com')
      await waitFor(() => {
        expect(screen.queryByTestId('error-msg')).not.toBeInTheDocument()
      })
    })
    test('should enable add button , when all mandatory fields are entered', async () => {
      const clientCode = screen.getByTestId(clientCodeElement)
      userEvent.type(clientCode, '000')
      expect(clientCode).toHaveValue('000')

      const clientName = screen.getByTestId(clientNameElement)
      userEvent.type(clientName, 'Raybiztech')
      expect(clientName).toHaveValue('Raybiztech')

      const clientOrg = screen.getByTestId(clientOrgElement)
      userEvent.type(clientOrg, 'Ray Business Technologies')
      expect(clientOrg).toHaveValue('Ray Business Technologies')

      const clientEmail = screen.getByTestId(clientEmailElement)
      userEvent.type(clientEmail, 'ajay.gupta@raybiztech.com')
      expect(clientEmail).toHaveValue('ajay.gupta@raybiztech.com')

      const contactPerson = screen.getByTestId(contactPersonElement)
      userEvent.type(contactPerson, 'Ajay Gupta')
      expect(contactPerson).toHaveValue('Ajay Gupta')

      userEvent.selectOptions(screen.getByTestId(clientCountryElement), 'INDIA')

      const clientAddress = screen.getByTestId(clientAddressElement)
      userEvent.type(clientAddress, 'KavuriHills')
      expect(clientAddress).toHaveValue('KavuriHills')

      const clientStatus = screen.getByRole('radio', { name: 'Active' })
      expect(clientStatus).toBeChecked()

      const countryCode = screen.getByTestId(countryCodeElement)
      userEvent.type(countryCode, '91')
      expect(countryCode).toHaveValue('91')

      const clientMobile = screen.getByTestId(clientMobileNumberElement)
      userEvent.type(clientMobile, '8979872345')
      expect(clientMobile).toHaveValue('8979872345')

      const gstCode = screen.getByTestId(gstCodeElement)
      userEvent.type(gstCode, '23441234324')
      expect(gstCode).toHaveValue('23441234324')

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Add' })).toBeEnabled()
        expect(history.location.pathname).toBe('/')
      })
    })
  })
})
