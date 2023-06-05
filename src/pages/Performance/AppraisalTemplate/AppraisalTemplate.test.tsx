import '@testing-library/jest-dom'
import React from 'react'
import { screen } from '@testing-library/react'
import AppraisalTemplate from './AppraisalTemplate'
import { render } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockCycle } from '../../../test/data/appraisalTemplateData'

describe('Appraisal Template without data', () => {
  beforeEach(() => {
    render(<AppraisalTemplate />, {
      preloadedState: {
        appraisalTemplate: {
          isLoading: ApiLoadingState.loading,
          error: null,
          listSize: 0,
          cycleList: mockCycle,
          designationsUnderCycle: [],
          currentPage: 1,
          pageSize: 20,
        },
      },
    })
  })
  test('should render Appraisal Template component with out crashing', () => {
    expect(screen.getByText('Appraisal Template')).toBeInTheDocument()
  })
  test('should be able to render  Appraisal Template', () => {
    expect(screen.getByText('Configurations :')).toBeInTheDocument()
  })
})
