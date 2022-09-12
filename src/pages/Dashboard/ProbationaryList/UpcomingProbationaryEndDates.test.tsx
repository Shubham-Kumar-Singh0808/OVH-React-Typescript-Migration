import '@testing-library/jest-dom'
import React from 'react'
import UpcomingProbationaryEndDates from './UpcomingProbationaryEndDates'
import { render, screen } from '../../../test/testUtils'
import { mockUpcomingProvisionList } from '../../../test/data/upcomingProbationaryListData'

describe('UpcomingBirthdays Component Testing', () => {
  render(<UpcomingProbationaryEndDates />, {
    preloadedState: {
      probationPeriod: {
        upcomingProbationList: mockUpcomingProvisionList,
      },
    },
  })

  test('should render Upcoming Probation Period Employees without crashing', () => {
    expect(screen.getByText('Jyothika Goru')).toBeInTheDocument()
    expect(screen.getByText('Sandeep Guzzarlamudi')).toBeInTheDocument()
    expect(screen.getByText('Haider Khan')).toBeInTheDocument()
  })
})
