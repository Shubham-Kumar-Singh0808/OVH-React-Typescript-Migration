import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import UpdateTicketEditFields from './EditTicketFields'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockActiveEmployees,
  mockTicketDetailsToEdit,
} from '../../../../test/data/updateTicketData'

const mockSetReRender = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <UpdateTicketEditFields setReRender={mockSetReRender} reRender={false} />
  </div>
)
describe('Update Ticket Edit Fields Component Testing', () => {
  beforeEach(() => {
    render(toRender)
  })
  test('should render tracker field', () => {
    const ticketStatus = screen.findByTestId('trackerNameSelect')
    expect(ticketStatus).toBeTruthy()
  })
  test('should render category field', () => {
    const approvalStatus = screen.findByTestId('categorySelect')
    expect(approvalStatus).toBeTruthy()
  })
  test('should render sub-category field', () => {
    const categoryNameSelect = screen.findByTestId('sub-category')
    expect(categoryNameSelect).toBeTruthy()
  })
})
describe('Update Ticket Edit Fields Component Testing with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        updateTicket: {
          isLoading: ApiLoadingState.succeeded,
          ticketDetailsToEdit: mockTicketDetailsToEdit,
          activeEmployees: mockActiveEmployees,
        },
      },
    })
  })
  screen.debug()
  test('should able to select values for options for respective select element', () => {
    const subject = screen.getByTestId('subject')
    userEvent.type(subject, 'testing')
    expect(subject).toHaveValue('tytytesting')

    const ticketStatus = screen.getByTestId('statusSelect')
    userEvent.selectOptions(ticketStatus, ['Fixed'])
    expect(ticketStatus).toHaveValue('Fixed')

    const priorityElement = screen.getByTestId('prioritySelect')
    userEvent.selectOptions(priorityElement, ['Normal'])
    expect(priorityElement).toHaveValue('Normal')

    const updateBtnElement = screen.getByRole('button', { name: 'Update' })
    userEvent.click(updateBtnElement)
    expect(priorityElement).toHaveValue('Normal')
  })

  test('Should be able to upload file', () => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' })
    const fileInput = screen.getByTestId('fileUpload')
    userEvent.upload(fileInput, file)
    expect(fileInput.files[0]).toStrictEqual(file)
    expect(fileInput.files.item(0)).toStrictEqual(file)
    expect(fileInput.files).toHaveLength(1)
    expect(fileInput).toBeInTheDocument()
  })
  test('should upload file image', async () => {
    const fileToUpload = new File(['(⌐□_□)'], 'testFile.png', {
      type: 'image/png',
    })
    const uploader = screen.getByTestId('fileUpload') as HTMLInputElement

    await waitFor(() => {
      userEvent.upload(uploader, fileToUpload)
    })

    expect(uploader).toBeTruthy()
  })
})
