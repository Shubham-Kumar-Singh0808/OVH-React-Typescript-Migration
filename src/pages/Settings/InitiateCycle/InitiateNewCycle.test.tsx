import '@testing-library/jest-dom'
import React from 'react'
import { cleanup } from '@testing-library/react'
import InitiateCycle from './InitiateNewCycle'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockActiveCycleData } from '../../../test/data/initiateCycleData'
import { NominationCycleDto } from '../../../types/Settings/InitiateCycle/initiateCycleTypes'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

describe('InitiateCycle without data', () => {
  beforeEach(() => {
    render(<InitiateCycle />, {
      preloadedState: {
        initiateCycle: {
          isLoading: ApiLoadingState.succeeded,
          error: null,
          activeCycleData: mockActiveCycleData,
          allCycles: { size: 0, list: [] },
          allQuestions: { size: 0, list: [] },
          listSize: 0,
          currentPage: 1,
          pageSize: 20,
          toggle: '',
          editCycle: {} as NominationCycleDto,
        },
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render Initiate Cycle component with out crashing', () => {
    expect(screen.getByText('Initiate Cycle')).toBeInTheDocument()
  })
  test('should able to click Add Cycle Btn', () => {
    const addCycleBtn = screen.getByRole('button', {
      name: 'Add Cycle',
    })
    expect(addCycleBtn).toBeEnabled()
  })
  test('should able to click Add Question Btn', () => {
    const addQuestionBtn = screen.getByRole('button', {
      name: 'Add Question',
    })
    expect(addQuestionBtn).toBeEnabled()
  })
  test('should render labels', () => {
    expect(screen.getByText('Cycle Name:')).toBeInTheDocument()
    expect(screen.getByText('From Month :')).toBeInTheDocument()
    expect(screen.getByText('To Month :')).toBeInTheDocument()
  })
  test('should render Initiate Cycle component', () => {
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
  })

  test('should render on every input of Initiate Cycle', () => {
    const cycleNameInput = screen.getByTestId('cycleName')
    expect(cycleNameInput).toHaveValue('Testing the Cycle Flow')

    const fromMonthInput = screen.getByTestId('fromMonth')
    expect(fromMonthInput).toHaveValue('12/2022')

    const toMonthInput = screen.getByTestId('toMonth')
    expect(toMonthInput).toHaveValue('12/2022')
  })
})
