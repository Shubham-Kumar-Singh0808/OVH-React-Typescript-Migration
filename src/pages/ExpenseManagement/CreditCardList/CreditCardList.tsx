import React, { useEffect, useState } from 'react'
import { CRow, CFormLabel, CCol, CFormInput, CButton } from '@coreui/react-pro'
import CreditCardListTable from './CreditCardListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { TextDanger } from '../../../constant/ClassName'
import { showIsRequired } from '../../../utils/helper'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OToast from '../../../components/ReusableComponent/OToast'

const CreditCardList = (): JSX.Element => {
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [isCardNumberExist, setIsCardNumberExist] = useState('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const dispatch = useAppDispatch()

  //dispatching the user access permissions
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Expense Management',
  )

  const formLabelProps = {
    htmlFor: 'inputNewCreditCard',
    className: 'col-form-label credit-card-list-label',
  }

  // To check exist credit card number
  const existCreditCardNumber = useTypedSelector(
    reduxServices.creditCardList.selectors.creditCards,
  )

  const creditCardExists = (cardNum: string) => {
    return existCreditCardNumber?.find((creditCard) => {
      return creditCard.cardNumber.toLowerCase() === cardNum.toLowerCase()
    })
  }

  // Enabling and disabling the Add buttons
  useEffect(() => {
    if (cardName && cardNumber) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [cardName, cardNumber])

  const clearCreditCardInputs = () => {
    setCardName('')
    setCardNumber('')
    setIsCardNumberExist('')
  }

  //Handling the input boxes by using onChange Event Handler
  const handleCreditCardInput = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'cardName') {
      const newCardNameValue = value
        .replace(/[^a-zA-Z\s]$/gi, '')
        .replace(/^\s*/, '')
      setCardName(newCardNameValue)
    } else if (name === 'cardNumber') {
      const newCardNumberValue = value.replace(/\D/g, '').replace(/^\s*/, '')
      setCardNumber(newCardNumberValue)
    }
    if (creditCardExists(value.trim())) {
      setIsCardNumberExist(value.trim())
    } else {
      setIsCardNumberExist('')
    }
  }

  // Handling using the Enter Keyword
  const handleEnterKeywordCreditCard = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (isAddButtonEnabled && event.key === 'Enter' && !isCardNumberExist) {
      const addCreditCardobject = {
        cardName,
        cardNumber,
      }
      const isAddCreditCard = await dispatch(
        reduxServices.creditCardList.addCreditCardsList(addCreditCardobject),
      )
      if (
        reduxServices.creditCardList.addCreditCardsList.fulfilled.match(
          isAddCreditCard,
        )
      ) {
        dispatch(reduxServices.creditCardList.getCreditCardsList())
        setCardName('')
        setCardNumber('')
        dispatch(reduxServices.app.actions.addToast(successToast))
        dispatch(reduxServices.app.actions.addToast(undefined))
      }
    }
  }

  // Add button Handler to add the credit card
  const addCreditCardButtonHandler = async () => {
    const addCreditCardobject = {
      cardName,
      cardNumber,
    }
    const isAddNewCreditCard = await dispatch(
      reduxServices.creditCardList.addCreditCardsList(addCreditCardobject),
    )
    if (
      reduxServices.creditCardList.addCreditCardsList.fulfilled.match(
        isAddNewCreditCard,
      )
    ) {
      dispatch(reduxServices.creditCardList.getCreditCardsList())
      setCardName('')
      setCardNumber('')
      dispatch(reduxServices.app.actions.addToast(successToast))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const successToast = (
    <OToast
      toastMessage="Card Details Added Successfully"
      toastColor="success"
    />
  )

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Credit Card List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
            data-testid="categoryLabel"
          >
            Card Name:
            <span className={showIsRequired(cardName)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="cardName"
              type="text"
              id="cardName"
              size="sm"
              name="cardName"
              autoComplete="off"
              placeholder="Card Name"
              maxLength={30}
              value={cardName}
              onChange={handleCreditCardInput}
              onKeyDown={handleEnterKeywordCreditCard}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
            data-testid="categoryLabel"
          >
            Card Number:
            <span className={showIsRequired(cardNumber)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="mb-1"
              data-testid="cardNumber"
              type="text"
              id="cardNumber"
              size="sm"
              name="cardNumber"
              autoComplete="off"
              placeholder="Card Number"
              maxLength={16}
              value={cardNumber}
              onChange={handleCreditCardInput}
              onKeyDown={handleEnterKeywordCreditCard}
            />
            {isCardNumberExist && (
              <span className={TextDanger} data-testid="nameAlreadyExist">
                <b>Card number already exists</b>
              </span>
            )}
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            {userAccess?.createaccess && (
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                disabled={
                  isAddButtonEnabled
                    ? isAddButtonEnabled && isCardNumberExist.length > 0
                    : !isAddButtonEnabled
                }
                onClick={addCreditCardButtonHandler}
              >
                Add
              </CButton>
            )}
            <CButton
              data-testid="clear-btn"
              color="warning"
              className="btn-ovh text-white"
              onClick={clearCreditCardInputs}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
        <CreditCardListTable />
      </OCard>
    </>
  )
}

export default CreditCardList
