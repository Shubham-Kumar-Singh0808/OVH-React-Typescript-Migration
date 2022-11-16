import React from 'react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { CKEditor } from 'ckeditor4-react'
import SubmitResignationFilterOptions from './SubmitResignationFilterOptions'
import { mockSeparationFormResponse } from '../../../test/data/submitViewResignationData'
import { render, screen } from '../../../test/testUtils'

const mockSetToggle = jest.fn()
const mockSetPrimaryReason = jest.fn()
describe('Submit view resignation filter options Component Testing', () => {
  describe('should render Submit view resignation filter options with data', () => {
    beforeEach(() => {
      render(
        <SubmitResignationFilterOptions
          setToggle={mockSetToggle}
          primaryReason={'4'}
          setPrimaryReason={mockSetPrimaryReason}
        />,
        {
          preloadedState: {
            submitViewResignation: {
              getSeparationFormResponse: mockSeparationFormResponse,
            },
          },
        },
      )
    })
    screen.debug()
    test('should render with data ', () => {
      expect(screen.getByText('1000')).toBeInTheDocument()
      expect(screen.getByText('15/11/2022')).toBeInTheDocument()
      expect(screen.getByText('Admin Rbt')).toBeInTheDocument()

      const primaryReasonSelect = screen.getByTestId('select-primaryReason')
      userEvent.selectOptions(primaryReasonSelect, ['Relocation'])
      expect(primaryReasonSelect).toHaveValue('4')

      const subject = screen.getByTestId('other-reason')
      userEvent.type(subject, 'testing')
      expect(subject).toHaveValue('testing')

      const submitBtnElement = screen.getByTestId('submit-btn')
      expect(submitBtnElement).toBeInTheDocument()
      userEvent.click(submitBtnElement)
      expect(mockSetToggle).toHaveBeenCalledTimes(0)
      const clearBtnElement = screen.getByRole('button', { name: 'Clear' })
      expect(clearBtnElement).toBeEnabled()
      userEvent.click(clearBtnElement)
      userEvent.selectOptions(primaryReasonSelect, [''])
    })
    test('pass comments to test input value', () => {
      render(
        <CKEditor
          initData={process.env.JEST_WORKER_ID !== undefined && <p>Test</p>}
        />,
      )
    })
  })
})
