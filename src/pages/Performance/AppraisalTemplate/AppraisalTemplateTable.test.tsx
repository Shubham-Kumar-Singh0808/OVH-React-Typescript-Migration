import '@testing-library/jest-dom'
import React from 'react'
import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppraisalTemplateTable from './AppraisalTemplateTable'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockCycle,
  mockDesignationsUnderCycle,
} from '../../../test/data/appraisalTemplateData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AppraisalTemplateTable selectAppraisalId="2" />,
  </div>
)
describe('Appraisal Configurations Table Component Testing', () => {
  test('should render Appraisal Configurations table component without crashing', () => {
    render(toRender, {
      preloadedState: {
        appraisalTemplate: {
          isLoading: ApiLoadingState.loading,
          error: null,
          listSize: 0,
          cycleList: mockCycle,
          designationsUnderCycle: [],
          designationsUnderCycleProps: mockDesignationsUnderCycle,
          currentPage: 1,
          pageSize: 20,
        },
      },
    })
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
