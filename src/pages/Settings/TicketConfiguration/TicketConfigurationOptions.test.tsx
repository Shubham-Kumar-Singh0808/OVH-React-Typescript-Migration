import '@testing-library/jest-dom'
import React from 'react'
import TicketConfigurationOptions from './TicketConfigurationOptions'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <TicketConfigurationOptions
      setFilterByDepartment={jest.fn()}
      setFilterByCategory={jest.fn()}
      setFilterBySubCategory={jest.fn()}
    />
  </div>
)
describe('Ticket Configurations Filter Options Component Testing', () => {
  beforeEach(() => {
    render(toRender)
  })
  test('should render Departments filter', () => {
    const departments = screen.findByTestId('dept-name')
    expect(departments).toBeTruthy()
  })
  test('should render Categories filter', () => {
    const categoryName = screen.findByTestId('category-name')
    expect(categoryName).toBeTruthy()
  })
  test('should render sub-category name select filter', () => {
    const subCategoryNameSelect = screen.findByTestId('sub-category-name')
    expect(subCategoryNameSelect).toBeTruthy()
  })
})
