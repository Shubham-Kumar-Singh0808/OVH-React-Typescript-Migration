import '@testing-library/jest-dom'

import React from 'react'
import EmployeeReport from './EmployeeReport'
import { render, screen } from '../../../test/testUtils'

describe('Employee Report Component Testing', () => {
  // eslint-disable-next-line require-await
  test('should render Employee Report component without crashing', async () => {
    render(<EmployeeReport />)

    expect(screen.getByText('Employee Report')).toBeInTheDocument()
  })
})
