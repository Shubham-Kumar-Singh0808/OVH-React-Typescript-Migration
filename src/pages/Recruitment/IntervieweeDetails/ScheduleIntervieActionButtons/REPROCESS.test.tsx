import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import REPROCESS from './REPROCESS'
import { render, screen } from '../../../../test/testUtils'

describe('REPROCESS component with data', () => {
  beforeEach(() => {
    render(<REPROCESS />, {
      preloadedState: {},
    })
  })
  test('should click on REPROCESS button ', () => {
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
