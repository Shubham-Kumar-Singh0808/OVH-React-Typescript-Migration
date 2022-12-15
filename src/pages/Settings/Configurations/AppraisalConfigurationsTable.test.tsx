import '@testing-library/jest-dom'
import React from 'react'
import { cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppraisalConfigurationsTable from './AppraisalConfigurationsTable'
import { render, screen } from '../../../test/testUtils'
import { mockAppraisalCycle } from '../../../test/data/appraisalConfigurationsData'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AppraisalConfigurationsTable userEditAccess={true} />,
  </div>
)
describe('Appraisal Configurations Table Component Testing', () => {
  test('should render Appraisal Configurations table component without crashing', async () => {
    render(toRender, {
      preloadedState: {
        appraisalConfigurations: {
          appraisalCycle: mockAppraisalCycle.list,
          isLoading: ApiLoadingState.succeeded,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(0)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(0)
    })
  })
})

describe('Appraisal Configurations Table without data', () => {
  beforeEach(() => {
    render(<AppraisalConfigurationsTable userEditAccess={true} />)
  })

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
      screen.getByRole('columnheader', { name: 'Service Period(days)' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Active' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Description' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', {
        name: 'Actions',
      }),
    ).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(10)
  })

  test('should render the "Appraisal Configurations" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
})

describe('Appraisal Configurations Table with data', () => {
  beforeEach(() => {
    render(<AppraisalConfigurationsTable userEditAccess={true} />, {
      preloadedState: {
        appraisalConfigurations: {
          listSize: 40,
          appraisalCycle: mockAppraisalCycle.list,
          isLoading: ApiLoadingState.idle,
        },
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render Appraisal Configurations component with data', () => {
    expect(screen.getByText('May 2017')).toBeInTheDocument()
    expect(screen.getByText('Appraisal Cycle 2016')).toBeInTheDocument()
    expect(screen.getByText('August 2017')).toBeInTheDocument()
    expect(screen.getByText('September 2017')).toBeInTheDocument()
  })

  test('Should be able to see total of 6 records', () => {
    expect(screen.getByText('Total Records: 40')).toBeInTheDocument()
  })

  test('should render description modal', () => {
    const description = screen.getAllByTestId('description-modal-link')
    userEvent.click(description[0])
    expect(description[0]).toBeInTheDocument()
  })

  test('should render first page data only', () => {
    waitFor(() => {
      userEvent.click(screen.getByText('Next >', { exact: true }))

      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
  })

  test('should disable first and prev in pagination if first page', () => {
    waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
})
