import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import UpdateTicketEditFields from './UpdateTicketEditFields'
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../test/testUtils'
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
  test('should able to select values for options for respective select element', async () => {
    const ticketStatus = screen.getByTestId('statusSelect')
    userEvent.selectOptions(ticketStatus, ['Fixed'])
    expect(ticketStatus).toHaveValue('Fixed')

    const priorityElement = screen.getByTestId('prioritySelect')
    userEvent.selectOptions(priorityElement, ['Normal'])
    expect(priorityElement).toHaveValue('Normal')

    const percentageDone = screen.getByTestId('percentageDone')
    userEvent.selectOptions(percentageDone, ['10'])
    expect(percentageDone).toHaveValue('10')

    const startTimeHours = screen.getByTestId('sh-startTimeHour')
    userEvent.type(startTimeHours, '6')
    expect(startTimeHours).toHaveValue('6')

    const startTimeMin = screen.getByTestId('sh-startTimeMinutes')
    userEvent.type(startTimeHours, '2')
    expect(startTimeMin).toBeInTheDocument()

    const datePickerElements = screen.getAllByPlaceholderText('dd/mm/yy')
    fireEvent.click(datePickerElements[0])

    await waitFor(() =>
      fireEvent.change(datePickerElements[0], {
        target: { value: '29 Oct, 2019' },
      }),
    )
    fireEvent.click(datePickerElements[1])
    await waitFor(() =>
      fireEvent.change(datePickerElements[1], {
        target: { value: '10 Jan, 2022' },
      }),
    )
    expect(datePickerElements[0]).toHaveValue('10/29/2019')
    expect(datePickerElements[1]).toHaveValue('01/10/2022')
    act(() => {
      const file = new File(['hello'], 'hello.png', { type: 'image/png' })
      const fileInput = screen.getByTestId('fileUpload')
      userEvent.upload(fileInput, file)

      const updateBtnElement = screen.getByRole('button', { name: 'Update' })

      userEvent.click(updateBtnElement)
    })
    expect(priorityElement).toHaveValue('Normal')
    await waitFor(() => {
      expect(mockSetReRender).toHaveBeenCalledTimes(1)
    })
  })

  test('Should be able to function autocomplete', () => {
    const autocomplete = screen.getByPlaceholderText('Employee Name')
    autocomplete.click()
    autocomplete.focus()

    fireEvent.change(autocomplete, { target: { value: 'e' } })
    const dropdownOptions = screen.getAllByTestId('autoComplete-options')
    fireEvent.click(dropdownOptions[0])

    expect(autocomplete).toHaveValue('Veera Kunagu')
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

  test('Should be able to approve the ticket', async () => {
    const approveBtnElement = screen.getByRole('button', { name: 'Approve' })
    expect(approveBtnElement).toBeEnabled()
    expect(approveBtnElement).toBeInTheDocument()
    userEvent.click(approveBtnElement)
    await waitFor(() => {
      const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
      expect(modalConfirmBtn).toBeInTheDocument()
    })
  })

  // test('Should be able to render ckEditor', async () => {
  //   const ckEditorElement = screen.getByTestId('ckEditor')
  //   expect(ckEditorElement).toBeInTheDocument()
  //   await waitFor(() => {
  //     expect(ckEditorElement).toBeInTheDocument()
  //   })
  // })
})
