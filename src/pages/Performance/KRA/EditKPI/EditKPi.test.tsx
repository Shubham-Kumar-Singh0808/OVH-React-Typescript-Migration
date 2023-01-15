import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditKPi from './EditKPi'
import { render, screen, waitFor } from '../../../../test/testUtils'
import {
  mockFrequencyList,
  mockKPIData,
} from '../../../../test/data/addKpiData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { KRAPages } from '../../../../types/Performance/KRA/KRATypes'

const kraNameInput = 'edit-kra-name'
const kpiNameInputElement = 'editkpiName-input'
const frequencyInputElement = 'edit-frequency-input'
const targetInputElement = 'edit-target-input'
const updateButtonElement = 'update-btn'
const backButtonElement = 'editkpi-backBtn'

describe('Edit KPI Component Testing', () => {
  beforeEach(() => {
    render(<EditKPi editKPi={mockKPIData} />, {
      preloadedState: {
        KRA: {
          isLoading: ApiLoadingState.succeeded,
          getFrequency: mockFrequencyList,
          currentOnScreenPage: KRAPages.editKPI,
        },
      },
    })
  })
  test('should render KRA name Input', () => {
    expect(screen.getByTestId(kraNameInput)).toBeDisabled()
  })
  test('should render target name Input', () => {
    expect(screen.getByTestId(targetInputElement)).toBeTruthy()
  })
  test('should render KPI name Input', () => {
    expect(screen.getByTestId(kpiNameInputElement)).toBeTruthy()
  })
  test('should render frequency input', () => {
    expect(screen.getByTestId(frequencyInputElement)).toBeTruthy()
  })
  it('should render Update button as enabled Initially', () => {
    expect(screen.getByRole('button', { name: 'Update' })).toBeEnabled()
  })

  test('should redirect to kraList page upon clicking back button from Add KPI page', () => {
    const editKPIBackButton = screen.getByTestId(backButtonElement)
    userEvent.click(editKPIBackButton)
    expect(KRAPages.kraList).toBeTruthy()
  })
})
