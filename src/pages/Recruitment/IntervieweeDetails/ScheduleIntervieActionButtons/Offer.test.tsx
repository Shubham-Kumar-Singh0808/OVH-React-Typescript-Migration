import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import Offer from './Offer'
import { render, screen } from '../../../../test/testUtils'

describe('Offer component with data', () => {
  beforeEach(() => {
    render(<Offer />, {
      preloadedState: {},
    })
  })
  test('should click on No Show button ', () => {
    const offerElement = screen.getAllByTestId('offer-btn')
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
