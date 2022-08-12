import React from 'react'
import '@testing-library/jest-dom'
import EmployeeCertificationsTable from './EmployeeCertificationsTable'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { EmployeeCertification } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import { mockEmployeeCertifications } from '../../../../test/data/employeeCertificationData'

const mockEditHandler = jest.fn()

describe('Employee Certification Table Component Testing', () => {
  describe('Certification Table without data', () => {
    beforeEach(() => {
      render(
        <EmployeeCertificationsTable
          editCertificateButtonHandler={mockEditHandler}
        />,
      )
    })

    test('should render table header', () => {
      expect(screen.getByText('Description')).toBeInTheDocument()
    })
  })

  describe('Certification Table with data', () => {
    test('should display table data', async () => {
      render(
        <EmployeeCertificationsTable
          editCertificateButtonHandler={mockEditHandler}
        />,
        {
          preloadedState: {
            employeeCertificates: {
              certificationDetails:
                mockEmployeeCertifications as EmployeeCertification[],
            },
          },
        },
      )
      expect(screen.getByText('Description')).toBeInTheDocument()

      await waitFor(() => {
        expect(screen.getByText('qweert')).toBeInTheDocument()
      })
    })
  })
})
