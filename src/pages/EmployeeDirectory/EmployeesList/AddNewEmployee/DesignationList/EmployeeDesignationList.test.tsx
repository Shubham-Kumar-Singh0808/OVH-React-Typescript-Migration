import '@testing-library/jest-dom'
import React from 'react'
import EmployeeDesignationList from './EmployeeDesignationList'
import { render, screen } from '../../../../../test/testUtils'

describe('DesignationList Component Testing', () => {
  render(<EmployeeDesignationList setToggleDesignation={jest.fn()} />)
  test('should render the "Designation List" header', () => {
    const pageTitle = screen.getByRole('heading', { name: 'Designation List' })
    expect(pageTitle).toBeTruthy()
  })
})
