import '@testing-library/jest-dom'

import React from 'react'
import EmployeeLeaves from './EmployeeLeaves'
import { render, screen } from '../../../test/testUtils'

describe('Employee Leaves Component Testing', () => {
  test('should render employee leaves component without crashing', () => {
    render(<EmployeeLeaves isViewBtnClick={true} />)
  })
  //   expect(screen.findByText('Employee Leaves')).toBeInTheDocument()
  expect(screen.getAllByRole('columnheader')).toHaveLength(6)
})
