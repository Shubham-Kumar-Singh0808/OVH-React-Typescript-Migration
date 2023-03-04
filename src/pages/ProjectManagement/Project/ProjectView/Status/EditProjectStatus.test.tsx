import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EditProjectStatus from './EditProjectStatus'
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../../test/testUtils'
import { mockProjectStatusList } from '../../../../../test/data/projectStatusTabData'

const mockSetToggle = jest.fn()

describe('AddProjectStatus Component Testing with data', () => {
  beforeEach(() => {
    render(
      <EditProjectStatus
        setToggle={jest.fn()}
        editCurrentWeekDate={undefined}
        editNextWeekDate={undefined}
        editCurrentWeekStatus={undefined}
        editNextWeekStatus={undefined}
        setEditCurrentWeekDate={jest.fn()}
        setEditNextWeekDate={jest.fn()}
        setEditNextWeekStatus={jest.fn()}
        setEditCurrentWeekStatus={jest.fn()}
        statusId={undefined}
      />,
      {
        preloadedState: {
          projectStatus: {
            statusReportList: mockProjectStatusList,
          },
        },
      },
    )
  })
  screen.debug()
  test('should able to select values for options for respective select element', async () => {
    const backButtonElement = screen.getByTestId('back-btn')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)

    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '29 Oct, 2019' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '10 Jan, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('')
    expect(datePickers[1]).toHaveValue('')

    const Comments = screen.findByTestId('ckEditor-component')
    expect(Comments).toBeTruthy()

    const createBtnElement = screen.getByRole('button', { name: 'Update' })
    userEvent.click(createBtnElement)
  })
})
