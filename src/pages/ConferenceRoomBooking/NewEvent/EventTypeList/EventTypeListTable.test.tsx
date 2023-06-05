import '@testing-library/jest-dom'

import React from 'react'
import EventTypeListTable from './EventTypeListTable'
import { cleanup, render, screen } from '../../../../test/testUtils'
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
      userAccess={mockSetEditEventTypeName}
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
})
