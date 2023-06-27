import React from 'react'
import userEvent from '@testing-library/user-event'
import CreditCardListTable from './CreditCardListTable'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockCreditCardListData } from '../../../test/data/creditCardListData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

describe('Credit Card List Table without data', () => {
  beforeEach(() => {
    render(<CreditCardListTable />)
  })

  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Card Name' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Card Number' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(4)
  })

  test('should render the "Credit Card" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
})

describe('Credit Card List Table with data', () => {
  beforeEach(() => {
    render(<CreditCardListTable />, {
      preloadedState: {
        creditCardList: {
          getCardsList: mockCreditCardListData,
          isLoading: ApiLoadingState.succeeded,
        },
        userAccessToFeatures: {
          isLoading: ApiLoadingState.succeeded,
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render credit card list table component with data', () => {
    expect(screen.getByText('Citi Credit Card')).toBeInTheDocument()
    expect(screen.getByText('Kotak Credit Card')).toBeInTheDocument()
    expect(screen.getByText('IndusInd Credit Card')).toBeInTheDocument()
    expect(screen.getByText('SBI Credit Card')).toBeInTheDocument()
  })

  // eslint-disable-next-line require-await
  test('should render edit and cancel credit cards from the Credit Card List', async () => {
    const editCardElement = screen.getByTestId('btn-creditCardEdit1')
    expect(editCardElement).toBeEnabled()
    userEvent.click(editCardElement)

    const creditCard = screen.getByTestId('creditCardName1')
    userEvent.type(creditCard, 'SBI Credit Platinum')

    const creditCardNumber = screen.getByTestId('creditCardNumber1')
    userEvent.type(creditCardNumber, '4121547821321234')

    const cancelBtnElement = screen.getByTestId('cancel-credit-card-btn1')
    expect(cancelBtnElement).toBeEnabled()
    userEvent.click(cancelBtnElement)
  })

  test('should validate input data after edit button click', async () => {
    const editButton = screen.getByTestId(`btn-creditCardEdit3`)
    await fireEvent.click(editButton)
    // await waitFor(async () => {})
    userEvent.type(screen.getByTestId(`creditCardName3`), 'One Credit')
    userEvent.type(screen.getByTestId(`creditCardNumber3`), '1234654141741234')
    const saveButton = screen.getByTestId(`save-credit-card-btn3`)
    expect(saveButton).toBeEnabled()
    await fireEvent.click(saveButton)
    expect(screen.getByTestId(`creditCardName3`)).toHaveValue(
      'SBI Credit CardOne Credit',
    )
    expect(screen.getByTestId(`creditCardNumber3`)).toHaveValue(
      '1234654141741234',
    )
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

  test('should render correct number of records', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(5)
  })
})
