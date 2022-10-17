import '@testing-library/jest-dom'

import React from 'react'
import EmployeeReport from './EmployeeReport'
import { render, screen, waitFor } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeReport />
  </div>
)

describe('Employee Report Component Testing', () => {
  test('should render Employee Report component without crashing', async () => {
    render(toRender)

    await waitFor(() => {
      expect(screen.getByText('Employee Report')).toBeInTheDocument()
    })
  })
})
