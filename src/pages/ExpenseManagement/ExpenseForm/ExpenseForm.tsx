/* eslint-disable sonarjs/no-duplicate-string */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CButton,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Employee from './ExpenseFormChildComponents/Employee'
import ProjectList from './ExpenseFormChildComponents/ProjectName'
import CategoriesList from './ExpenseFormChildComponents/Categories'
import Departments from './ExpenseFormChildComponents/Departments'
import VendorList from './ExpenseFormChildComponents/Vendors'
import Dropdowns from './ExpenseFormChildComponents/Dropdowns'
import PaymentList from './ExpenseFormChildComponents/PaymentModes'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { formLabelProps } from '../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import { dateFormat } from '../../../constant/DateFormat'
import OToast from '../../../components/ReusableComponent/OToast'
import {
  CreditCardListResponse,
  ProjectsListResponse,
} from '../../../types/ExpenseManagement/ExpenseForm/expenseFormTypes'

const ExpenseForm = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const formLabel = 'col-sm-3 col-form-label text-end'

  //Expense form Selectors
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [employeeAutoCompleteTarget, setEmployeeAutoCompleteTarget] =
    useState('')
  const [expenseCategory, setExpenseCategory] = useState('')
  const [expenseSubCategory, setExpenseSubCategory] = useState('')
  const [projectAutoCompleteTarget, setProjectAutoCompleteTarget] = useState('')
  const [departmentList, setDepartmentList] = useState('')
  const [vendorAutoCompleteTarget, setVendorAutoCompleteTarget] = useState('')
  const [purposeDetails, setPurposeDetails] = useState<string>()
  const [expenditureDate, setExpenditureDate] = useState<string>()
  const [country, setCountry] = useState('')
  const [currency, setCurrency] = useState('')
  const [paymentMode, setPaymentMode] = useState('')
  const [creditCard, setCreditCard] = useState<boolean>(false)
  const [creditCardResult, setCreditCardResult] =
    useState<CreditCardListResponse[]>()
  const [chequeNumber, setChequeNumber] = useState('')
  const [chequeDate, setChequeDate] = useState('')
  const [voucherNumber, setVoucherNumber] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [isReimbursableExpense, setIsReimbursableExpense] =
    useState<boolean>(false)
  const [descriptionInfo, setDescriptionInfo] = useState('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [isEnable, setIsEnable] = useState(false)

  useEffect(() => {
    if (employeeAutoCompleteTarget) {
      dispatch(
        reduxServices.expenseForm.getEmployeesList(employeeAutoCompleteTarget),
      )
    }
  }, [employeeAutoCompleteTarget])

  useEffect(() => {
    if (projectAutoCompleteTarget) {
      dispatch(
        reduxServices.expenseForm.getProjectsList(projectAutoCompleteTarget),
      )
    }
  }, [projectAutoCompleteTarget])

  useEffect(() => {
    if (vendorAutoCompleteTarget) {
      dispatch(
        reduxServices.expenseForm.getVendorsList(vendorAutoCompleteTarget),
      )
    }
  }, [vendorAutoCompleteTarget])

  useEffect(() => {
    dispatch(reduxServices.expenseForm.getCreditCardsDetails())
  }, [dispatch])

  //Date change Handlers
  const disableAfterDate = new Date()
  disableAfterDate.setFullYear(disableAfterDate.getFullYear() + 1)

  const onHandleExpenditureDatePicker = (value: Date) => {
    setExpenditureDate(moment(value).format(dateFormat))
    setChequeDate(moment(value).format(dateFormat))
  }

  const [testing, setTesting] = useState<string>()

  //OnChange Events for Text Inputs
  const expenseNameRegexReplace = /-_[^a-z0-9\s]/gi
  const expenseFormNumberRegex = /\D/g

  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'purposeDetails') {
      const purposeInfo = value
        .replace(expenseNameRegexReplace, '')
        .replace(/^\s*/, '')
      setPurposeDetails(purposeInfo)
    } else if (name === 'voucherNumber') {
      const voucherValue = value
        .replace(expenseFormNumberRegex, '')
        .replace(/^\s*/, '')
      setVoucherNumber(voucherValue)
    } else if (name === 'invoiceNumber') {
      const invoiceValue = value
        .replace(expenseFormNumberRegex, '')
        .replace(/^\s*/, '')
      setInvoiceNumber(invoiceValue)
    } else if (name === 'amount') {
      const amountValue = value
        .replace(expenseFormNumberRegex, '')
        .replace(/^\s*/, '')
      setAmount(amountValue)
    } else if (name === 'chequeNumber') {
      const chequeValue = value
        .replace(expenseFormNumberRegex, '')
        .replace(/^\s*/, '')
      setChequeNumber(chequeValue)
    }
  }

  const handleDescription = (descriptionDetails: string) => {
    setDescriptionInfo(descriptionDetails)
  }

  const handleIsReimbursableExpense = (isReimbursableExpense: boolean) => {
    setIsReimbursableExpense(isReimbursableExpense)
  }

  // const handleCreditCard = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCreditCard(event.target.checked)
  // }
  //Dispatching the Api's
  useEffect(() => {
    dispatch(reduxServices.expenseForm.getEmpDepartmentsList())
    dispatch(reduxServices.expenseForm.getCurrenciesList())
    dispatch(reduxServices.expenseForm.getCategoriesList())
    dispatch(reduxServices.expenseForm.getPaymentsList())
    dispatch(reduxServices.expenseForm.getCountriesList())
  }, [dispatch])

  useEffect(() => {
    if (expenseCategory) {
      dispatch(reduxServices.expenseForm.getSubCategoriesList(expenseCategory))
      dispatch(reduxServices.expenseForm.editCategories(expenseCategory))
    }
  }, [dispatch, expenseCategory])

  const successToastMessage = (
    <OToast
      toastMessage="Vendor Details Added Successfully"
      toastColor="success"
    />
  )

  // const handleAddExpenseForm = () => {
  //   const expenseObject = {
  //     amount: Number(amount),
  //     categoryId: Number(expenseCategory),
  //     country,
  //     // creditCardDetails: {
  //     //   cardId: 18,
  //     //   cardName: 'sddf@@22',
  //     //   cardNumber: '54654654765777',
  //     //   createdBy: 'Pavani Paska',
  //     //   updatedBy: null,
  //     //   createdDate: '21/06/2023',
  //     //   updatedDate: null,
  //     // },
  //     creditCardDetails: creditCardResult,
  //     currencyId: currency,
  //     deptId: departmentList,
  //     description: descriptionInfo,
  //     expenditureDate,
  //     invoiceNumber,
  //     isReimbursable: isReimbursableExpense,
  //     paymentMode,
  //     project: projectAutoCompleteTarget,
  //     purpose: purposeDetails,
  //     subCategoryId: expenseSubCategory,
  //     toEmployee: employeeAutoCompleteTarget,
  //     vendor: vendorAutoCompleteTarget,
  //     voucherNumber,
  //   }
  //   const addExpenseFormResult = await dispatch(
  //     reduxServices.expenseForm.addExpensesList(expenseObject),
  //   )
  //   if (
  //     reduxServices.expenseForm.addExpensesList.fulfilled.match(
  //       addExpenseFormResult,
  //     )
  //   )
  //     dispatch(reduxServices.app.actions.addToast(successToastMessage))
  //   dispatch(reduxServices.expenseForm.getCreditCardsDetails())
  //   dispatch(reduxServices.expenseForm.getEmpDepartmentsList())
  //   dispatch(reduxServices.expenseForm.getCategoriesList())
  //   dispatch(reduxServices.expenseForm.getCountriesList())
  //   dispatch(reduxServices.expenseForm.getPaymentsList())
  //   dispatch(
  //     reduxServices.expenseForm.getExpensesList({
  //       categoryId: 0,
  //       country: '',
  //       dateSelection: '',
  //       departmentId: 0,
  //       endIndex: 20,
  //       from: '',
  //       multipleSearch: '',
  //       paymentMode: '',
  //       startIndex: 0,
  //       subCategoryId: 0,
  //       to: '',
  //     }),
  //   )
  // }

  useEffect(() => {
    if (
      expenseCategory &&
      expenseSubCategory &&
      departmentList &&
      purposeDetails &&
      expenditureDate &&
      currency &&
      amount
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [
    expenseCategory,
    expenseSubCategory,
    departmentList,
    purposeDetails,
    expenditureDate,
    currency,
    amount,
  ])

  const clearBtnHandler = () => {
    setEmployeeAutoCompleteTarget('')
    setExpenseCategory('')
    setExpenseSubCategory('')
    setProjectAutoCompleteTarget('')
    setDepartmentList('')
    setVendorAutoCompleteTarget('')
    setPurposeDetails('')
    setExpenditureDate('')
    setCountry('')
    setCurrency('')
    setPaymentMode('')
    setCreditCard(false)
    setChequeNumber('')
    setChequeDate('')
    setVoucherNumber('')
    setInvoiceNumber('')
    setAmount('')
    setIsReimbursableExpense(false)
    setDescriptionInfo('')
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Expense Form"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <Employee
        employeeAutoCompleteTarget={employeeAutoCompleteTarget}
        setEmployeeAutoCompleteTarget={setEmployeeAutoCompleteTarget}
      />
      <CategoriesList
        expenseCategory={expenseCategory}
        setExpenseCategory={setExpenseCategory}
        expenseSubCategory={expenseSubCategory}
        setExpenseSubCategory={setExpenseSubCategory}
      />
      <ProjectList
        projectAutoCompleteTarget={projectAutoCompleteTarget}
        setProjectAutoCompleteTarget={setProjectAutoCompleteTarget}
      />
      <Departments
        departmentList={departmentList}
        setDepartmentList={setDepartmentList}
      />
      <VendorList
        vendorAutoCompleteTarget={vendorAutoCompleteTarget}
        setVendorAutoCompleteTarget={setVendorAutoCompleteTarget}
      />
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Purpose:
          <span className={purposeDetails ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={9}>
          <CFormInput
            className="mb-1"
            data-testid="purposeDetails"
            type="text"
            id="purpose"
            size="sm"
            name="purposeDetails"
            autoComplete="off"
            placeholder="Purpose"
            value={purposeDetails}
            onChange={handledInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel className={formLabel}>
          Expenditure Date :
          <span className={expenditureDate ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <DatePicker
            id="expenditureDate"
            className="form-control form-control-sm sh-date-picker"
            showMonthDropdown
            showYearDropdown
            autoComplete="off"
            dropdownMode="select"
            dateFormat="dd/mm/yy"
            placeholderText="Expenditure Date"
            name="expenditureDate"
            maxDate={disableAfterDate}
            value={expenditureDate}
            onChange={(date: Date) => onHandleExpenditureDatePicker(date)}
          />
        </CCol>
      </CRow>
      <Dropdowns
        country={country}
        setCountry={setCountry}
        currency={currency}
        setCurrency={setCurrency}
      />
      {/* <PaymentList
        paymentMode={paymentMode}
        setPaymentMode={setPaymentMode}
        creditCardResult={creditCardResult}
        setCreditCardResult={setCreditCardResult}
        chequeNumber={chequeNumber}
        setChequeNumber={setChequeNumber}
        chequeDate={chequeDate}
        setChequeDate={setChequeDate}
      /> */}
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Voucher Number:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="voucherNumber"
            type="text"
            id="voucherNumber"
            size="sm"
            name="voucherNumber"
            autoComplete="off"
            placeholder="Voucher Number"
            value={voucherNumber}
            maxLength={30}
            onChange={handledInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Invoice Number:
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="invoiceNumber"
            type="text"
            id="invoiceNumber"
            size="sm"
            name="invoiceNumber"
            autoComplete="off"
            placeholder="Invoice Number"
            value={invoiceNumber}
            maxLength={30}
            onChange={handledInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Amount:
          <span className={amount ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            className="mb-1"
            data-testid="amount"
            type="text"
            id="amount"
            size="sm"
            name="amount"
            autoComplete="off"
            placeholder="Amount"
            value={amount}
            maxLength={20}
            onChange={handledInputChange}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Reimbursable Expense:
        </CFormLabel>
        <CCol sm={3} className="col-form-label">
          <CFormCheck
            className="mb-1"
            inline
            type="checkbox"
            name="isExpenseVendor"
            id="expenseVendor"
            onChange={(event) =>
              handleIsReimbursableExpense(event.target.checked)
            }
            checked={isReimbursableExpense}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        >
          Description:
        </CFormLabel>
        {showEditor ? (
          <CCol sm={9}>
            <CKEditor<{
              onChange: CKEditorEventHandler<'change'>
            }>
              initData={descriptionInfo}
              data-testid="descriptionInfo"
              config={ckeditorConfig}
              debug={true}
              onChange={({ editor }) => {
                handleDescription(editor.getData().trim())
              }}
            />
          </CCol>
        ) : (
          ''
        )}
      </CRow>
      <CRow>
        <CCol md={{ span: 6, offset: 3 }}>
          <CButton
            className="btn-ovh me-1"
            color="success"
            data-testid="add-btn"
            //onClick={handleAddExpenseForm}
            disabled={!isAddButtonEnabled}
          >
            Add
          </CButton>
          <CButton
            color="warning "
            className="btn-ovh"
            onClick={clearBtnHandler}
            data-testid="clear-btn"
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </OCard>
  )
}

export default ExpenseForm
