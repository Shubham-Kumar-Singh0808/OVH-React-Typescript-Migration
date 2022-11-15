import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
// eslint-disable-next-line import/order
import { CKEditor } from 'ckeditor4-react'
import EditConfiguration from './EditConfiguration'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockEditAppraisalCycle } from '../../../../test/data/editConfigurationData'
import { mockAppraisalCycle } from '../../../../test/data/appraisalConfigurationsData'

const mockSetTogglePage = jest.fn()
const updateButton = 'updateBtn'

describe('Edit Configuration Component Testing', () => {
  beforeEach(() => {
    render(<EditConfiguration />)
  })
  test('should be able to render  Edit Configuration  Title', () => {
    expect(screen.getByText('Edit Configuration')).toBeInTheDocument()
  })
  test('should render Configuration  component with out crashing', () => {
    expect(screen.getByText('Review Title:')).toBeInTheDocument()
    expect(screen.getByText('Review Type:')).toBeInTheDocument()
    expect(screen.getByText('Review Period From:')).toBeInTheDocument()
    expect(screen.getByText('Review Period To:')).toBeInTheDocument()
    expect(screen.getByText('Review Start Date:')).toBeInTheDocument()
    expect(screen.getByText('Review End Date:')).toBeInTheDocument()
    expect(screen.getByText('Review Duration (days):')).toBeInTheDocument()
    expect(screen.getByText('Level:')).toBeInTheDocument()
    expect(
      screen.getByText('Minimum Service Period (days):'),
    ).toBeInTheDocument()
    expect(screen.getByText('Active:')).toBeInTheDocument()
    expect(screen.getByText('Description:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Update' })).toBeDisabled()
  })

  test('should render  Configuration  screen and back button without crashing', () => {
    const backButton = screen.getByTestId('back-button')
    expect(backButton).toBeInTheDocument()
    userEvent.click(backButton)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
  })

  test('pass comments to test input value', () => {
    render(
      <CKEditor
        initData={
          process.env.JEST_WORKER_ID !== undefined && <p>test test test</p>
        }
      />,
    )
  })

  test('should be able to click update button element', () => {
    const updateBtn = screen.getByRole('button', { name: 'Update' })
    userEvent.click(updateBtn)
    expect(updateBtn).toBeInTheDocument()
  })

  test('Radio button should be  "true" or "false"', () => {
    const activeState = screen.getByRole('radio', {
      name: 'Yes',
    }) as HTMLInputElement

    const inactiveState = screen.getByRole('radio', {
      name: 'No',
    }) as HTMLInputElement

    expect(activeState.checked).toEqual(false)
    expect(inactiveState.checked).toEqual(true)

    fireEvent.click(inactiveState)

    expect(activeState.checked).toEqual(false)
  })
})

describe('Edit Client Component', () => {
  beforeEach(() => {
    render(<EditConfiguration />, {
      preloadedState: {
        appraisalConfigurations: {
          appraisalCycle: mockAppraisalCycle,
          editAppraisalCycle: mockEditAppraisalCycle,
          isLoading: ApiLoadingState.idle,
          currentPage: 1,
          pageSize: 20,
          error: null,
        },
      },
    })
  })
  afterEach(cleanup)
  test('update button should disable upon providing existing client name ', async () => {
    const reviewTitleInput = screen.getByTestId('editReviewTitle')
    userEvent.clear(reviewTitleInput)
    userEvent.type(reviewTitleInput, 'Test review2')
    expect(reviewTitleInput).toHaveValue(`Test review2`)

    const reviewTypeInput = screen.getByTestId('form-select1')
    userEvent.selectOptions(reviewTypeInput, 'Monthly')

    const updateBtnElement = screen.getByTestId(updateButton)
    userEvent.click(updateBtnElement)
    await waitFor(() => {
      expect(updateBtnElement).toBeDisabled()
    })
  })
})
