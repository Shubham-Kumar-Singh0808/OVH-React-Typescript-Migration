import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectMileStone from './ProjectMileStone'
import { render, screen, waitFor, fireEvent } from '../../../../test/testUtils'
import { mockProjectRequestList } from '../../../../test/data/projectCreationRequestData'

describe('ProjectMileStone Component Testing with data', () => {
  beforeEach(() => {
    render(
      <ProjectMileStone
        item={{
          id: 0,
          title: '',
          effort: '',
          fromDate: '',
          toDate: '',
          comments: '',
          billable: true,
          milestonePercentage: '',
        }}
        index={0}
        titleOnChange={jest.fn()}
        onChangeHandleFromDate={jest.fn()}
        onChangeHandleToDate={jest.fn()}
        effortOnChange={jest.fn()}
        commentsOnChange={jest.fn()}
        setIsAddMileStoneButtonEnabled={jest.fn()}
      />,
      {
        preloadedState: {
          projectCreationRequest: {
            getAllProjectRequestList: mockProjectRequestList,
          },
        },
      },
    )
  })
  screen.debug()
  test('should able to select values for options for respective select element', async () => {
    const title = screen.getByTestId('title-test')
    userEvent.type(title, 'testing')
    expect(title).toHaveValue('')

    const effort = screen.getByTestId('effort-test')
    userEvent.type(effort, 'testing')
    expect(effort).toHaveValue('')

    const datePickers = screen.getAllByPlaceholderText('dd/mm/yy')
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

    const comments = screen.getByTestId('text-area')
    userEvent.type(comments, 'test')
    expect(comments).toHaveValue('')
  })
})
