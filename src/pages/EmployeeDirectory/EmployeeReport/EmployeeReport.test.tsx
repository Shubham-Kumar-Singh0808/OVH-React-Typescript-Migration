import '@testing-library/jest-dom'

import React from 'react'
import { render, screen } from '../../../test/testUtils'
import EmployeeReport from './EmployeeReport'

describe('Employee Report Component Testing', () => {
  test('should render Employee Report component without crashing', async () => {
    render(<EmployeeReport />)

    expect(screen.getByText('Employee Report')).toBeInTheDocument()
  })
})
