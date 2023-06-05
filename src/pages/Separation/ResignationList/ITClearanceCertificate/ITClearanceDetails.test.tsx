import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ITClearanceDetails from './ITClearanceDetails'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockClearanceDetails } from '../../../../test/data/resignationListData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ITClearanceDetails />,
  </div>
)
const mockSetTogglePage = jest.fn()
describe('ITClearanceDetails Component Testing', () => {
  describe('should render ITClearanceDetails Component without data', () => {
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
        screen.getByText(mockClearanceDetails[0].employeeName),
      ).toBeInTheDocument()
      expect(
        screen.getByText(mockClearanceDetails[0].seperationEmpName),
      ).toBeInTheDocument()
      expect(
        screen.getByText(mockClearanceDetails[0].comments),
      ).toBeInTheDocument()
      expect(screen.getByText('test')).toBeInTheDocument()
    })
    test('should render  edit button without crashing', () => {
      const allocateButton = screen.getByTestId('edit-btn')
      expect(allocateButton).toBeInTheDocument()
      userEvent.click(allocateButton)
      expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
    })
    test('should render  FinanceClearanceDetails component with out crashing', () => {
      expect(
        screen.getByText('Clearance Certificate Details'),
      ).toBeInTheDocument()
    })
  })
})
