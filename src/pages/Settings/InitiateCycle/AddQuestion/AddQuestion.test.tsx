import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { cleanup } from '@testing-library/react'
import AddQuestion from './AddQuestion'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockActiveCycleData,
  mockAllCycles,
  mockAllQuestions,
} from '../../../../test/data/initiateCycleData'

const addButton = 'save-btn'
const clearButton = 'clear-btn'
const AddQuestionName = 'Question :'
const QuestionName = 'text-area'

const mockSetTogglePage = jest.fn()

describe('Add Question without data', () => {
  beforeEach(() => {
    render(<AddQuestion />, {
      preloadedState: {
        initiateCycle: {
          isLoading: ApiLoadingState.succeeded,
          error: null,
          activeCycleData: mockActiveCycleData,
          allCycles: mockAllCycles?.list,
          allQuestions: mockAllQuestions,
          listSize: 23,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render Add Question component with out crashing', () => {
    expect(screen.getByText(AddQuestionName)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  test('should render Add button as disabled and Clear Button not disabled initially', () => {
    expect(screen.getByTestId(addButton)).toBeDisabled()
    expect(screen.getByTestId(clearButton)).toBeEnabled()
  })
  test('should render clear button', () => {
    const clearButton = screen.getByTestId('clear-btn')
    expect(clearButton).toBeEnabled()
  })

  test('should enabled add button when input is not empty', () => {
    expect(screen.getByTestId(clearButton)).not.toBeDisabled()
    expect(screen.getByTestId(addButton)).toBeDisabled()
  })

  test('should render  Add Question  screen and back button without crashing', () => {
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
  })
  test('should render clear inputs', () => {
    userEvent.click(screen.getByRole('button', { name: 'Add' }))
    const clearInputName = screen.getByPlaceholderText('Question ?')
    expect(clearInputName).toHaveValue('')
  })
  test('should able to Add input field', () => {
    const questionNameInput = screen.getByTestId(QuestionName)
    userEvent.type(questionNameInput, 'Answer Question')
    const addButton = screen.getByTestId('save-btn')
    expect(addButton).toBeEnabled()
  })
})
