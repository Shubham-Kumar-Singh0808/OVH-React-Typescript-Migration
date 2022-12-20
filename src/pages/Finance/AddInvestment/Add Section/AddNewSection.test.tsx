import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddNewSection from './AddNewSection'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const sectionNameInput = 'section-name'
const sectionLimitInput = 'section-limit'
const addButtonElement = 'as-add-btn'
const clearButtonElement = 'as-clear-btn'

describe('Add Section Component Testing', () => {
  beforeEach(() => {
    render(<AddNewSection />, {
      preloadedState: {
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  test('should render section name Input', () => {
    expect(screen.getByTestId(sectionNameInput)).toBeTruthy()
  })
  test('should render section Limit Input', () => {
    expect(screen.getByTestId(sectionLimitInput)).toBeTruthy()
  })
  it('should render Add button as disabled and Clear Button as enabled Initially', () => {
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeEnabled()
  })
  test('should enable add button , when all mandatory fields are entered', async () => {
    const sectionName = screen.getByTestId(sectionNameInput)
    userEvent.type(sectionName, 'Test')
    expect(sectionName).toHaveValue('Test')

    const sectionLimit = screen.getByTestId(sectionLimitInput)
    userEvent.type(sectionLimit, '200000')
    expect(sectionLimit).toHaveValue('200000')
    const addButtonEl = screen.getByTestId(addButtonElement)
    await waitFor(() => {
      expect(addButtonEl).toBeEnabled()
    })
  })
  test('should clear input fields entered by the user, upon clicking clear button', async () => {
    const sectionNameEl = screen.getByTestId(sectionNameInput)
    userEvent.type(sectionNameEl, 'Test')
    expect(sectionNameEl).toHaveValue('Test')

    const sectionLimitEl = screen.getByTestId(sectionLimitInput)
    userEvent.type(sectionLimitEl, '200000')
    expect(sectionLimitEl).toHaveValue('200000')
    const clearButtonEl = screen.getByTestId(clearButtonElement)

    userEvent.click(clearButtonEl)
    await waitFor(() => {
      expect(sectionNameEl).toHaveValue('')
      expect(sectionLimitEl).toHaveValue('')
    })
  })
  jest.retryTimes(3)
  test('should save the details when user enters valid data and clicks on Add Button', async () => {
    const sectionNameEle = screen.getByTestId(sectionNameInput)
    userEvent.type(sectionNameEle, 'Test')
    expect(sectionNameEle).toHaveValue('Test')

    const sectionLimitEle = screen.getByTestId(sectionLimitInput)
    userEvent.type(sectionLimitEle, '200000')
    expect(sectionLimitEle).toHaveValue('200000')

    const addButtonEle = screen.getByTestId(addButtonElement)
    expect(addButtonEle).toBeEnabled()
    await waitFor(() => {
      userEvent.click(addButtonEle)
    })
  })
})
