import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import ScheduledInterviews from './ScheduledInterviews'
import { render, screen } from '../../../test/testUtils'
import { mockTechnologies } from '../../../test/data/employeeTechnologiesData'

describe('Scheduled Interviews Component Testing', () => {
  test('should render scheduled interviews component with out crashing', () => {
    render(<ScheduledInterviews />)
    expect(screen.getByText('Scheduled Interviews')).toBeInTheDocument()
  })
  describe('should render scheduled interviews component with data', () => {
    test('should render scheduled candidates screen upon All radio button select', () => {
      render(<ScheduledInterviews />, {
        preloadedState: {
          authentication: {
            authenticatedUser: {
              employeeName: 'venkata',
              employeeId: 1978,
              userName: 'venkata kolla',
              role: 'admin',
            },
          },
          employeeCertificates: {
            getAllTechnologies: mockTechnologies,
          },
        },
      })
      const allRadioButton = screen.getByLabelText('All') as HTMLInputElement
      userEvent.click(allRadioButton)
      expect(screen.getByText('Scheduled Candidates')).toBeInTheDocument()

      const technologySelector = screen.getByTestId('selectTechnology')
      userEvent.selectOptions(technologySelector, ['Java'])
      expect(technologySelector).toHaveValue()
    })
  })
})
