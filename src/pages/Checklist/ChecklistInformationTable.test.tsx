import React from 'react'
import userEvent from '@testing-library/user-event'
import ChecklistInformationTable from './ChecklistInformationTable'
import { getDateTimeFromTimestamp } from './ChecklistHelpers'
import { cleanup, render, screen, act } from '../../test/testUtils'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { mockChecklist } from '../../test/data/ChecklistData'

describe('CheckList Information Table', () => {
  describe('rendered', () => {
    beforeEach(() => {
      render(<ChecklistInformationTable />, {
        preloadedState: {
          Checklist: {
            isLoading: ApiLoadingState.succeeded,
            error: null,
            checklistParams: { endIndex: 20, startIndex: 0 },
            incomingChecklist: mockChecklist,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('columns are correctly rendered', () => {
      expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Title' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Checklist Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Department' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Username' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Last Modified Date' }),
      ).toBeTruthy()
    })
    test('number of data rows is rendered correctly', () => {
      expect(screen.getAllByTestId('checkListItemRow')).toHaveLength(
        mockChecklist.list.length,
      )
    })
    test('data is correctly rendered in each row', () => {
      const indexVal = 1
      const checkListRow = mockChecklist.list[indexVal]
      expect(
        screen.getByTestId(`checkListTitle-${indexVal}`),
      ).toHaveTextContent(checkListRow.title)
      expect(
        screen.getByTestId(`checkListPageName-${indexVal}`),
      ).toHaveTextContent(checkListRow.pageName)
      expect(
        screen.getByTestId(`checkListDeptName-${indexVal}`),
      ).toHaveTextContent(checkListRow.departmentName)
      expect(
        screen.getByTestId(`checkListUserName-${indexVal}`),
      ).toHaveTextContent(checkListRow.userName)
      expect(
        screen.getByTestId(`checkListModDate-${indexVal}`),
      ).toHaveTextContent(getDateTimeFromTimestamp(checkListRow.updatedDate))
    })
    test('total records displayed', () => {
      expect(
        screen.getByText(`Total Records: ${mockChecklist.size}`),
      ).toBeVisible()
    })
    test('page select functionality', () => {
      act(() => {
        userEvent.selectOptions(screen.getByTestId('paginationTestID'), '40')
      })
    })
    test('title click functionality', () => {
      act(() => {
        userEvent.click(screen.getByTestId('checkListTitle-0'))
      })
    })
  })
})
