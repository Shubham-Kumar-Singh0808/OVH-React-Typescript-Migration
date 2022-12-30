import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import QuestionCheck from './QuestionCheck'
import { cleanup, render, screen } from '../../../test/testUtils'
import { TextDanger, TextWhite } from '../../../constant/ClassName'

const mockChangeHandler = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <QuestionCheck
      question="checking question"
      isChecked={null}
      changeHandler={mockChangeHandler}
    />
  </div>
)

const stateRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <QuestionCheck
      question="checking question"
      isChecked={'Yes'}
      changeHandler={mockChangeHandler}
    />
  </div>
)

describe('Question Check', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender)
    })
    afterEach(cleanup)
    screen.debug()
    test('Question is correctly rendered', () => {
      const label = screen.getByTestId('test-question-check')
      expect(label).toHaveTextContent('checking question*')
    })
    test('Asterix is red color', () => {
      expect(screen.getByTestId('ast-question-check')).toHaveClass(TextDanger)
    })
    test('radio button testing', () => {
      const yesAnswer = screen.getByTestId('yes-radio') as HTMLInputElement
      const noAnswer = screen.getByTestId('no-radio') as HTMLInputElement

      expect(yesAnswer.checked).toBe(false)
      expect(noAnswer.checked).toBe(false)

      userEvent.click(noAnswer)
      expect(mockChangeHandler).toHaveBeenCalledTimes(1)
    })
  })

  describe('state data rendered', () => {
    beforeEach(() => {
      render(stateRender)
    })
    afterEach(cleanup)

    test('white asterix is displayed', () => {
      expect(screen.getByTestId('ast-question-check')).toHaveClass(TextWhite)
    })
    test('radio testing', () => {
      const yesAnswer = screen.getByTestId('yes-radio') as HTMLInputElement
      const noAnswer = screen.getByTestId('no-radio') as HTMLInputElement

      expect(yesAnswer.checked).toBe(true)
      expect(noAnswer.checked).toBe(false)
    })
  })
})
