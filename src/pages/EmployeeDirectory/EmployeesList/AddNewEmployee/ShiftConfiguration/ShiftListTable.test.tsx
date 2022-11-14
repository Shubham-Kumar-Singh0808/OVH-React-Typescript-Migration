import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ShiftListTable from './ShiftListTable'
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../../test/testUtils'
import { mockEmployeeShifts } from '../../../../../test/data/employeeShiftsData'
import { mockUserAccessToFeaturesData } from '../../../../../test/data/userAccessToFeaturesData'

describe('Shift List Table Component Testing', () => {
  beforeEach(() => {
    render(
      <ShiftListTable
        employeeShifts={mockEmployeeShifts}
        actionMapping={{
          added: 'added',
          deleted: 'deleted',
          updated: 'updated',
        }}
        getToastMessage={jest.fn()}
      />,
      {
        preloadedState: {
          shiftConfiguration: {
            employeeShifts: mockEmployeeShifts,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      },
    )
  })
  test('should render shift list table component', () => {
    mockEmployeeShifts.forEach((employeeShift) => {
      expect(screen.getByText(employeeShift.name)).toBeInTheDocument()
      expect(screen.getByText(employeeShift.graceTime)).toBeInTheDocument()
      expect(screen.getAllByRole('columnheader')).toHaveLength(6)
      // 6 including the heading row
      expect(screen.getAllByRole('row')).toHaveLength(
        mockEmployeeShifts.length + 1,
      )
    })
  })
  it('should render delete employee  shift modal on clicking delete button', () => {
    render(
      <ShiftListTable
        employeeShifts={mockEmployeeShifts}
        actionMapping={{
          added: 'added',
          deleted: 'deleted',
          updated: 'updated',
        }}
        getToastMessage={jest.fn()}
      />,
    )
    mockEmployeeShifts.forEach(async (_employeeShift, index) => {
      const deleteButtonElement = screen.getByTestId(`sh-delete-btn${index}`)
      userEvent.click(deleteButtonElement)
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
      })
    })
  })
  test('should delete employee shift detail upon delete modal confirm button click', () => {
    mockEmployeeShifts.forEach(async (_employeeShift, index) => {
      const deleteButtonElement = screen.getByTestId(`sh-delete-btn${index}`)
      userEvent.click(deleteButtonElement)
      const deleteModalConfirmButtonElement = screen.getByRole('button', {
        name: 'Yes',
      })
      userEvent.click(deleteModalConfirmButtonElement)
      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(
          mockEmployeeShifts.length - 1,
        )
      })
    })
  })
  test('should edit and save employee shift details upon edit and save button click respectively', async () => {
    const editButtonElement = screen.getByTestId(`sh-edit-btn${1}`)
    await fireEvent.click(editButtonElement)
    userEvent.type(screen.getByTestId(`sh-startTimeHour-input${1}`), '1')
    userEvent.type(screen.getByTestId(`sh-startTimeMinutes-input${1}`), '6')
    userEvent.type(screen.getByTestId(`sh-endTimeHour-input${1}`), '18')
    userEvent.type(screen.getByTestId(`sh-endTimeMinutes-input${1}`), '78')
    userEvent.type(screen.getByTestId(`sh-graceTime-input${1}`), '15')
    const saveButtonElement = screen.getByTestId(`sh-save-btn${1}`)
    await fireEvent.click(saveButtonElement)
    await waitFor(() => {
      expect(screen.getByTestId(`sh-endTimeMinutes-input${1}`)).toHaveValue(
        '59',
      )
    })
  })
})
