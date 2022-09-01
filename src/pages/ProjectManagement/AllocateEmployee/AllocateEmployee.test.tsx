import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AllocateEmployee from './AllocateEmployee'
import { render, screen } from '../../../test/testUtils'

describe('Project Management Allocate Employee Component Testing', () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  render(<AllocateEmployee />)
})

// DatePickers
test('should render from date picker', () => {
  const allocationDatePicker = screen.findByTestId(
    'allocateEmployeeAllocationDate',
  )
  expect(allocationDatePicker).toBeTruthy()
})
test('should render to date picker', () => {
  const EndDatePicker = screen.findByTestId('allocateEmployeeEndDate')
  expect(EndDatePicker).toBeTruthy()
})

// Billable
const BillableSelectListSelector = screen.getByTestId('formBillable')
userEvent.selectOptions(BillableSelectListSelector, ['Yes'])
expect(BillableSelectListSelector).toHaveValue('Yes')

// Project Names
