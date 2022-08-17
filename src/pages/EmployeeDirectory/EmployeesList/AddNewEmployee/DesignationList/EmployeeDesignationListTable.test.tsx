import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeDesignationListTable from './EmployeeDesignationListTable'
import { render, screen, waitFor } from '../../../../../test/testUtils'
import { mockDesignationList } from '../../../../../test/data/employeeDesignationListData'

describe('DesignationList Table Testing', () => {
  beforeEach(() => {
    render(<EmployeeDesignationListTable selectedDepartmentId={0} />)
  })
  it('should render the "Designation Table"', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  it('should show the loader when no designations is selected', () => {
    expect(screen.findByTestId('designation-list-loader')).toBeTruthy()
  })
  it('should show the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Department Name' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Designation Name' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
  })

  describe('DesignationList component with data', () => {
    beforeEach(() => {
      render(<EmployeeDesignationListTable selectedDepartmentId={6} />, {
        preloadedState: {
          employeeDesignationList: {
            employeeDesignations: mockDesignationList,
          },
        },
      })
    })
    test('should not render the loading spinner when designation is not empty', () => {
      expect(screen.findByTestId('designation-list-loader')).toMatchObject({})
    })
    test('should render delete button', () => {
      expect(screen.getByTestId('btn-delete2')).toHaveClass(
        'btn btn-danger btn-sm',
      )
    })
    test('should render correct number of page records', async () => {
      await waitFor(() => {
        //22 including the heading
        expect(screen.getAllByRole('row')).toHaveLength(22)
      })
    })
    test('should render correct number of 40 page records', () => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(true)

      // 42 including the heading
      expect(screen.getAllByRole('row')).toHaveLength(42)
    })
    test('should render first page data only', () => {
      expect(screen.getByRole('rowheader', { name: '20' })).toBeInTheDocument()
      expect(screen.queryByRole('rowheader', { name: '21' })).toBeNull()
    })
    test('should render second page data only', () => {
      userEvent.click(screen.getByText('Next >', { exact: true }))
      expect(screen.getByRole('rowheader', { name: '40' })).toBeInTheDocument()
      expect(screen.queryByRole('rowheader', { name: '41' })).toBeNull()
    })

    test('should disable first and prev in pagination if first page', () => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })

    test('should disable last and next in pagination if last page', () => {
      userEvent.click(screen.getByText('Next >', { exact: true }))

      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).toHaveAttribute('disabled')
    })
    it('should render Delete modal on clicking delete button from Actions', async () => {
      const deleteButtonElement = screen.getByTestId('btn-delete1')
      userEvent.click(deleteButtonElement)
      await waitFor(() => {
        expect(screen.getByText('Delete Designation')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
      })
    })
    it('should close the modal on clicking No button from the popup', async () => {
      const deleteButtonElement = screen.getByTestId('btn-delete6')
      userEvent.click(deleteButtonElement)
      const yesButtonElement = screen.getByRole('button', { name: 'Yes' })
      userEvent.click(yesButtonElement)
      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(22)
      })
    })
  })
})
