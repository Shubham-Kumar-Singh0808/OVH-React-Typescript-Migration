import '@testing-library/jest-dom'

import React from 'react'
import LeadershipDetailsItem from './LeadershipDetailsItem'
import { cleanup, render, screen } from '../../../../test/testUtils'

const toRender = (
  <LeadershipDetailsItem
    question="checking question"
    answer="checking answer"
  />
)

describe('Leadership Details Item', () => {
  describe('render', () => {
    beforeEach(() => {
      render(toRender)
    })
    afterEach(cleanup)
    screen.debug()

    test('question and answer is correctly rendered', () => {
      const questionLabel = screen.getByTestId('test-question-check')
      expect(questionLabel).toHaveTextContent('checking question')

      const answerString = screen.getByTestId('test-answer-check')
      expect(answerString).toHaveTextContent('checking answer')
    })
  })
})
