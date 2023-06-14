import '@testing-library/jest-dom'
import React from 'react'
import UpComingJoinList from './UpComingJoinList'
import { render, screen } from '../../../test/testUtils'

describe('UpComing Join List Component Testing', () => {
  test('should render UpComing Join List component without crashing', () => {
    render(<UpComingJoinList />)

    // Update the upComingJoinee list based on the expected element or text in the component
    expect(screen.getByText('Upcoming Joinees')).toBeInTheDocument()
  })
})
