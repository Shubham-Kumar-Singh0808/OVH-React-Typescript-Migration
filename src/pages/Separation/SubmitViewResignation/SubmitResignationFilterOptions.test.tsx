import React from 'react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import SubmitResignationFilterOptions from './SubmitResignationFilterOptions'
import { mockSeparationFormResponse } from '../../../test/data/submitViewResignationData'
import { render, screen } from '../../../test/testUtils'

describe('Submit view resignation filter options Component Testing', () => {
  describe('should render Submit view resignation filter options with data', () => {
    beforeEach(() => {
      render(<SubmitResignationFilterOptions />, {
        preloadedState: {
          submitViewResignation: {
            getSeparationFormResponse: mockSeparationFormResponse,
          },
        },
      })
    })
    screen.debug()
    test('should render with data ', () => {
      expect(screen.getByText('1000')).toBeInTheDocument()
      expect(screen.getByText('15/11/2022')).toBeInTheDocument()
      expect(screen.getByText('Admin Rbt')).toBeInTheDocument()

      const primaryReasonSelect = screen.getByTestId('select-primaryReason')
      userEvent.selectOptions(primaryReasonSelect, ['Relocation'])
      expect(primaryReasonSelect).toHaveValue('2')

      const submitBtnElement = screen.getByRole('button', { name: 'Submit' })
      const clearBtnElement = screen.getByRole('button', { name: 'Clear' })
      expect(submitBtnElement).toBeDisabled()
      expect(clearBtnElement).toBeEnabled()
      userEvent.click(submitBtnElement)
      userEvent.click(clearBtnElement)
      userEvent.selectOptions(primaryReasonSelect, [''])
    })
  })
})
