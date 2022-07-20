import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ShiftListTable from './ShiftListTable'
import { mockEmployeeShifts } from '../../../../../test/data/employeeShiftsData'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../../test/testUtils'

const mockGetToastMessage = jest.fn()
describe('Shift List Table Component Testing', () => {
  describe('Shift List Table Component Testing with data', () => {
    beforeEach(() => {
      render(
        <ShiftListTable
          employeeShifts={mockEmployeeShifts}
          actionMapping={{
            added: 'added',
            deleted: 'deleted',
            updated: 'updated',
          }}
          getToastMessage={mockGetToastMessage}
        />,
        {
          preloadedState: {
            shiftConfiguration: {
              employeeShifts: mockEmployeeShifts,
            },
          },
        },
      )
    })
    afterEach(cleanup)
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
    test('should render delete employee  shift modal on clicking delete button', async () => {
      const deleteButtonElement = screen.findByTestId(`sh-delete-btn1`)
      userEvent.click(await deleteButtonElement)
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
      })
    })
    test('should validate start time minutes', async () => {
      const editButtonElement = screen.findByTestId(`sh-edit-btn2`)
      fireEvent.click(await editButtonElement)
      await waitFor(() => {
        screen.debug()
        expect(
          screen.getByTestId(`sh-startTimeMinutes-input2`),
        ).toBeInTheDocument()
        fireEvent.change(screen.getByTestId(`sh-startTimeMinutes-input2`), {
          target: { value: '77' },
        })
        expect(screen.getByTestId('sh-startTimeMinutes-input2')).toHaveValue(
          '77',
        )
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
      const editButtonElement = screen.getByTestId(`sh-edit-btn1`)
      await fireEvent.click(editButtonElement)
      userEvent.type(screen.getByTestId(`sh-startTimeHour-input1`), '1')
      userEvent.type(screen.getByTestId(`sh-startTimeMinutes-input1`), '6')
      userEvent.type(screen.getByTestId(`sh-endTimeHour-input1`), '18')
      userEvent.type(screen.getByTestId(`sh-endTimeMinutes-input1`), '78')
      userEvent.type(screen.getByTestId(`sh-graceTime-input1`), '15')
      const saveButtonElement = screen.getByTestId(`sh-save-btn1`)
      await fireEvent.click(saveButtonElement)
      await waitFor(() => {
        expect(screen.getByTestId(`sh-endTimeMinutes-input1`)).toHaveValue('59')
      })
    })
    test('should validate input data after edit button click', async () => {
      const editButtonElement = screen.getByTestId(`sh-edit-btn2`)
      await fireEvent.click(editButtonElement)
      await waitFor(async () => {
        userEvent.type(screen.getByTestId(`sh-startTimeHour-input2`), '55')
        userEvent.type(screen.getByTestId(`sh-startTimeMinutes-input2`), '99')
        userEvent.type(screen.getByTestId(`sh-endTimeHour-input2`), '66')
        userEvent.type(screen.getByTestId(`sh-endTimeMinutes-input2`), '88')
        userEvent.type(screen.getByTestId(`sh-graceTime-input2`), '15')
        const saveButtonElement = screen.getByTestId(`sh-save-btn2`)
        await fireEvent.click(saveButtonElement)

        expect(screen.getByTestId(`sh-endTimeMinutes-input2`)).toHaveValue('00')
      })
    })
  })
})
