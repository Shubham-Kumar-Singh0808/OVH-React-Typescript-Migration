import '@testing-library/jest-dom'
import React from 'react'
import { cleanup, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppraisalConfigurationsTable from './AppraisalConfigurationsTable'
import { render } from '../../../test/testUtils'
import { mockAppraisalCycle } from '../../../test/data/appraisalConfigurationsData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.queryByText(mockAppraisalCycle[i].id)).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AppraisalConfigurationsTable />,
  </div>
)
describe('Ticket Details Table Component Testing', () => {
  test('should render Ticket Details table component without crashing', async () => {
    render(toRender, {
      preloadedState: {
        appraisalCycleSlice: {
          appraisalCycle: mockAppraisalCycle,
          isLoading: ApiLoadingState.idle,
        },
      },
    })

    expectPageSizeToBeRendered(20)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(0)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(0)
    })
  })
})

describe('AppraisalConfigurationsTable without data', () => {
  beforeEach(() => {
    render(<AppraisalConfigurationsTable />, {
      preloadedState: {
        appraisalCycleSlice: {
          appraisalCycle: mockAppraisalCycle,
          isLoading: ApiLoadingState.idle,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Review Title' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Review Type' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Start Date' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'End Date' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Duration(days)' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', {
        name: 'Service Period(days)	',
      }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Active' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Description' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(10)
  })

  test('should render the "AppraisalConfigurations" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })

  test('should render AppraisalConfigurations Table component with data', () => {
    expect(screen.getByText('Appraisal Cycle 2016')).toBeInTheDocument()
    expect(screen.getByText('May 2017')).toBeInTheDocument()
    expect(screen.getByText('June 2017')).toBeInTheDocument()
    expect(screen.getByText('August 2017')).toBeInTheDocument()
  })

  test('should render with number of records  ', () => {
    expect(
      screen.getByText('Total Records:' + mockAppraisalCycle.length),
    ).toBeInTheDocument()
  })
})
