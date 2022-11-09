import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import SubCategoryListTable from './SubCategoryListTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import {
  mockDepartments,
  mockTicketConfigurationCategory,
  mockTicketConfigurationSubCategoryList,
} from '../../../test/data/ticketConfigurationData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <SubCategoryListTable
      paginationRange={[1, 2, 3]}
      currentPage={1}
      setCurrentPage={mockSetCurrentPage}
      pageSize={20}
      setPageSize={mockSetPageSize}
      filterByDepartment={1}
      filterByCategory={5}
      filterBySubCategory={111}
    />
  </div>
)

describe('SubCategoryList Table', () => {
  describe('SubCategoryList Table Component Testing', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          ticketConfiguration: {
            isLoading: ApiLoadingState.succeeded,
            subCategoryList: mockTicketConfigurationSubCategoryList,
            departments: mockDepartments,
            categories: mockTicketConfigurationCategory,
            subCategories: mockTicketConfigurationCategory,
            listSize: 11,
            isLoadingFilterOptions: ApiLoadingState.idle,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })

    test('should render the "SubCategory List" table ', () => {
      const table = screen.getByRole('table')
      expect(table).toBeTruthy()
    })
    test('should render the correct headers', () => {
      expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Department Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Category Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Sub-Category Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Estimated Time(hh.mm)' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Work Flow' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Level of Hierarchy' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    })
    test('should render correct number of page records', () => {
      expect(screen.queryAllByRole('row')).toHaveLength(12)
    })

    test('should render timeline button in the Actions', () => {
      expect(screen.getByTestId('th-timeline-btn0')).toHaveClass(
        'btn btn-info btn-ovh btn-ovh-employee-list me-1',
      )
    })
    test('should render edit button in the Actions', () => {
      expect(screen.getByTestId('th-edit-btn0')).toHaveClass(
        'btn btn-danger btn-sm',
      )
    })
    test('should render delete button in the Actions', () => {
      expect(screen.getByTestId('th-delete-btn0')).toHaveClass(
        'btn btn-danger btn-sm',
      )
    })

    // test('should render ticket history timeline upon button click', () => {
    //   const editButtonEl = screen.getByTestId('holiday-edit-btn1')
    //   userEvent.click(editButtonEl)
    //   expect(history.location.pathname).toBe('/editHoliday/148')
    // })

    it('should render Delete modal popup on clicking delete button from Actions', async () => {
      const deleteButtonEl = screen.getByTestId('th-delete-btn0')
      userEvent.click(deleteButtonEl)
      await waitFor(() => {
        expect(screen.getByText('Delete Sub-Category')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
      })
    })
    it('should close modal popup after clicking Yes option from the modal', () => {
      const deleteButtonElement = screen.getByTestId('th-delete-btn2')
      userEvent.click(deleteButtonElement)
      const yesButtonEle = screen.getByRole('button', { name: 'Yes' })
      userEvent.click(yesButtonEle)
    })
    // test('should render correct number of  page records', () => {
    //   userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
    //   const pageSizeSelect = screen.getByRole('option', {
    //     name: '40',
    //   }) as HTMLOptionElement
    //   expect(pageSizeSelect.selected).toBe(true)

    //   // 41 including the heading
    //   expect(screen.getAllByRole('row')).toHaveLength(41)
    // })
  })
})
