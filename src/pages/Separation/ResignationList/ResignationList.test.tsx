import '@testing-library/jest-dom'
import React from 'react'
import ResignationList from './ResignationList'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ResignationList />
  </div>
)

describe('Resignation List Component Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  test('should render Resignation List component with out crashing', () => {
    expect(screen.getByText('Resignation List')).toBeInTheDocument()
  })
})
