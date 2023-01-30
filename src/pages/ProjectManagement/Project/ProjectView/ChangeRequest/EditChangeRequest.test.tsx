import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EditChangeRequest from './EditChangeRequest'
import { mockChangeRequest } from '../../../../../test/data/projectChangeRequestData'
import { render, screen } from '../../../../../test/testUtils'

const mockSetToggle = jest.fn()

describe('AddChangeRequest Component Testing with data', () => {
  beforeEach(() => {
    render(
      <EditChangeRequest
        setToggle={jest.fn()}
        editChangeRequest={{
          id: 0,
          name: '',
          descripition: undefined,
          duration: '',
          projectId: 0,
          numbersStatus: false,
        }}
        setEditChangeRequest={jest.fn()}
        editDescription={undefined}
        setEditDescription={jest.fn()}
      />,
      {
        preloadedState: {
          projectChangeRequest: {
            changeRequestList: mockChangeRequest,
          },
        },
      },
    )
  })
  screen.debug()
  test('should able to select values for options for respective select element', () => {
    const backButtonElement = screen.getByTestId('back-btn')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)

    const requestName = screen.getByTestId('request-name')
    userEvent.type(requestName, 'testing')
    expect(requestName).toHaveValue('')

    const requestDuration = screen.getByTestId('duration-testing')
    userEvent.type(requestDuration, '20')
    expect(requestDuration).toHaveValue('')

    const description = screen.getByTestId('text-area')
    userEvent.type(description, 'test')
    expect(description).toHaveValue('test')

    const updateBtnElement = screen.getByRole('button', { name: 'Update' })
    userEvent.click(updateBtnElement)
  })
})
