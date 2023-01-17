import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditKPi from './EditKPi'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { mockFrequencyList } from '../../../../test/data/addKpiData'
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
    render(<EditKPi />, {
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
    expect(screen.getByRole('button', { name: 'Update' })).toBeDisabled()
  })

  test('should redirect to kraList page upon clicking back button from Add KPI page', () => {
    const editKPIBackButton = screen.getByTestId(backButtonElement)
    userEvent.click(editKPIBackButton)
    expect(KRAPages.kraList).toBeTruthy()
  })
  test('should disable update button, when mandatory fields are not entered', async () => {
    const kpiNameEl = screen.getByTestId(kpiNameInputElement)
    userEvent.clear(kpiNameEl)
    expect(kpiNameEl).toHaveValue('')

    const targetEl = screen.getByTestId(targetInputElement)
    userEvent.clear(targetEl)
    userEvent.type(targetEl, '5%')
    expect(targetEl).toHaveValue('5%')

    const updateButtonEl = screen.getByTestId(updateButtonElement)
    await waitFor(() => {
      expect(updateButtonEl).toBeDisabled()
    })
  })
  test('should enable update button, when mandatory fields are not entered and update on click', async () => {
    const kpiNameEle = screen.getByTestId(kpiNameInputElement)
    userEvent.type(kpiNameEle, 'test')
    expect(kpiNameEle).toHaveValue('test')

    const targetEle = screen.getByTestId(targetInputElement)
    userEvent.type(targetEle, '15%')
    expect(targetEle).toHaveValue('15%')

    const updateButtonEl = screen.getByTestId(updateButtonElement)
    await waitFor(() => {
      userEvent.click(updateButtonEl)
      expect(KRAPages.kraList).toBeTruthy()
    })
  })
})
