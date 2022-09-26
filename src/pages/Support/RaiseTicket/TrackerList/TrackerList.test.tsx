import '@testing-library/jest-dom'
import React from 'react'
import TrackerList from './TrackerList'
import { render, screen } from '../../../../test/testUtils'

const setToggle = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <TrackerList setToggle={setToggle} />
  </div>
)

describe('Tracker List Component Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  test('should render Tracker List component with out crashing', () => {
    expect(screen.getByText('Tracker List')).toBeInTheDocument()
  })
})
