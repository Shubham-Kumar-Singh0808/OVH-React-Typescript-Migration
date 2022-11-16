import React from 'react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { CKEditor } from 'ckeditor4-react'
import EmployeeViewFilterOptions from './EmployeeViewFilterOptions'
import { mockResignationView } from '../../../test/data/submitViewResignationData'
import { render, screen } from '../../../test/testUtils'

const mockSetToggle = jest.fn()
describe('Employee view resignation filter options Component Testing', () => {
  describe('should render Employee view resignation filter options with data', () => {
    beforeEach(() => {
      render(<EmployeeViewFilterOptions setToggle={mockSetToggle} />, {
        preloadedState: {
          submitViewResignation: {
            resignationView: mockResignationView,
          },
        },
      })
    })
    screen.debug()
    test('should render with data ', () => {
      expect(screen.getByText('Resigned')).toBeInTheDocument()
      expect(screen.getByText('12/03/2022')).toBeInTheDocument()
      const submitBtnElement = screen.getByTestId('submit-btn')
      expect(submitBtnElement).toBeInTheDocument()
      userEvent.click(submitBtnElement)
      expect(mockSetToggle).toHaveBeenCalledTimes(0)
      const clearBtnElement = screen.getByRole('button', { name: 'Clear' })
      expect(clearBtnElement).toBeDisabled()
      userEvent.click(clearBtnElement)
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
