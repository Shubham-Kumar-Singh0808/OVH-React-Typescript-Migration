import '@testing-library/jest-dom'
import React from 'react'
import EmployeePIPClearenceCertificate from './EmployeePIPClearenceCertificate'
import { render, screen } from '../../../../test/testUtils'

describe('Exit FeedBack form Component Testing', () => {
  test('should render Exit FeedBack form component with out crashing', () => {
    render(<EmployeePIPClearenceCertificate />)

    expect(screen.getByText('Exit FeedBack Form')).toBeInTheDocument()
  })
})
