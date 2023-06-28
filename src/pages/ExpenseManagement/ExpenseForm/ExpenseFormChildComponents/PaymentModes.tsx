import {
  CRow,
  CFormLabel,
  CCol,
  CFormSelect,
  CFormInput,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { CreditCardListResponse } from '../../../../types/ExpenseManagement/ExpenseForm/expenseFormTypes'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { dateFormat } from '../../../../constant/DateFormat'

const PaymentList = ({
  paymentMode,
  setPaymentMode,
  creditCardResult,
  setCreditCardResult,
  chequeNumber,
  setChequeNumber,
  chequeDate,
  setChequeDate,
}: {
  paymentMode: string
  setPaymentMode: React.Dispatch<React.SetStateAction<string>>
  creditCardResult: CreditCardListResponse[]
  setCreditCardResult: React.Dispatch<
    React.SetStateAction<CreditCardListResponse[]>
  >
  chequeNumber: string
  setChequeNumber: React.Dispatch<React.SetStateAction<string>>
  chequeDate: string
  setChequeDate: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const formLabel = 'col-sm-3 col-form-label text-end'
  const paymentsList = useTypedSelector(
    reduxServices.expenseForm.selectors.paymentsList,
  )
  // const [creditCardResult, setCreditCardResult] =
  //   useState<CreditCardListResponse[]>()
  const [selectedCreditCard, setSelectedCreditCard] = useState('')
  const [showCreditCardList, setShowCreditCardList] = useState(true)
  const creditCards = useTypedSelector(
    reduxServices.expenseForm.selectors.creditCards,
  )

  useEffect(() => {
    if (creditCards) {
      setCreditCardResult(creditCards)
    }
  }, [creditCards])

  const expenseFormNumberRegex = /\D/g

  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'chequeNumber') {
      const chequeValue = value
        .replace(expenseFormNumberRegex, '')
        .replace(/^\s*/, '')
      setChequeNumber(chequeValue)
    }
  }

  //Date change Handlers
  const disableAfterDate = new Date()
  disableAfterDate.setFullYear(disableAfterDate.getFullYear() + 1)

  const onHandleExpenditureDatePicker = (value: Date) => {
    setChequeDate(moment(value).format(dateFormat))
  }

  const handleCreditCard = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newCreditCard: CreditCardListResponse[] = JSON.parse(
      JSON.stringify(creditCardResult),
    )
    newCreditCard[index].cardName = event.target.value
    setCreditCardResult(newCreditCard)
    setSelectedCreditCard(event.target.value)
    setShowCreditCardList(false)
  }

  const handlePaymentModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newPaymentMode = event.target.value
    setPaymentMode(newPaymentMode)
    setSelectedCreditCard('') // Reset selected credit card value
    setShowCreditCardList(newPaymentMode === '3') // Show credit card list only when payment mode is '3'
  }
  return (
    <>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
          data-testid="paymentLabel"
        >
          Payment Mode:
          <span className={paymentMode ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            className="mb-1"
            data-testid="paymentMode"
            id="paymentMode"
            size="sm"
            aria-label="Payment"
            name="paymentMode"
            onChange={handlePaymentModeChange}
            value={paymentMode}
          >
            <option value={''}>Select PaymentMode</option>
            {paymentsList
              .slice()
              .sort((payments1, payments2) =>
                payments1.paymentType.localeCompare(payments2.paymentType),
              )
              ?.map((paymentItems, pay) => (
                <option key={pay} value={paymentItems.id}>
                  {paymentItems.paymentType}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
      {paymentMode === '2' ? (
        <>
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Cheque Number:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="mb-1"
                data-testid="voucherNumber"
                type="text"
                id="voucherNumber"
                size="sm"
                name="chequeNumber"
                autoComplete="off"
                placeholder="Cheque Number"
                value={chequeNumber}
                maxLength={30}
                onChange={handledInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-3">
            <CFormLabel className={formLabel}>Cheque Date:</CFormLabel>
            <CCol sm={3}>
              <DatePicker
                id="chequeDate"
                className="form-control form-control-sm sh-date-picker"
                showMonthDropdown
                showYearDropdown
                autoComplete="off"
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="Cheque Date"
                name="chequeDate"
                maxDate={disableAfterDate}
                value={chequeDate}
                onChange={(date: Date) => onHandleExpenditureDatePicker(date)}
              />
            </CCol>
          </CRow>
        </>
      ) : (
        ''
      )}

      {paymentMode === '3' && (
        <>
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
            data-testid="creditCardLabel"
          >
            Credit Card List:
          </CFormLabel>
          <CRow>
            {showCreditCardList &&
              creditCardResult?.map((item, index) => {
                return (
                  <>
                    <CFormCheck
                      key={index}
                      type="radio"
                      name="creditCard"
                      id={`creditCard_${index}`}
                      value={item.cardName}
                      checked={item.cardName === selectedCreditCard}
                      onChange={(event) => handleCreditCard(event, index)}
                      inline
                    />
                    <div>
                      <CFormLabel
                        {...formLabelProps}
                        className="col-sm-3 col-form-label text-end"
                      >
                        Card Name:
                      </CFormLabel>
                      {item.cardName}
                    </div>
                  </>
                )
              })}
          </CRow>
          {selectedCreditCard && (
            <CRow>
              <CFormLabel
                {...formLabelProps}
                className="col-sm-3 col-form-label text-end"
              >
                Selected Credit Card:
              </CFormLabel>
              <CCol sm={3}>
                <div>{selectedCreditCard}</div>
              </CCol>
            </CRow>
          )}
        </>
      )}
    </>
  )
}

export default PaymentList
