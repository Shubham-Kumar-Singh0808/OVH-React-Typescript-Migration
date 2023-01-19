import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeePipList from './EmployeePipList'
import { render, screen } from '../../../../test/testUtils'

describe('PIP List  Component Testing', () => {
  test('should render PIP List component with out crashing', () => {
    render(<EmployeePipList />)

    expect(screen.getByText('PIP List')).toBeInTheDocument()
  })
  test('should render search input field', () => {
    const searchComponent = screen.getByTestId('searchField')
    expect(searchComponent).toBeTruthy()
    const searchInput = screen.findByTestId('searchInput')
    expect(searchInput).toBeTruthy()
  })
  test('multi search button ', () => {
    const searchInput = screen.getByPlaceholderText('Employee Search')
    expect(screen.getByTestId('search-btn1')).toBeEnabled()
    expect(searchInput).toBeInTheDocument()
    userEvent.type(searchInput, 'test')
    expect(searchInput).toHaveValue('test')
    const searchBtn = screen.getByTestId('search-btn1')
    userEvent.click(searchBtn)
    expect(searchBtn).toBeInTheDocument()
  })
})
