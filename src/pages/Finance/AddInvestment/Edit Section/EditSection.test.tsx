import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditSection from './EditSection'
import { cleanup, render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockSections } from '../../../../test/data/investmentCheckListData'

const sectionNameInput = 'es-section-name'
const sectionLimitInput = 'es-section-limit'
const updateButtonElement = 'es-update-btn'

describe('Add Section Component Testing', () => {
  beforeEach(() => {
    render(
      <EditSection
        editSection={{
          invests: [],
          sectionId: 1,
          sectionLimit: '200000',
          sectionName: 'Test',
        }}
      />,
      {
        preloadedState: {
          itDeclarationList: {
            isLoading: ApiLoadingState.succeeded,
          },
          investmentCheckList: {
            sections: mockSections,
          },
        },
      },
    )
  })
  afterEach(cleanup)
  test('should render "Edit Section" title', () => {
    const addHolidayTitle = screen.getByRole('heading', {
      name: "Edit Section's",
    })
    expect(addHolidayTitle).toBeTruthy()
  })
  test('should render section name Input', () => {
    expect(screen.getByTestId(sectionNameInput)).toBeTruthy()
  })
  test('should render section Limit Input', () => {
    expect(screen.getByTestId(sectionLimitInput)).toBeTruthy()
  })
  it('should render Update Button as enabled Initially', () => {
    expect(screen.getByRole('button', { name: 'Update' })).toBeEnabled()
  })
  test('should enable update button, when all mandatory fields are entered', async () => {
    const sectionName = screen.getByTestId(sectionNameInput)
    expect(sectionName).toHaveValue('Test')

    const sectionLimit = screen.getByTestId(sectionLimitInput)
    expect(sectionLimit).toHaveValue('200000')
    const updateButtonEl = screen.getByTestId(updateButtonElement)
    await waitFor(() => {
      expect(updateButtonEl).toBeEnabled()
    })
  })
  test('should disable update button, upon clearing any input field', async () => {
    const sectionNameEl = screen.getByTestId(sectionNameInput)
    userEvent.clear(sectionNameEl)
    expect(sectionNameEl).toHaveValue('')

    const sectionLimitEl = screen.getByTestId(sectionLimitInput)
    userEvent.clear(sectionLimitEl)
    expect(sectionLimitEl).toHaveValue('')
    const updateButtonEl = screen.getByTestId(updateButtonElement)
    await waitFor(() => {
      expect(updateButtonEl).toBeDisabled()
    })
  })

  test('should Update the details when user enters valid data and clicks on Update Button', async () => {
    const sectionNameEle = screen.getByTestId(sectionNameInput)
    userEvent.clear(sectionNameEle)
    userEvent.type(sectionNameEle, 'Test')
    expect(sectionNameEle).toHaveValue('Test')

    const sectionLimitEle = screen.getByTestId(sectionLimitInput)
    userEvent.clear(sectionLimitEle)
    userEvent.type(sectionLimitEle, '300000')
    expect(sectionLimitEle).toHaveValue('300000')

    const updateButtonEle = screen.getByTestId(updateButtonElement)
    expect(updateButtonEle).toBeEnabled()
    await waitFor(() => {
      userEvent.click(updateButtonEle)
    })
  })
})
