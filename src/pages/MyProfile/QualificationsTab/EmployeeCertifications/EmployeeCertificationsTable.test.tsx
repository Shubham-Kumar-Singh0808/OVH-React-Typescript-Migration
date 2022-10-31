import React from 'react'
import '@testing-library/jest-dom'
import EmployeeCertificationsTable from './EmployeeCertificationsTable'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { EmployeeCertification } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import { mockEmployeeCertifications } from '../../../../test/data/employeeCertificationData'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const mockEditHandler = jest.fn()
const userAccessToCertifications = mockUserAccessToFeaturesData?.find(
  (feature) => feature.name === 'My Profile-Skills-Certifications',
)
const renderCertificationsTable = (
  <EmployeeCertificationsTable
    editCertificateButtonHandler={mockEditHandler}
    userAccess={userAccessToCertifications}
  />
)
describe('Employee Certification Table Component Testing', () => {
  describe('Certification Table without data', () => {
    beforeEach(() => {
      render(renderCertificationsTable, {
        preloadedState: {
          employeeCertificates: {
            certificationDetails:
              mockEmployeeCertifications as EmployeeCertification[],
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })

    test('should render the "EmployeeCertifications" table ', () => {
      const table = screen.getAllByRole('table')
      expect(table).toBeTruthy()
    })
    test('should render the correct headers', () => {
      expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Technology' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Type of Certificate' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Certification' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Registration No' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Completed Date' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Expiry Date' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Percentage' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Description' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    })
    test('should render correct number of page records', () => {
      expect(screen.queryAllByRole('row')).toHaveLength(10)
    })
  })
 
})
