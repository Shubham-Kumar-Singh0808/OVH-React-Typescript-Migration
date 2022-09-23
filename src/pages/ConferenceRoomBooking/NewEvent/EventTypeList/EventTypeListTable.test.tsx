import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import EventTypeListTable from './EventTypeListTable'
import { cleanup, fireEvent, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockEventTypeList } from '../../../../test/data/eventTypeListData'

const mockOnChangeInputHandler = jest.fn()
const mockSetEditEventTypeName = jest.fn()
const mockSetIsEditBtnClicked = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EventTypeListTable
      onChangeInputHandler={mockOnChangeInputHandler}
      editEventTypeName={''}
      setEditEventTypeName={mockSetEditEventTypeName}
      isEditBtnClicked={false}
      setIsEditBtnClicked={mockSetIsEditBtnClicked}
    />
  </div>
)

describe('Event Type List Table Component Testing without data', () => {
  beforeEach(() => {
    render(toRender)
  })
  afterEach(cleanup)
  test('should render the "EventType List" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'EventType' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
  })
})

describe('Event Type List Table Component Testing with data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        eventTypeList: {
          eventTypes: mockEventTypeList,
          isLoading: ApiLoadingState.succeeded,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should be able to render data in the table component', () => {
    mockEventTypeList.forEach((eventType) => {
      expect(screen.getByText(eventType.name)).toBeInTheDocument()
    })
  })
  test('should be able to click delete button element', () => {
    const deleteBtnElement = screen.getByTestId('delete-btn13')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
    const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(modalConfirmBtn)
    expect(modalConfirmBtn).toBeInTheDocument()
  })
})

describe('Event Type List Table Component Testing with data', () => {
  beforeEach(() => {
    render(
      <EventTypeListTable
        onChangeInputHandler={mockOnChangeInputHandler}
        editEventTypeName={''}
        setEditEventTypeName={mockSetEditEventTypeName}
        isEditBtnClicked={true}
        setIsEditBtnClicked={mockSetIsEditBtnClicked}
      />,
      {
        preloadedState: {
          eventTypeList: {
            eventTypes: mockEventTypeList,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      },
    )
  })
  afterEach(cleanup)
  screen.debug()
  test('should be able to edit event type', () => {
    const editBtnElement = screen.getByTestId('edit-btn13')
    expect(editBtnElement).toBeInTheDocument()
    fireEvent.click(editBtnElement)
    const editInputElement = screen.getByTestId('eventTypeName')
    expect(editInputElement).toBeInTheDocument()
    fireEvent.change(editInputElement, 'newTest1')
    const saveBtnElement = screen.getByTestId('save-btn13')
    expect(saveBtnElement).toBeInTheDocument()
    userEvent.click(saveBtnElement)
    expect(saveBtnElement).toBeEnabled()
  })
  test('should not be able to edit event type have same event type', () => {
    const editBtnElement = screen.getByTestId('edit-btn12')
    expect(editBtnElement).toBeInTheDocument()
    fireEvent.click(editBtnElement)
    const editInputElement = screen.getByTestId('eventTypeName')
    expect(editInputElement).toBeInTheDocument()
    fireEvent.change(editInputElement, 'test567')
    const saveBtnElement = screen.getByTestId('save-btn12')
    expect(saveBtnElement).toBeInTheDocument()
    userEvent.click(saveBtnElement)
    expect(saveBtnElement).toBeEnabled()
  })
  test('should be able to cancel edit event type', () => {
    const editBtnElement = screen.getByTestId('edit-btn13')
    expect(editBtnElement).toBeInTheDocument()
    fireEvent.click(editBtnElement)
    const cancelBtnElement = screen.getByTestId('cancel-btn13')
    expect(cancelBtnElement).toBeInTheDocument()
    userEvent.click(cancelBtnElement)
    expect(cancelBtnElement).toBeEnabled()
  })
})
