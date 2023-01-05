import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CheckList from './CheckList'
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '../../../../../test/testUtils'
import { mockProjectRequestList } from '../../../../../test/data/projectCreationRequestData'

const mockChangeHandler = jest.fn()
describe('CheckList Component Testing with data', () => {
  beforeEach(() => {
    render(
      <CheckList
        onChangeRadio={mockChangeHandler}
        commentsOnChange={jest.fn()}
        item={{
          answer: '',
          answer1: undefined,
          answer2: undefined,
          answer3: undefined,
          checklistId: 0,
          comments: '',
          id: null,
          name: '',
        }}
        index={0}
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
  test('should able to select values for options for respective select element', () => {
    const comments = screen.getByTestId('text-area')
    userEvent.type(comments, 'test')
    expect(comments).toHaveValue('')
  })
  test('radio button testing', () => {
    const yesAnswer = screen.getByTestId('yes-radio') as HTMLInputElement
    const noAnswer = screen.getByTestId('no-radio') as HTMLInputElement
    const answer = screen.getByTestId('noAnswer-radio') as HTMLInputElement

    expect(yesAnswer.checked).toBe(false)
    expect(noAnswer.checked).toBe(false)
    expect(answer.checked).toBe(false)

    userEvent.click(noAnswer)
    expect(mockChangeHandler).toHaveBeenCalledTimes(1)
  })
})
