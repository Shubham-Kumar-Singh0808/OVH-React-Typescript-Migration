import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import RejectInterview from './RejectInterview'
import { render, screen } from '../../../../test/testUtils'

describe('Reject interview component with data', () => {
  beforeEach(() => {
    render(<RejectInterview />, {
      preloadedState: {},
    })
  })
  test('should click on reject button ', () => {
    const offerElement = screen.getAllByTestId('reject-btn')
    expect(offerElement[0]).toBeInTheDocument()
    userEvent.click(offerElement[0])

    const comments = screen.getByTestId('text-area')
    userEvent.type(comments, 'testing')
    expect(comments).toHaveValue('testing')

    const confirmDBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(confirmDBtn)
    expect(confirmDBtn)
  })
})
