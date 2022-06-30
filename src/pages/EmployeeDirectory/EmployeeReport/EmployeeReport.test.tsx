import '@testing-library/jest-dom'

import React from 'react'
import EmployeeReport from './EmployeeReport'
import { render, screen, waitFor } from '../../../test/testUtils'

describe('Employee Report Component Testing', () => {
  test('should render Employee Report component without crashing', async () => {
    render(<EmployeeReport />)

    await waitFor(() => {
      expect(screen.getByText('Employee Report')).toBeInTheDocument()
    })
  })
})
