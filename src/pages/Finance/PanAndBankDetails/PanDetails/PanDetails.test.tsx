/* eslint-disable sonarjs/no-identical-functions */
import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import PanDetails from './PanDetails'
import { cleanup, fireEvent, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockBankInformation } from '../../../../test/data/panDetailsData'
import { BankInfo } from '../../../../types/Finance/PanDetails/panDetailsTypes'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

describe('Pan Details Component Testing', () => {
  describe('should render Pan Details Component without data', () => {
    beforeEach(() => {
      render(<PanDetails />, {
        preloadedState: {
          panDetails: {
            bankInfo: mockBankInformation,
            isLoading: ApiLoadingState.succeeded,
            editBankAccount: {} as BankInfo,
            error: 0,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })
    test('should render with data ', () => {
      expect(screen.getByText('P.F. A/C No')).toBeInTheDocument()
      expect(screen.getByText('UAN')).toBeInTheDocument()
      expect(screen.getByText('Pan Card No')).toBeInTheDocument()
      expect(screen.getByText('Aadhar Card No')).toBeInTheDocument()
      const editBtnElement = screen.getByRole('button', { name: 'Edit' })
      expect(editBtnElement).toBeEnabled()
      userEvent.click(editBtnElement)
    })
  })
  test('should render  checkbox', () => {
    const cb = screen.findByTestId('ch-All')
    expect(cb).toBeTruthy()
  })
})

describe('should render Pan Details Component without data', () => {
  beforeEach(() => {
    render(<PanDetails />, {
      preloadedState: {
        panDetails: {
          bankInfo: mockBankInformation,
          isLoading: ApiLoadingState.succeeded,
          editBankAccount: {} as BankInfo,
          error: 0,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should able to render every element', () => {
    const pfNumber = screen.getByTestId('pfNumber')
    userEvent.type(pfNumber, '123456987')

    const uanNumber = screen.getByTestId('uanNumber')
    userEvent.type(uanNumber, '123456789')

    const panCardNumber = screen.getByTestId('panCardNumber')
    userEvent.type(panCardNumber, '123456789')

    const aadharCardNumber = screen.getByTestId('aadharNumber')
    userEvent.type(aadharCardNumber, '636188754099')

    const cbAll = screen.getByTestId('pfNumber')
    fireEvent.change(cbAll, { target: { checked: true } })
    fireEvent.change(cbAll, { target: { checked: false } })
  })
})
