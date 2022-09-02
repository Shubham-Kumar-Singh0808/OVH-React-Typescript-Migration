import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AllocateEmployee from './AllocateEmployee'
import { render, screen } from '../../../test/testUtils'

describe('Allocate Employee without data', () => {
  beforeEach(() => {
    // eslint-disable-next-line react/react-in-jsx-scope
    render(<AllocateEmployee />)
  })

  test('should be able to render Experience Component without crashing', () => {
    screen.debug()
  })

  test('should be able to render Allocate Employee Title', () => {
    expect(screen.getByText('Employee Allocation')).toBeInTheDocument()
  })

  test('should render to date picker', () => {
    const EndDatePicker = screen.findByTestId('allocateEmployeeEndDate')
    expect(EndDatePicker).toBeTruthy()
  })
  test('should render Allocate button as  disabled initially', () => {
    expect(screen.getByRole('button', { name: 'Allocate' })).toBeInTheDocument()
  })
  test('should render clear button', () => {
    const clearButton = screen.getByTestId('clear-btn')
    expect(clearButton).toBeEnabled()
  })
  test('should select billable dropdown value', () => {
    const LeaveTypeSelectListSelector = screen.getByTestId('form-select1')
    userEvent.selectOptions(LeaveTypeSelectListSelector, ['Yes'])
    expect(LeaveTypeSelectListSelector).toHaveValue('true')
  })
  test('should render Template rich text editor', () => {
    const templateDescription = screen.findByTestId('ckEditor-component')
    expect(templateDescription).toBeTruthy()
  })
})
