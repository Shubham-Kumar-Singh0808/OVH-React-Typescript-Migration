import userEvent from '@testing-library/user-event'
import React from 'react'
import AddConfiguration from './AddConfiguration'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
// eslint-disable-next-line import/order
import { CKEditor } from 'ckeditor4-react'

const mockSetTogglePage = jest.fn()
const saveButton = 'save-btn'
const clearButton = 'clear-btn'
const reviewName = 'New Cycle 2'

describe('Add Configuration Component Testing', () => {
  beforeEach(() => {
    render(<AddConfiguration setToggle={mockSetTogglePage} />)
  })
  test('should be able to render  Add Configuration  Title', () => {
    expect(screen.getByText('Add Configuration')).toBeInTheDocument()
  })
  test('should render Configuration  component with out crashing', () => {
    expect(screen.getByText('Review Title:')).toBeInTheDocument()
    expect(screen.getByText('Review Type:')).toBeInTheDocument()
    expect(screen.getByText('Review Period From:')).toBeInTheDocument()
    expect(screen.getByText('Review Period To:')).toBeInTheDocument()
    expect(screen.getByText('Review Start Date:')).toBeInTheDocument()
    expect(screen.getByText('Review End Date:')).toBeInTheDocument()
    expect(screen.getByText('Review Duration (days):')).toBeInTheDocument()
    expect(screen.getByText('Level:')).toBeInTheDocument()
    expect(
      screen.getByText('Minimum Service Period (days):'),
    ).toBeInTheDocument()
    expect(screen.getByText('Active:')).toBeInTheDocument()
    expect(screen.getByText('Description:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  test('should render Add button as disabled and Clear Button not disabled initially', () => {
    expect(screen.getByTestId(saveButton)).toBeDisabled()
    expect(screen.getByTestId(clearButton)).toBeEnabled()
  })
  test('should render clear button', () => {
    const clearButton = screen.getByTestId('clear-btn')
    expect(clearButton).toBeEnabled()
  })

  test('should enabled add button when input is not empty', () => {
    expect(screen.getByTestId(clearButton)).not.toBeDisabled()
    expect(screen.getByTestId(saveButton)).toBeDisabled()
  })

  test('should render on  input of Configuration', async () => {
    const reviewTitle = screen.getByPlaceholderText('Name')
    userEvent.type(reviewTitle, reviewName)
    expect(reviewTitle).toHaveValue(reviewName)

    const reviewType = screen.getByTestId('form-select1')
    userEvent.selectOptions(reviewType, ['Monthly'])
    expect(reviewType).toHaveValue('Monthly')

    const level = screen.getByPlaceholderText('level')
    userEvent.type(reviewTitle, '1')
    expect(level).toHaveValue('1')

    const minimumServicePeriod = screen.getByPlaceholderText(
      'Minimum Service Period',
    )
    userEvent.type(reviewTitle, '1')
    expect(minimumServicePeriod).toHaveValue('')

    userEvent.click(screen.getByTestId('clear-btn'))
    await waitFor(() => {
      expect(reviewTitle).toHaveValue('')
      expect(reviewType).toHaveValue('')
      expect(level).toHaveValue('')
      expect(minimumServicePeriod).toHaveValue('')
    })
  })
  jest.retryTimes(3)
  test('should render on Dates', async () => {
    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '10 Nov, 2022' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: '18 Nov, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('10/11/2022')
    expect(datePickers[1]).toHaveValue('18/11/2022')
    userEvent.click(screen.getByTestId(clearButton))
    expect(datePickers[0]).toHaveValue('')
    expect(datePickers[1]).toHaveValue('')
  })

  test('should render on Duration Dates', async () => {
    const datePickers = screen.getAllByPlaceholderText('mm/yyyy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: 'Nov, 2022' },
      }),
    )
    fireEvent.click(datePickers[1])
    await waitFor(() =>
      fireEvent.change(datePickers[1], {
        target: { value: 'Oct, 2022' },
      }),
    )
    expect(datePickers[0]).toHaveValue('11/2022')
    expect(datePickers[1]).toHaveValue('10/2022')
    userEvent.click(screen.getByTestId(clearButton))
    expect(datePickers[0]).toHaveValue('')
    expect(datePickers[1]).toHaveValue('')
  })

  test('should render  Configuration  screen and back button without crashing', () => {
    const backButton = screen.getByTestId('back-button')
    expect(backButton).toBeInTheDocument()
    userEvent.click(backButton)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(1)
  })

  test('pass comments to test input value', () => {
    render(
      <CKEditor
        initData={
          process.env.JEST_WORKER_ID !== undefined && <p>test test test</p>
        }
      />,
    )
  })

  test('should render on every input of Configuration', () => {
    const reviewTitle = screen.getByPlaceholderText('Name')
    userEvent.type(reviewTitle, reviewName)

    const reviewType = screen.getByTestId('form-select1')
    userEvent.selectOptions(reviewType, ['Monthly'])

    const level = screen.getByPlaceholderText('level')
    userEvent.type(level, '1')

    const minimumServicePeriod = screen.getByPlaceholderText(
      'Minimum Service Period',
    )
    userEvent.type(minimumServicePeriod, '1')

    userEvent.click(screen.getByTestId(saveButton))
    expect(screen.getByTestId(saveButton)).not.toBeEnabled()
    expect(reviewTitle).toHaveValue('New Cycle 2')
    expect(reviewType).toHaveValue('Monthly')
    expect(level).toHaveValue('1')
    expect(minimumServicePeriod).toHaveValue('1')

    userEvent.click(screen.getByTestId(clearButton))
    expect(screen.getByTestId(clearButton)).toBeEnabled()
    expect(reviewTitle).toHaveValue('')
    expect(reviewType).toHaveValue('')
    expect(level).toHaveValue('')
    expect(minimumServicePeriod).toHaveValue('')
  })

  test('should be able to click Add button element', () => {
    const addButton = screen.getByRole('button', { name: 'Add' })
    userEvent.click(addButton)
    expect(addButton).toBeInTheDocument()
  })

  test('Radio button should be  "true" or "false"', () => {
    const activeState = screen.getByRole('radio', {
      name: 'Yes',
    }) as HTMLInputElement

    const inactiveState = screen.getByRole('radio', {
      name: 'No',
    }) as HTMLInputElement

    expect(activeState.checked).toEqual(false)
    expect(inactiveState.checked).toEqual(false)

    fireEvent.click(inactiveState)

    expect(activeState.checked).toEqual(false)
  })
})
