import '@testing-library/jest-dom'

import React from 'react'
import HiveActivityDetailsTable from './HiveActivityDetailsTable'
import { render, screen } from '../../../test/testUtils'

describe('Hive Activity Details Table Component Testing', () => {
  test('should render hive activity details table component without crashing', () => {
    render(<HiveActivityDetailsTable />)
    expect(screen.getByText('Version')).toBeInTheDocument()
  })
})
