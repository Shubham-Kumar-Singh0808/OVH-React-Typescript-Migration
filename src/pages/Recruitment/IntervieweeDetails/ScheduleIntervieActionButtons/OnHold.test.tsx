import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import OnHold from './OnHold'
import { render, screen } from '../../../../test/testUtils'

describe('on Hold component with data', () => {
  beforeEach(() => {
    render(<OnHold />, {
      preloadedState: {},
    })
  })
  test('should click on No Show button ', () => {
    const noShowElement = screen.getAllByTestId('onHold-btn')
    expect(noShowElement[0]).toBeInTheDocument()
    userEvent.click(noShowElement[0])

    const comments = screen.getByTestId('text-area')
    userEvent.type(comments, 'testing')
    expect(comments).toHaveValue('testing')

    const confirmDBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(confirmDBtn)
    expect(confirmDBtn)
  })
})
