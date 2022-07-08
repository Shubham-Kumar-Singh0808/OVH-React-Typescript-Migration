import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ContactNumberDetails from './ContactNumberDetails'
import { render, screen, waitFor } from '../../../test/testUtils'
import { employeePersonalInfoData } from '../../../test/data/employeePersonalInfoData'

describe('Employee Passport Details', () => {
  describe('Without data', () => {
    beforeEach(() => {
      render(
        <ContactNumberDetails employeeDetails={employeePersonalInfoData} />,
      )
    })
    test('should render "Contact Details" title', () => {
      const projectName = screen.getByRole('heading', {
        name: 'Contact Details',
      })
      expect(projectName).toBeTruthy()
    })
  })
})
