import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddNewKPI from './AddNewKPI'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { mockFrequencyList } from '../../../../test/data/addKpiData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockEditKRAData } from '../../../../test/data/KRAData'
import { KRAPages } from '../../../../types/Performance/KRA/KRATypes'

const kraNameInput = 'kra-name'
const deptInputElement = 'dept-name'
const desgInputElement = 'designation-name'
const kpiNameInputElement = 'kpiName-input'
const frequencyInputElement = 'frequency-input'
const targetInputElement = 'target-input'
const addButtonElement = 'save-btn'
const backButtonElement = 'kpi-back-btn'
const clearButtonElement = 'clear-btn'

describe('Add KPI Component Testing', () => {
  beforeEach(() => {
    render(<AddNewKPI addKPI={mockEditKRAData} />, {
      preloadedState: {
        KRA: {
          isLoading: ApiLoadingState.succeeded,
          getFrequency: mockFrequencyList,
          currentOnScreenPage: KRAPages.addKPI,
        },
      },
    })
  })
  test('should render KRA name Input', () => {
    expect(screen.getByTestId(kraNameInput)).toBeDisabled()
  })
  test('should render Department name Input', () => {
    expect(screen.getByTestId(deptInputElement)).toBeDisabled()
  })
  test('should render Designation name Input', () => {
    expect(screen.getByTestId(desgInputElement)).toBeDisabled()
  })
  test('should render KPI name Input', () => {
    expect(screen.getByTestId(kpiNameInputElement)).toBeTruthy()
  })
  test('should render frequency input', () => {
    expect(screen.getByTestId(frequencyInputElement)).toBeTruthy()
  })
  test('should render target input', () => {
    expect(screen.getByTestId(targetInputElement)).toBeTruthy()
  })
  it('should render Add button as disabled and Clear Button as enabled Initially', () => {
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })
  test('should enable add button , when all mandatory fields are entered', async () => {
    const kpiNameEl = screen.getByTestId(kpiNameInputElement)
    userEvent.type(kpiNameEl, 'Test')
    expect(kpiNameEl).toHaveValue('Test')

    userEvent.selectOptions(screen.getByTestId(frequencyInputElement), [
      'Select',
    ])

    const targetEl = screen.getByTestId(kpiNameInputElement)
    userEvent.clear(targetEl)
    userEvent.type(targetEl, '5%')
    expect(targetEl).toHaveValue('5%')

    const addButtonEl = screen.getByTestId(addButtonElement)
    await waitFor(() => {
      userEvent.click(addButtonEl)
    })
  })

  test('should redirect to kraList page upon clicking back button from Add KPI page', () => {
    const addKPIBackButton = screen.getByTestId(backButtonElement)
    userEvent.click(addKPIBackButton)
    expect(KRAPages.addKPI).toBeTruthy()
  })

  test('should clear inputs upon clicking clear button', async () => {
    const kpiNameEl = screen.getByTestId(kpiNameInputElement)
    userEvent.clear(kpiNameEl)
    userEvent.selectOptions(screen.getByTestId(frequencyInputElement), [''])

    const targetEl = screen.getByTestId(targetInputElement)
    userEvent.clear(targetEl)
    const clearButton = screen.getByTestId(clearButtonElement)
    userEvent.click(clearButton)
    await waitFor(() => {
      expect(kpiNameEl).toHaveValue('')
      expect(targetEl).toHaveValue('')
      userEvent.selectOptions(screen.getByTestId(frequencyInputElement), [
        'Select',
      ])
    })
  })
})
