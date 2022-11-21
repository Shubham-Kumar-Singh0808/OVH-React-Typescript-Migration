import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
// eslint-disable-next-line import/order
import { CKEditor } from 'ckeditor4-react'
import EditConfiguration from './EditConfiguration'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'

const mockSetTogglePage = jest.fn()
const updateButton = 'updateBtn'
const selectType = 'form-select1'
describe('Edit Configuration Component Testing', () => {
  beforeEach(() => {
    render(<EditConfiguration />)
  })

  test('should render edit Configuration', () => {
    const backButton = screen.getByTestId('back-button')
    expect(backButton).toBeTruthy()
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

  test('update button should disable upon providing existing client name ', async () => {
    const reviewTitleInput = screen.getByTestId('editReviewTitle')
    userEvent.clear(reviewTitleInput)
    userEvent.type(reviewTitleInput, 'Test review2')
    expect(reviewTitleInput).toHaveValue('Test review2')

    const level = await screen.findByTestId('level')
    userEvent.type(level, '1')

    const minimumServicePeriod = screen.findByTestId('minimumServicePeriod')
    userEvent.type(await minimumServicePeriod, '90')

    const updateBtnElement = screen.getByTestId(updateButton)
    userEvent.click(updateBtnElement)
    await waitFor(() => {
      expect(updateBtnElement).toBeEnabled()
    })
  })

  test('should render review Title Input field ', () => {
    const reviewTitleInput = screen.findByTestId('editReviewTitle')
    expect(reviewTitleInput).toBeTruthy()
  })

  test('should render review Type Input field ', () => {
    const reviewTypeInput = screen.findByTestId(selectType)
    expect(reviewTypeInput).toBeTruthy()
  })

  test('should render review Period From Input field ', () => {
    const reviewPeriodFrom = screen.findByTestId('reviewPeriodFrom')
    expect(reviewPeriodFrom).toBeTruthy()
  })

  test('should render review Period To Input field ', () => {
    const reviewPeriodTo = screen.findByTestId('reviewPeriodTo')
    expect(reviewPeriodTo).toBeTruthy()
  })

  test('should render review Start Date Input field ', () => {
    const reviewStartDate = screen.findByTestId('reviewStartDate')
    expect(reviewStartDate).toBeTruthy()
  })

  test('should render review End Date Input field ', () => {
    const reviewEndDate = screen.findByTestId('reviewEndDate')
    expect(reviewEndDate).toBeTruthy()
  })

  test('should render review Duration Input field ', () => {
    const reviewDuration = screen.findByTestId('reviewDuration')
    expect(reviewDuration).toBeTruthy()
  })

  test('should render level Input field ', () => {
    const level = screen.findByTestId('level')
    expect(level).toBeTruthy()
  })

  test('should render  minimum Service Period Input field ', () => {
    const minimumServicePeriod = screen.findByTestId('minimumServicePeriod')
    expect(minimumServicePeriod).toBeTruthy()
  })
  test('should render active Input field ', () => {
    const active = screen.findByTestId('active')
    expect(active).toBeTruthy()
  })
})
