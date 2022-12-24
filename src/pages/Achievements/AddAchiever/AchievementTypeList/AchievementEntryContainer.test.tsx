import '@testing-library/jest-dom'
import React from 'react'
import AchievementEntryContainer from './AchievementEntryContainer'
import { render, screen, cleanup } from '../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AchievementEntryContainer customClass={undefined}>
      <div data-testid="ach-cont-check"></div>
    </AchievementEntryContainer>
  </div>
)

describe('Achievement Entry Container', () => {
  describe('render', () => {
    beforeEach(() => {
      render(toRender)
    })
    afterEach(cleanup)
    test('states passed', () => {
      expect(screen.getByTestId('ach-cont-check')).toBeInTheDocument()
    })
  })
})
