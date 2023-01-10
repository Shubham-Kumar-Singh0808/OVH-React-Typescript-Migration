import '@testing-library/jest-dom'
import React from 'react'
import EmployeeReviewList from './EmployeeReviewList'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeReviewList />
  </div>
)

describe('Investment CheckList Component Testing', () => {
  test('should render Investment CheckList component without crashing', () => {
    render(toRender, {
      preloadedState: {},
    })
    expect(screen.getByText('Review List')).toBeInTheDocument()
  })
})
