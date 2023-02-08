import '@testing-library/jest-dom'
import React from 'react'
import ProcessAreaTable from './ProcessAreaTable'
import { render } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockProjectTailoring,
  mockProcessAreas,
} from '../../../test/data/processAreaData'

describe('New Process Areas without data', () => {
  beforeEach(() => {
    render(<ProcessAreaTable selectCategory={''} />, {
      preloadedState: {
        processArea: {
          isLoading: ApiLoadingState.idle,
          error: null,
          getProjectTailoringDocument: mockProjectTailoring,
          ProcessSubHeads: [],
          ProcessAreas: mockProcessAreas,
          currentPage: 1,
          pageSize: 20,
        },
      },
    })
  })
})
