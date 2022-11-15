import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
// eslint-disable-next-line import/order
import { CKEditor } from 'ckeditor4-react'
import EditConfiguration from './EditConfiguration'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'

const mockSetTogglePage = jest.fn()

describe('Edit Configuration Component Testing', () => {
  beforeEach(() => {
    render(<EditConfiguration />)
  })
  test('should be able to render  Edit Configuration  Title', () => {
    expect(screen.getByText('Edit Configuration')).toBeInTheDocument()
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
    expect(screen.getByRole('button', { name: 'Update' })).toBeDisabled()
  })

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
    expect(datePickers[0]).toHaveValue('10 Nov, 2022')
    expect(datePickers[1]).toHaveValue('18 Nov, 2022')
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
    expect(datePickers[0]).toHaveValue('Nov, 2022')
    expect(datePickers[1]).toHaveValue('Oct, 2022')
  })

  test('should render  Configuration  screen and back button without crashing', () => {
    const backButton = screen.getByTestId('back-button')
    expect(backButton).toBeInTheDocument()
    userEvent.click(backButton)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
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

  test('should be able to click update button element', () => {
    const updateBtn = screen.getByRole('button', { name: 'Update' })
    userEvent.click(updateBtn)
    expect(updateBtn).toBeInTheDocument()
  })

  test('Radio button should be  "true" or "false"', () => {
    const activeState = screen.getByRole('radio', {
      name: 'Yes',
    }) as HTMLInputElement

    const inactiveState = screen.getByRole('radio', {
      name: 'No',
    }) as HTMLInputElement

    expect(activeState.checked).toEqual(false)
    expect(inactiveState.checked).toEqual(true)

    fireEvent.click(inactiveState)

    expect(activeState.checked).toEqual(false)
  })
})
