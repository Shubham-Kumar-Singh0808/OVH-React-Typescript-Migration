import '@testing-library/jest-dom'
import React from 'react'
import ResignationView from './ResignationView'
import { render, screen } from '../../../test/testUtils'

describe('ResignationView Component Testing', () => {
  test('should render ResignationView component with out crashing', () => {
    render(<ResignationView />)

    expect(screen.getByText('Employee View')).toBeInTheDocument()
  })
})
