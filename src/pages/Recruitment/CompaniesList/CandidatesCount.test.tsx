import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CandidatesCount from './CandidatesCount'
import { render, screen } from '../../../test/testUtils'

const mockSetTogglePage = jest.fn()

describe('Candidates List without data', () => {
  beforeEach(() => {
    render(<CandidatesCount />)
  })
  test('should be able to render Candidates List Title', () => {
    expect(screen.getByText('Candidates List')).toBeInTheDocument()
  })
  test('should render  component with out crashing', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
  })
})
