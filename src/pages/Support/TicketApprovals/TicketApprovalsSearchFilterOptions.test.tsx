import '@testing-library/jest-dom'

import React from 'react'
import TicketApprovalsSearchFilterOptions from './TicketApprovalsSearchFilterOptions'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <TicketApprovalsSearchFilterOptions
      employeeNameCheckbox={false}
      setEmployeeNameCheckbox={jest.fn()}
      assigneeNameCheckbox={false}
      setAssigneeNameCheckbox={jest.fn()}
      searchValue={''}
      setSearchValue={jest.fn()}
      searchButtonOnKeyDown={jest.fn()}
      searchBtnHandler={jest.fn()}
    />
  </div>
)

describe('Ticket Approvals Search Filter Options Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  test('should render ticket approval search filter options component with out crashing', () => {
    expect(screen.getByTestId('searchByEmployeeName')).toBeInTheDocument()
    expect(screen.getByTestId('searchByAssigneeName')).toBeInTheDocument()
    expect(screen.getByTestId('multi-search-input')).toBeInTheDocument()
    expect(screen.getByTestId('multi-search-btn')).toBeInTheDocument()
  })
})
