import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import Schedule from './Schedule'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import { mockEmployeeProperties } from '../../../../test/data/IntervieDeatilsData'

const result = new Date().toLocaleTimeString([], {
  hour: 'numeric',
  minute: '2-digit',
})

const startHour = result?.split(':')[0]
const startMinutesDay = result?.split(':')[1]?.split(' ')[0]
describe('Schedule component with data', () => {
  beforeEach(() => {
    render(<Schedule />, {
      preloadedState: {
        intervieweeDetails: {
          employeeProperties: mockEmployeeProperties,
        },
      },
    })
  })
  test('should able to select values for options for respective select element', async () => {
    expect(screen.getByText('Schedule Interview')).toBeInTheDocument()
    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])
    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '29 Oct, 2019' },
      }),
    )
    expect(datePickers[0]).toHaveValue('10/29/2019')

    // const startTimeHours = screen.getByTestId('hours')
    // userEvent.type(startTimeHours, startHour)
    // expect(startTimeHours).toHaveValue(startHour)

    // const startTimeMinutes = screen.getByTestId('minutes')
    // userEvent.type(startTimeMinutes, startMinutesDay)
    // expect(startTimeMinutes).toHaveValue(startMinutesDay)

    const startTimeMeridian = screen.getByTestId('startTimeMeridian')
    userEvent.selectOptions(startTimeMeridian, ['AM'])
    expect(startTimeMeridian).toHaveValue('AM')

    const selectMode = screen.getByTestId('select-mode')
    userEvent.selectOptions(selectMode, ['FACE_TO_FACE'])
    expect(selectMode).toHaveValue('FACE_TO_FACE')

    const comments = screen.getByTestId('text-area')
    userEvent.type(comments, 'testing')
    expect(comments).toHaveValue('testing')

    const sendtoCandidate = screen.getByTestId(
      'send-to-Candidate',
    ) as HTMLInputElement
    const sendtointerviewer = screen.getByTestId(
      'send-to-interviewer',
    ) as HTMLInputElement

    const sendMessageToCandidate = screen.getByTestId(
      'sendMessageToCandidate',
    ) as HTMLInputElement
    const sendMessageToInterviewer = screen.getByTestId(
      'sendMessageToInterviewer',
    ) as HTMLInputElement

    expect(sendtoCandidate.checked).toBe(false)
    expect(sendtointerviewer.checked).toBe(false)

    expect(sendMessageToCandidate.checked).toBe(false)
    expect(sendMessageToInterviewer.checked).toBe(false)

    const employeeNameInput = screen.getByPlaceholderText(
      'Type name here for auto fill',
    )
    userEvent.type(employeeNameInput, 'Chaitanya Mudunuri')

    const createBtnElement = screen.getByRole('button', { name: 'Save' })
    expect(createBtnElement).toBeDisabled()
    userEvent.click(createBtnElement)
    userEvent.click(screen.getByTestId('clear-btn'))

    expect(datePickers[0]).toHaveValue('')
    userEvent.selectOptions(selectMode, [''])
    userEvent.type(comments, '')
    userEvent.type(employeeNameInput, '')
  })
})
