import React from 'react'
import '@testing-library/jest-dom'
import ClearanceCertificateDetailsForm from './ClearanceCertificateDetailsForm'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockClearanceDetails } from '../../../../test/data/resignationListData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ClearanceCertificateDetailsForm />,
  </div>
)

describe('ClearanceCertificateDetailsForm Component Testing', () => {
  describe('should render ClearanceCertificateDetailsForm Component without data', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          resignationList: {
            clearanceDetails: mockClearanceDetails,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    screen.debug()
    test('should render with data ', () => {
      expect(
        screen.getByText(mockClearanceDetails[0].employeeId),
      ).toBeInTheDocument()
      expect(
        screen.getByText(mockClearanceDetails[0].employeeName),
      ).toBeInTheDocument()
      expect(
        screen.getByText(mockClearanceDetails[0].seperationEmpId),
      ).toBeInTheDocument()
      expect(
        screen.getByText(mockClearanceDetails[0].seperationEmpName),
      ).toBeInTheDocument()
    })
  })
})
