import '@testing-library/jest-dom'
import React from 'react'
import ProcessAreaTable from './ProcessAreaTable'
import { render, screen } from '../../../test/testUtils'
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
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Process Area' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Document' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Responsible' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Document Link' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Status' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Order' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(8)
  })
})
