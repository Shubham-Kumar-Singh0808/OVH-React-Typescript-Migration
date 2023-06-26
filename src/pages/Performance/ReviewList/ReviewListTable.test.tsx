import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ReviewListTable from './ReviewListTable'
import { act, cleanup, render, screen } from '../../../test/testUtils'
import { mockReviewListResponseForAckAndCompleted } from '../../../test/data/reviewListData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
describe('Review List Table Component Testing without data', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(
        <ReviewListTable
          paginationRange={[1, 2, 3]}
          currentPage={1}
          setCurrentPage={mockSetCurrentPage}
          pageSize={20}
          setPageSize={mockSetPageSize}
          isTableView={true}
        />,
        {
          preloadedState: {
            reviewList: {
              employeeReviewList: mockReviewListResponseForAckAndCompleted,
            },
          },
        },
      )
    })
    afterEach(cleanup)
    test('should render the "Review List" table ', () => {
      const table = screen.getByRole('table')
      expect(table).toBeTruthy()
    })
    test('should render the correct headers', () => {
      expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'ID' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Employee Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Manager Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Department' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Designation' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Month' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Emp Avg Rating' }),
      ).toBeTruthy()
      // action column is rendered
      expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
    })

    test('data is rendered', () => {
      const reviewListItem1Index = 0
      const reviewListItem2Index = 2
      const reviewListFormStatus1 = screen.getByTestId(
        `reviewListTable-formStatus-${reviewListItem1Index}`,
      )
      const reviewListFormStatus2 = screen.getByTestId(
        `reviewListTable-formStatus-${reviewListItem2Index}`,
      )
      expect(reviewListFormStatus1).toHaveTextContent('Needs Acknowledgement')
      expect(reviewListFormStatus2).toHaveTextContent(
        //completed
        mockReviewListResponseForAckAndCompleted.list[reviewListItem2Index]
          .formStatus,
      )

      // employee and managerRating
      expect(
        screen.getByTestId(`reviewListTable-empRating-${reviewListItem1Index}`),
      ).toHaveTextContent('3.38')
      expect(
        screen.getByTestId(
          `reviewListTable-managerRating-${reviewListItem1Index}`,
        ),
      ).toHaveTextContent('3.38')
    })

    test('view button is rendered', () => {
      const viewBtn = screen.getByTestId('reviewList-viewForm-0')
      expect(viewBtn).toBeEnabled()
      act(() => {
        userEvent.click(viewBtn)
      })
    })
  })
})
