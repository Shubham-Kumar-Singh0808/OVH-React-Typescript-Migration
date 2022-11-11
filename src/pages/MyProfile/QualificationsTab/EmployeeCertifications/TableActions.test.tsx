import React from 'react'
import '@testing-library/jest-dom'
import TableActions from './TableActions'
import { fireEvent, render, screen } from '../../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'
import { mockEmployeeCertifications } from '../../../../test/data/employeeCertificationData'
import { EmployeeCertification } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'

const mockEditCertBtn = jest.fn()
const userAccessToCertifications = mockUserAccessToFeaturesData?.find(
  (feature) => feature.name === 'My Profile-Skills-Certifications',
)
describe('Table Actions Component testing', () => {
  test('should render actions without crashing', () => {
    render(
      <TableActions
        certificateItemId={409}
        isViewingAnotherEmployee={false}
        editCertificateButtonHandler={mockEditCertBtn}
        setCertificateId={jest.fn()}
        setIsDeleteModalVisible={jest.fn()}
        userAccess={userAccessToCertifications}
      />,
      {
        preloadedState: {
          employeeCertificates: {
            certificationDetails:
              mockEmployeeCertifications as EmployeeCertification[],
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      },
    )

    const editBtn = screen.getByTestId('edotCertBtn')
    expect(editBtn).toBeTruthy()
    fireEvent.click(editBtn)

    const alerBtn = screen.getByTestId('showAlertBtn')
    expect(alerBtn).toBeTruthy()
    fireEvent.click(alerBtn)
  })
})
