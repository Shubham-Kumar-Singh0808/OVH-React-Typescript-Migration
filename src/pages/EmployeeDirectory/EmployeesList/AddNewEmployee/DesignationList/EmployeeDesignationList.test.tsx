import '@testing-library/jest-dom'
import React from 'react'
import EmployeeDesignationList from './EmployeeDesignationList'
import { render, screen } from '../../../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeDesignationList setToggleDesignation={jest.fn()} />
  </div>
)
describe('DesignationList Component Testing', () => {
  render(toRender)
  test('should render the "Designation List" header', () => {
    const pageTitle = screen.getByRole('heading', { name: 'Designation List' })
    expect(pageTitle).toBeTruthy()
  })
})
