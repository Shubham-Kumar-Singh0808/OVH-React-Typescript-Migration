import React from 'react'
import ChangeReportees from './ChangeReportees'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ChangeReportees />
  </div>
)

describe('List Of Holidays Component Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  screen.debug()
  test('should render HolidaysList Page without crashing', () => {
    expect(screen.getByText('Update Reporting Manger')).toBeInTheDocument()
  })
})
