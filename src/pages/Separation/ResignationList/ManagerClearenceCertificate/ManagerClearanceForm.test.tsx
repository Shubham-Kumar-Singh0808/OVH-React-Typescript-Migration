import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ManagerClearanceForm from './ManagerClearanceForm'
import { fireEvent, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockResignationListHistory } from '../../../../test/data/resignationListData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ManagerClearanceForm />,
  </div>
)

describe('ManagerClearanceForm Component Testing', () => {
  describe('should render ManagerClearanceForm Component without data', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          resignationList: {
            separationTimeLine: mockResignationListHistory,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    screen.debug()
    test('should render with data ', () => {
      expect(
        screen.getByText(mockResignationListHistory.employeeId),
      ).toBeInTheDocument()
      expect(
        screen.getByText(mockResignationListHistory.employeeName),
      ).toBeInTheDocument()
    })
    test('user should enter the comments data ', () => {
      const subject = screen.getByTestId('text-area')
      userEvent.type(subject, 'testing')
      expect(subject).toHaveValue('testing')

      const selectDue = screen.getAllByTestId('due-test')
      fireEvent.click(selectDue[0], 'true')
      expect(selectDue).toBeTruthy()

      const submitBtnElement = screen.getByRole('button', { name: 'Submit' })
      expect(submitBtnElement).toBeEnabled()
      userEvent.click(submitBtnElement)
      userEvent.click(screen.getByTestId('clearBtn'))
      userEvent.type(subject, '')
    })
    test('Radio button should be  "true" or "false"', () => {
      const activeState = screen.getByRole('radio', {
        name: 'Yes',
      }) as HTMLInputElement

      const inactiveState = screen.getByRole('radio', {
        name: 'No',
      }) as HTMLInputElement

      expect(inactiveState.checked).toEqual(true)
      expect(activeState.checked).toEqual(false)

      fireEvent.click(inactiveState)

      expect(activeState.checked).toEqual(false)
    })
  })
})
