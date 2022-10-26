import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import OtherFilterOptions from './OtherFilterOptions'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <OtherFilterOptions
      setFilterByEmployeeStatus={jest.fn()}
      setFilterByDate={jest.fn()}
    />
  </div>
)
describe('Other Filter Options Component Testing', () => {
  beforeEach(() => {
    render(toRender)
  })
  afterEach(cleanup)
  test('should render other filter options component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument()
  })
  test('should render other filter options component with out crashing', async () => {
    const datePicker = screen.getByPlaceholderText('mm/yyyy')
    fireEvent.mouseDown(datePicker)
    fireEvent.change(datePicker, { target: { value: '5-2021' } })
    const radio = screen.getByLabelText('Active')
    fireEvent.change(radio, { target: { value: 'Active' } })
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'View' })).not.toBeEnabled()
      expect(screen.getByRole('button', { name: 'Clear' })).not.toBeEnabled()
    })
  })
  test('should render attendance report upon view button click', async () => {
    const datePicker = screen.getByPlaceholderText('mm/yyyy')
    fireEvent.click(datePicker)
    await waitFor(() =>
      fireEvent.change(datePicker, {
        target: { value: '14 Feb, 2022' },
      }),
    )
    const radioOne = screen.getByTestId(
      'activeEmploymentStatus',
    ) as HTMLInputElement
    const radioTwo = screen.getByLabelText('Inactive') as HTMLInputElement
    await fireEvent.click(radioOne)
    await fireEvent.click(radioTwo)
    await waitFor(() => {
      expect(datePicker).toHaveValue('02/2022')
      expect(radioOne.value).toBe('Active')
      userEvent.click(screen.getByRole('button', { name: 'Clear' }))
      userEvent.click(screen.getByRole('button', { name: 'View' }))
      expect(screen.getByRole('button', { name: 'Clear' })).toBeEnabled()
      expect(screen.getByRole('button', { name: 'View' })).toBeEnabled()
    })
  })
})
