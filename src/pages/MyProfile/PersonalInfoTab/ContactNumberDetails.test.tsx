import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ContactNumberDetails from './ContactNumberDetails'
import { render, screen } from '../../../test/testUtils'

describe('Employee Passport Details', () => {
  describe('Without data', () => {
    beforeEach(() => {
      render(<ContactNumberDetails setSaveButtonEnabled={jest.fn()} />)
    })
    test('should render "Contact Details" title', () => {
      const contactHeader = screen.getByRole('heading', {
        name: 'Contact Details',
      })
      expect(contactHeader).toBeTruthy()
    })
    test('should render "Emergency Contact" labels', () => {
      expect(
        screen.getByRole('heading', { name: 'Emergency Contact' }),
      ).toBeTruthy()
    })
    test('should render all the labels', () => {
      expect(screen.getByTestId('mobileNumberLabel')).toBeTruthy()
      expect(screen.getByTestId('altNumberLabel')).toBeTruthy()
      expect(screen.getByTestId('homeNumberLabel')).toBeTruthy()
      expect(screen.getByTestId('workNumberLabel')).toBeTruthy()
      expect(screen.getByTestId('emergencyContactNameLabel')).toBeTruthy()
      expect(screen.getByTestId('emergencyMobileLabel')).toBeTruthy()
      expect(screen.getByTestId('relationshipLabel')).toBeTruthy()
    })
    test('should have all placeholders disabled', () => {
      expect(screen.getByTestId('mobileNumberPlaceholder')).toBeDisabled()
      expect(screen.getByTestId('altNumberPlaceholder')).toBeDisabled()
      expect(screen.getByTestId('homeNumberPlaceholder')).toBeDisabled()
      expect(screen.getByTestId('workNumberPlaceholder')).toBeDisabled()
      expect(screen.getByTestId('emergencyMobilePlaceholder')).toBeDisabled()
    })
    test('should have the correct value when value is changed', () => {
      const mobileNumberInput = screen.getByTestId('mobileNumberInput')
      userEvent.type(mobileNumberInput, '1231231231')
      expect(mobileNumberInput).toHaveValue('1231231231')

      const altNumberInput = screen.getByTestId('altNumberInput')
      userEvent.type(altNumberInput, '1231231231')
      expect(altNumberInput).toHaveValue('1231231231')

      const homeCodeInput = screen.getByTestId('homeCodeInput')
      userEvent.type(homeCodeInput, '1234')
      expect(homeCodeInput).toHaveValue('1234')

      const homeNumberInput = screen.getByTestId('homeNumberInput')
      userEvent.type(homeNumberInput, '12312312')
      expect(homeNumberInput).toHaveValue('12312312')

      const workCodeInput = screen.getByTestId('workCodeInput')
      userEvent.type(workCodeInput, '1234')
      expect(workCodeInput).toHaveValue('1234')

      const workNumberInput = screen.getByTestId('workNumberInput')
      userEvent.type(workNumberInput, '12312312')
      expect(workNumberInput).toHaveValue('12312312')

      const emergencyContactNameInput = screen.getByTestId(
        'emergencyContactNameInput',
      )
      userEvent.type(emergencyContactNameInput, 'Paul')
      expect(emergencyContactNameInput).toHaveValue('Paul')

      const emergencyMobileInput = screen.getByTestId('emergencyMobileInput')
      userEvent.type(emergencyMobileInput, '1231231231')
      expect(emergencyMobileInput).toHaveValue('1231231231')

      const relationShipSelect = screen.getByTestId('relationShipSelect')
      userEvent.selectOptions(relationShipSelect, 'Brother')
      expect(relationShipSelect).toHaveValue('Brother')
    })
  })
})
