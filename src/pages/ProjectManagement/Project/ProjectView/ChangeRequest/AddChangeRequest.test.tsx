import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddChangeRequest from './AddChangeRequest'
import { mockChangeRequest } from '../../../../../test/data/projectChangeRequestData'
import { render, screen } from '../../../../../test/testUtils'

const mockSetToggle = jest.fn()

describe('AddChangeRequest Component Testing with data', () => {
  beforeEach(() => {
    render(<AddChangeRequest setToggle={jest.fn()} />, {
      preloadedState: {
        projectChangeRequest: {
          changeRequestList: mockChangeRequest,
        },
      },
    })
  })
  screen.debug()
  test('should able to select values for options for respective select element', () => {
    const backButtonElement = screen.getByTestId('back-btn')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)

    const requestName = screen.getByTestId('request-name')
    userEvent.type(requestName, 'testing')
    expect(requestName).toHaveValue('testing')

    const requestDuration = screen.getByTestId('duration-testing')
    userEvent.type(requestDuration, '20')
    expect(requestDuration).toHaveValue('20')

    const description = screen.getByTestId('text-area')
    userEvent.type(description, 'test')
    expect(description).toHaveValue('test')

    const createBtnElement = screen.getByRole('button', { name: 'Add' })
    userEvent.click(createBtnElement)
    userEvent.click(screen.getByTestId('clear-btn'))
    userEvent.type(description, '')
    userEvent.type(requestDuration, '')
    userEvent.type(requestName, '')
  })
})
