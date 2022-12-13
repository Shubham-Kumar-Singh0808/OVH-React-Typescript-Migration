import '@testing-library/jest-dom'
import React from 'react'
import ExitFeedBackForm from './ExitFeedBackForm'
import { render, screen } from '../../../../../test/testUtils'

describe('Exit FeedBack form Component Testing', () => {
  test('should render Exit FeedBack form component with out crashing', () => {
    render(<ExitFeedBackForm />)

    expect(screen.getByText('Exit FeedBack Form')).toBeInTheDocument()
  })
})
