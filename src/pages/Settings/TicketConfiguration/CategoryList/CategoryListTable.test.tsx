import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import CategoryListTable from './CategoryListTable'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockCategoryList,
  mockDepartments,
} from '../../../../test/data/ticketConfigurationData'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <CategoryListTable />
  </div>
)

describe('CategoryList Table', () => {
  describe('CategoryList Table Component Testing', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          ticketConfiguration: {
            isLoading: ApiLoadingState.succeeded,
            category: mockCategoryList,
            departments: mockDepartments,
            isLoadingFilterOptions: ApiLoadingState.succeeded,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })

    test('should render the "Category List" table ', () => {
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
        screen.getByRole('columnheader', { name: 'Meal Type' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    })
    test('should render correct number of page records', () => {
      expect(screen.queryAllByRole('row')).toHaveLength(21)
    })
    test('should render edit button in the Actions', () => {
      expect(screen.getByTestId('cl-edit-btn0')).toHaveClass(
        'btn btn-info btn-ovh btn-ovh-employee-list me-1',
      )
    })
    test('should render delete button in the Actions', () => {
      expect(screen.getByTestId('cl-delete-btn0')).toHaveClass(
        'btn btn-danger btn-ovh me-1 btn-ovh-employee-list',
      )
    })
    it('should render Delete modal popup on clicking delete button from Actions', async () => {
      const deleteButtonEl = screen.getByTestId('cl-delete-btn1')
      userEvent.click(deleteButtonEl)
      await waitFor(() => {
        expect(screen.getByText('Delete Category')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
      })
    })
    it('should close modal popup after clicking Yes option from the modal', () => {
      const deleteButtonElement = screen.getByTestId('cl-delete-btn2')
      userEvent.click(deleteButtonElement)
      const yesButtonEle = screen.getByRole('button', { name: 'Yes' })
      userEvent.click(yesButtonEle)
    })
    test('should render correct number of 40 page records', () => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(true)

      // 41 including the heading
      expect(screen.getAllByRole('row')).toHaveLength(33)
    })
    test('should disable first and prev in pagination if it is in first page', () => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('‹ Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next ›')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
    test('should disable last and next in pagination if it is last page', () => {
      userEvent.click(screen.getByText('Next ›', { exact: true }))
      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('‹ Prev')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Next ›')).toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).toHaveAttribute('disabled')
    })
  })
})
