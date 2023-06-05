import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddProcessArea from './AddProcessArea'
import { fireEvent, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockProcessAreas,
  mockProjectTailoring,
} from '../../../../test/data/processAreaData'

const mockSetToggle = jest.fn()
const clearButton = 'clear-btn'

describe('New Process Areas without data', () => {
  beforeEach(() => {
    render(<AddProcessArea setToggle={mockSetToggle} />, {
      preloadedState: {
        processArea: {
          isLoading: ApiLoadingState.idle,
          error: null,
          getProjectTailoringDocument: mockProjectTailoring,
          ProcessSubHeads: [],
          ProcessAreas: mockProcessAreas,
          currentPage: 1,
          pageSize: 20,
        },
      },
    })
  })
  test('should be able to render Process Areas Title', () => {
    expect(screen.getByText('Add Process Area')).toBeInTheDocument()
  })
  test('should render click on back button ', () => {
    const backButtonElement = screen.getByTestId('back-btn')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(1)
  })
  test('should render addTracker List component with out crashing', () => {
    expect(screen.getByText('Category:')).toBeInTheDocument()
    expect(screen.getByText('Process Area Name:')).toBeInTheDocument()
    expect(screen.getByText('Document Name:')).toBeInTheDocument()
    expect(screen.getByText('Responsible:')).toBeInTheDocument()
    expect(screen.getByText('Document Link:')).toBeInTheDocument()
    expect(screen.getByText('Status:')).toBeInTheDocument()
    expect(screen.getByText('Order')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })
  test('should select Location Name', () => {
    const LocationSelector = screen.getByTestId('form-select1')
    userEvent.selectOptions(LocationSelector, ['Project Management'])
    expect(LocationSelector).toHaveValue('1')

    const Location = screen.getByTestId('form-select2')
    userEvent.selectOptions(Location, ['Project Planning h'])
    expect(Location).toHaveValue('1')

    const addBtnElement = screen.getByTestId('add-inner')
    expect(addBtnElement).toBeEnabled()
    userEvent.click(addBtnElement)

    const levels = screen.getByPlaceholderText('Document Name')
    userEvent.type(levels, 'HIVE Issue work package')
    expect(levels).toHaveValue('HIVE Issue work package')

    const level = screen.getByPlaceholderText('Responsible')
    userEvent.type(level, 'PM')
    expect(level).toHaveValue('PM')

    const leveling = screen.getByPlaceholderText('Link')
    userEvent.type(
      leveling,
      'https://hive.raybiztech.com/projects/qms-v6-0/wiki/risk-management',
    )
    expect(leveling).toHaveValue(
      'https://hive.raybiztech.com/projects/qms-v6-0/wiki/risk-management',
    )
    const activeState = screen.getByRole('radio', {
      name: 'Active',
    }) as HTMLInputElement
    const inactiveState = screen.getByRole('radio', {
      name: 'Inactive',
    }) as HTMLInputElement
    expect(activeState.checked).toEqual(true)
    expect(inactiveState.checked).toEqual(false)
    fireEvent.click(inactiveState)
    expect(activeState.checked).toEqual(false)

    userEvent.click(screen.getByTestId(clearButton))
    expect(LocationSelector).toHaveValue('')
    expect(Location).toHaveValue('')
    expect(levels).toHaveValue('')
    expect(level).toHaveValue('')
    expect(leveling).toHaveValue('')
  })
  test('should select Location Name', () => {
    const order = screen.getByTestId('selectOrder')
    userEvent.type(order, '24')
    expect(order).toHaveValue('24')
    userEvent.click(screen.getByTestId(clearButton))
    expect(order).toHaveValue('')
  })
})
