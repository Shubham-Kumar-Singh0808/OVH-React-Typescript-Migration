import '@testing-library/jest-dom'
import React from 'react'
import EmployeeAssets from './EmployeeAssets'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeAssets />
  </div>
)

describe('Employee Assets Component Testing', () => {
  render(toRender, {
    preloadedState: {},
  })
  test('should render Employee Assets with out crashing', () => {
    expect(screen.getByText('My Assets')).toBeInTheDocument()
  })
})
