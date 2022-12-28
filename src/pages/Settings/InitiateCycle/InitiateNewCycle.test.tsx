import '@testing-library/jest-dom'
import React from 'react'
import { cleanup } from '@testing-library/react'
import InitiateCycle from './InitiateCycle'
import { render, screen } from '../../../test/testUtils'
import { mockActiveCycleData } from '../../../test/data/initiateCycleData'

describe('InitiateCycle without data', () => {
  beforeEach(() => {
    render(<InitiateCycle />, {
      preloadedState: {
        initiateCycle: {
          activeCycleData: mockActiveCycleData,
          allCycles: { size: 0, list: [] },
          allQuestions: { size: 0, list: [] },
        },
      },
    })
  })
  afterEach(cleanup)

  test('should render Initiate Cycle component with out crashing', () => {
    expect(screen.getByText('Initiate Cycle')).toBeInTheDocument()
  })
})
