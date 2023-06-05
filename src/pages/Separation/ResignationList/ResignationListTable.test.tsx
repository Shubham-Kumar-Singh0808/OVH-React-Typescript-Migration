import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import ResignationListTable from './ResignationListTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockResignationList } from '../../../test/data/resignationListData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
const history = createMemoryHistory()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <ResignationListTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
      />
    </Router>
    ,
  </div>
)

describe('Resignation List Table Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        resignationList: {
          resignationList: mockResignationList,
        },
      },
    })
  })

  afterEach(cleanup)

  test('should render number of records', () => {
    expect(
      screen.getByText('Total Records: ' + mockResignationList?.size),
    ).toBeInTheDocument()
  })
  test('should render employee Reportees table component with data without crashing', async () => {
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(false)
      expect(screen.getAllByRole('row')).toHaveLength(2)
    })
  })
})
