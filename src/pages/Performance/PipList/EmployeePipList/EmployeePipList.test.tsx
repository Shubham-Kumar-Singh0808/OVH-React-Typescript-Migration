import '@testing-library/jest-dom'
import React from 'react'
import EmployeePipList from './EmployeePipList'
import { render } from '../../../../test/testUtils'
import { EmployeePipStatus } from '../../../../types/Performance/PipList/pipListTypes'

const mockSetTogglePage = jest.fn()

describe('PIP List  Component Testing', () => {
  test('should render PIP List component with out crashing', () => {
    render(
      <EmployeePipList
        selectDate={''}
        setSelectDate={mockSetTogglePage}
        searchInput={''}
        setSearchInput={mockSetTogglePage}
        searchByAdded={true}
        setSearchByAdded={mockSetTogglePage}
        searchByEmployee={true}
        setSearchByEmployee={mockSetTogglePage}
        fromDate={''}
        setFromDate={mockSetTogglePage}
        toDate={''}
        setToDate={mockSetTogglePage}
        dateError={true}
        isMultiSearchBtn={true}
        currentMonth={''}
        toggle={''}
        setToggle={mockSetTogglePage}
        HierarchyUserAccess={mockSetTogglePage}
        IndividualUserAccess={mockSetTogglePage}
        paginationRange={[]}
        setPageSize={mockSetTogglePage}
        currentPage={0}
        pageSize={0}
        setCurrentPage={mockSetTogglePage}
        pipListObj={{
          startIndex: 0,
          endIndex: 0,
          selectionStatus: EmployeePipStatus.inactive,
          dateSelection: '',
          from: '',
          multiSearch: '',
          searchByAdded: false,
          searchByEmployee: false,
          to: '',
        }}
      />,
    )
  })
})
