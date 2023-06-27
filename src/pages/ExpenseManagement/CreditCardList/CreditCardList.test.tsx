import React from 'react'
import userEvent from '@testing-library/user-event'
import CreditCardList from '../../ExpenseManagement/CreditCardList/CreditCardList'
import { mockCreditCardListData } from '../../../test/data/creditCardListData'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

jest.setTimeout(10000)

describe('Credit Card List without data', () => {
  beforeEach(() => {
    render(<CreditCardList />, {
      preloadedState: {
        creditCardList: {
          getCardsList: mockCreditCardListData,
          isLoading: ApiLoadingState.succeeded,
          error: null,
        },
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render Credit Card List component with out crashing', () => {
    expect(screen.getByText('Card Name:')).toBeInTheDocument()
    expect(screen.getByText('Card Number:')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  test('should render Add button as disabled  initially', () => {
    expect(screen.getByTestId('save-btn')).toBeDisabled()
    expect(screen.getByTestId('clear-btn')).toBeEnabled()
  })

  test('should able to select values for options for respective select element', () => {
    const checkCardName = screen.getByTestId('cardName')
    userEvent.type(checkCardName, 'SBI Online Platinum')
    expect(checkCardName).toHaveValue('SBI Online Platinum')

    const checkCardNumber = screen.getByTestId('cardNumber')
    userEvent.type(checkCardNumber, '4154212174542121')
    expect(checkCardNumber).toHaveValue('4154212174542121')

    const addCreditCard = screen.getByRole('button', { name: 'Add' })
    expect(addCreditCard).toBeEnabled()
    userEvent.click(addCreditCard)
  })

  test('should able to add values for respective select element', () => {
    const checkCardName = screen.getByTestId('cardName')
    userEvent.type(checkCardName, 'SBI Online')
    expect(checkCardName).toHaveValue('SBI Online')

    const checkCardNumber = screen.getByTestId('cardNumber')
    userEvent.type(checkCardNumber, '4154212174542020')
    expect(checkCardNumber).toHaveValue('4154212174542020')

    const cancelCreditCard = screen.getByRole('button', { name: 'Clear' })
    expect(cancelCreditCard).toBeEnabled()
    userEvent.click(cancelCreditCard)
  })

  test('should validate input data after edit button click', async () => {
    const editButton = screen.getByTestId(`btn-creditCardEdit3`)
    await fireEvent.click(editButton)
    await waitFor(async () => {
      userEvent.type(screen.getByTestId(`creditCardName3`), 'One Credit')
      userEvent.type(
        screen.getByTestId(`creditCardNumber3`),
        '1234654141741234',
      )
      const saveButton = screen.getByTestId(`save-credit-card-btn3`)
      await fireEvent.click(saveButton)
      expect(screen.getByTestId(`creditCardName3`)).toHaveValue(
        'SBI Credit CardtOne CreditOne Credit',
      )
      expect(screen.getByTestId(`creditCardNumber3`)).toHaveValue(
        '1123465414174123',
      )
    })
  })

  test('should be able to click delete button element with Yes button', () => {
    const deleteBtnClick = screen.getByTestId('btn-creditCardDelete3')
    expect(deleteBtnClick).toBeInTheDocument()
    userEvent.click(deleteBtnClick)
    const deleteModalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(deleteModalConfirmBtn)
    expect(deleteModalConfirmBtn).toBeInTheDocument()
  })

  test('should be able to click delete button element with No', () => {
    const deleteElementClick = screen.getByTestId('btn-creditCardDelete2')
    expect(deleteElementClick).toBeInTheDocument()
    userEvent.click(deleteElementClick)
    const modalCancelBtn = screen.getByRole('button', { name: 'No' })
    userEvent.click(modalCancelBtn)
    expect(modalCancelBtn).toBeInTheDocument()
  })
})

describe('Add Location List without data', () => {
  beforeEach(() => {
    render(<CreditCardList />, {
      preloadedState: {
        creditCardList: {
          getCardsList: [],
          isLoading: ApiLoadingState.succeeded,
          error: null,
        },
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  test('should be able to render Credit Card List Title', () => {
    expect(screen.getByText('Credit Card List')).toBeInTheDocument()
  })

  test('should render Add button as disabled  initially', () => {
    expect(screen.getByTestId('save-btn')).toBeDisabled()
  })
})
