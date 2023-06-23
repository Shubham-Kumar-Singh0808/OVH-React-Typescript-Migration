import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Autocomplete from 'react-autocomplete'
import {
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormSelect,
  CFormCheck,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import {
  AddExpenseFormResponse,
  AuthorizedEmployee,
  CreditCardListResponse,
  EmployeeList,
  GetAutoCompleteList,
  GetOnSelect,
  ProjectsListResponse,
  VendorListResponse,
  expenseFormFields,
} from '../../../types/ExpenseManagement/ExpenseForm/expenseFormTypes'
import OAutoComplete from '../../../components/ReusableComponent/OAutoComplete'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { formLabelProps } from '../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import { dateFormat } from '../../../constant/DateFormat'

const ExpenseForm = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const formLabel = 'col-sm-3 col-form-label text-end'

  //Expense form Selectors
  const allEmployees = useTypedSelector(
    reduxServices.expenseForm.selectors.employeesList,
  )
  const categories = useTypedSelector(
    reduxServices.expenseForm.selectors.categoryList,
  )
  const subCategories = useTypedSelector(
    reduxServices.expenseForm.selectors.subCategoryList,
  )
  const projectList = useTypedSelector(
    reduxServices.expenseForm.selectors.allProjectsList,
  )
  const allDepartments = useTypedSelector(
    reduxServices.expenseForm.selectors.departmentList,
  )
  const allVendors = useTypedSelector(
    reduxServices.expenseForm.selectors.allVendorsList,
  )
  const countriesList = useTypedSelector(
    reduxServices.expenseForm.selectors.countriesList,
  )
  const currenciesList = useTypedSelector(
    reduxServices.expenseForm.selectors.currenciesList,
  )
  const paymentsList = useTypedSelector(
    reduxServices.expenseForm.selectors.paymentsList,
  )

  const creditCards = useTypedSelector(
    reduxServices.expenseForm.selectors.creditCards,
  )

  const initResetFields = {
    employee: false,
    projects: false,
    date: false,
  } as expenseFormFields

  const [projectName, setProjectName] = useState<string>('')
  const [resetFields, setResetField] = useState(initResetFields)
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [employeeAutoCompleteTarget, setEmployeeAutoCompleteTarget] =
    useState<string>()
  const [selectEmployee, setSelectEmployee] = useState<AuthorizedEmployee>()
  const [expenseCategory, setExpenseCategory] = useState<string>()
  const [expenseSubCategory, setExpenseSubCategory] = useState<string>()
  const [projectAutoCompleteTarget, setProjectAutoCompleteTarget] = useState('')
  const [selectProject, setSelectProject] = useState<ProjectsListResponse>()
  const [isProjectNameExist, setIsProjectNameExist] = useState('')
  const [departmentList, setDepartmentList] = useState<string>()
  const [selectVendor, setSelectVendor] = useState<VendorListResponse>()
  const [vendorAutoCompleteTarget, setVendorAutoCompleteTarget] =
    useState<string>()
  const [purposeDetails, setPurposeDetails] = useState<string>()
  const [expenditureDate, setExpenditureDate] = useState<string>()
  const [country, setCountry] = useState<string>()
  const [currency, setCurrency] = useState<string>()
  const [paymentMode, setPaymentMode] = useState<string>()
  const [creditCard, setCreditCard] = useState<boolean>(false)
  const [chequeNumber, setChequeNumber] = useState<string>()
  const [chequeDate, setChequeDate] = useState<string>()
  const [voucherNumber, setVoucherNumber] = useState<string>()
  const [invoiceNumber, setInvoiceNumber] = useState<string>()
  const [amount, setAmount] = useState<string>()
  const [isReimbursableExpense, setIsReimbursableExpense] =
    useState<boolean>(false)
  const [descriptionInfo, setDescriptionInfo] = useState('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [isClearBtnEnable, setClearBtn] = useState(false)
  const [isEnable, setIsEnable] = useState(false)

  // const employeesList = {} as EmployeeList
  // const projectsList = {} as ProjectsListResponse
  // const vendorsList = {} as VendorListResponse
  // const creditCardsList = {} as CreditCardListResponse

  // const initExpenseDetails = {
  //   formId: 0,
  //   expenseNumber: '',
  //   toEmployee: employeesList,
  //   categoryId: 0,
  //   categoryName: '',
  //   subCategoryId: 0,
  //   subCategoryName: '',
  //   deptId: 0,
  //   deptName: '',
  //   project: projectsList,
  //   vendor: vendorsList,
  //   purpose: '',
  //   expenditureDate: '',
  //   country: '',
  //   currencyId: 0,
  //   currencyType: '',
  //   paymentMode: '',
  //   creditCardDetails: creditCardsList,
  //   chequeNumber: '',
  //   chequeDate: '',
  //   voucherNumber: '',
  //   amount: '',
  //   description: '',
  //   isReimbursable: false,
  //   empId: 0,
  //   saltKey: null,
  //   paymentStatus: null,
  //   remainingAmount: null,
  //   amountInINR: '',
  //   createdBy: '',
  //   createdDate: '',
  //   updatedBy: '',
  //   updatedDate: '',
  //   invoiceNumber: '',
  //   //   isAutogenerated: '',
  // } as AddExpenseFormResponse

  // Employee Implementation
  const onEmployeeFocusOut = () => {
    const selectedEmployee = allEmployees.find(
      (value) => value.fullName === employeeAutoCompleteTarget,
    )
    setSelectEmployee(selectedEmployee)
  }

  const autoCompleteOnEmpChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmployeeAutoCompleteTarget(e.target.value)
    setSelectEmployee(undefined)
  }

  const onHandleSelectEmployeeName = (
    //e: React.ChangeEvent<HTMLSelectElement>,
    employeeName: string,
  ) => {
    setEmployeeAutoCompleteTarget(employeeName)
    setIsEnable(true)
  }

  useEffect(() => {
    if (employeeAutoCompleteTarget) {
      dispatch(
        reduxServices.expenseForm.getEmployeesList(employeeAutoCompleteTarget),
      )
    }
  }, [employeeAutoCompleteTarget])

  useEffect(() => {
    dispatch(reduxServices.expenseForm.getCreditCardsDetails())
  }, [dispatch])

  // Project Implementation
  const projectNameExists = (projects: string) => {
    return projectList?.find((projectsList) => {
      return projectsList.projectName.toLowerCase() === projects.toLowerCase()
    })
  }

  const onFocusOut = () => {
    const selectedProject = projectList.find(
      (value) => value.projectName === projectAutoCompleteTarget,
    )
    setSelectProject(selectedProject)
  }

  const autoCompleteOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProjectAutoCompleteTarget(e.target.value)
    setSelectProject(undefined)
  }

  const onHandleSelectProjectName = (
    //e: React.ChangeEvent<HTMLSelectElement>,
    projectName: string,
  ) => {
    setProjectAutoCompleteTarget(projectName)
    setIsEnable(true)
  }
  useEffect(() => {
    if (projectAutoCompleteTarget) {
      dispatch(
        reduxServices.expenseForm.getProjectsList(projectAutoCompleteTarget),
      )
    }
  }, [projectAutoCompleteTarget])

  const autoCompleteOnVendorChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setVendorAutoCompleteTarget(e.target.value)
    setSelectVendor(undefined)
  }

  const onHandleSelectVendorName = (
    //e: React.ChangeEvent<HTMLSelectElement>,
    vendorName: string,
  ) => {
    setVendorAutoCompleteTarget(vendorName)
    setIsEnable(true)
  }
  const onVendorFocusOut = () => {
    const selectedVendor = allVendors.find(
      (value) => value.vendorName === vendorAutoCompleteTarget,
    )
    setSelectVendor(selectedVendor)
  }
  useEffect(() => {
    if (vendorAutoCompleteTarget) {
      dispatch(
        reduxServices.expenseForm.getVendorsList(vendorAutoCompleteTarget),
      )
    }
  }, [vendorAutoCompleteTarget])

  const disableAfterDate = new Date()
  disableAfterDate.setFullYear(disableAfterDate.getFullYear() + 1)

  const onHandleExpenditureDatePicker = (value: Date) => {
    setExpenditureDate(moment(value).format(dateFormat))
    setChequeDate(moment(value).format(dateFormat))
  }

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

  const handleCreditCard = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreditCard(event.target.checked)
  }
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
  console.log(paymentMode)
  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Expense Form"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CRow className="mt-2 mb-2">
        <CFormLabel {...formLabelProps} className={formLabel}>
          To Employee:
        </CFormLabel>
        <CCol sm={3}>
          <Autocomplete
            inputProps={{
              className: 'form-control form-control-sm2',
              placeholder: 'Employee Name',
              onBlur: onEmployeeFocusOut,
            }}
            getItemValue={(item) => item.fullName}
            items={allEmployees ? allEmployees : []}
            wrapperStyle={{ position: 'relative' }}
            renderMenu={(children) => (
              <div
                className={
                  employeeAutoCompleteTarget &&
                  employeeAutoCompleteTarget.length > 0
                    ? 'autocomplete-empdropdown-wrap'
                    : 'autocomplete-empdropdown-wrap hide'
                }
              >
                {children}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                data-testid="employee-option"
                className={
                  isHighlighted
                    ? 'autocomplete-empdropdown-item active'
                    : 'autocomplete-empdropdown-item '
                }
                key={item.id}
              >
                {item.fullName}
              </div>
            )}
            value={employeeAutoCompleteTarget}
            shouldItemRender={(item, empValue) =>
              item?.fullName?.toLowerCase().indexOf(empValue.toLowerCase()) > -1
            }
            onChange={(e) => autoCompleteOnEmpChangeHandler(e)}
            onSelect={(selectedVal) => onHandleSelectEmployeeName(selectedVal)}
          />
          {/* {isProjectNameExist && ()} */}
          <span
            className={isEnable ? TextWhite : TextDanger}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '0.25rem',
            }}
          >
            Please select valid employee
          </span>
        </CCol>
        <CCol></CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
          data-testid="categoryLabel"
        >
          Category:
          <span className={expenseCategory ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            className="mb-1"
            data-testid="categoryName"
            id="categoryName"
            size="sm"
            aria-label="Category"
            name="expenseCategory"
            value={expenseCategory}
            onChange={(e) => {
              setExpenseCategory(e.target.value)
            }}
          >
            <option value={''}>Select Category</option>
            {categories
              .slice()
              .sort((category1, category2) =>
                category1.categoryName.localeCompare(category2.categoryName),
              )
              ?.map((categoryItems, categories) => (
                <option key={categories} value={categoryItems.id}>
                  {categoryItems.categoryName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
          data-testid="subCategoryLabel"
        >
          Sub-Category:
          <span className={expenseSubCategory ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            className="mb-1"
            data-testid="expenseSubCategory"
            id="expenseSubCategory"
            size="sm"
            aria-label="Category"
            name="expenseSubCategory"
            onChange={(e) => {
              setExpenseSubCategory(e.target.value)
            }}
            value={expenseSubCategory}
          >
            <option value={''}>Select Sub-Category</option>
            {subCategories
              .slice()
              .sort((subCategory1, subCategory2) =>
                subCategory1.subCategoryName.localeCompare(
                  subCategory2.subCategoryName,
                ),
              )
              ?.map((subCategoryItems, subCategory) => (
                <option key={subCategory} value={subCategoryItems.id}>
                  {subCategoryItems.subCategoryName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel {...formLabelProps} className={formLabel}>
          Project Name:
        </CFormLabel>
        <CCol sm={3}>
          <Autocomplete
            inputProps={{
              className: 'form-control form-control-sm',
              placeholder: 'Project Name',
              onBlur: onFocusOut,
            }}
            getItemValue={(item) => item.projectName}
            items={projectList ? projectList : []}
            wrapperStyle={{ position: 'relative' }}
            renderMenu={(children) => (
              <div
                className={
                  projectAutoCompleteTarget &&
                  projectAutoCompleteTarget.length > 0
                    ? 'autocomplete-dropdown-wrap'
                    : 'autocomplete-dropdown-wrap hide'
                }
              >
                {children}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                data-testid="project-option"
                className={
                  isHighlighted
                    ? 'autocomplete-dropdown-item active'
                    : 'autocomplete-dropdown-item '
                }
                key={item.id}
              >
                {item.projectName}
              </div>
            )}
            value={projectAutoCompleteTarget}
            shouldItemRender={(item, itemValue) =>
              item?.projectName
                ?.toLowerCase()
                .indexOf(itemValue.toLowerCase()) > -1
            }
            onChange={(e) => autoCompleteOnChangeHandler(e)}
            onSelect={(selectedVal) => onHandleSelectProjectName(selectedVal)}
          />
          {/* {isProjectNameExist && ()} */}
          <span
            className={isEnable ? TextWhite : TextDanger}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '0.25rem',
            }}
          >
            Please select valid project
          </span>
        </CCol>
        <CCol></CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
          data-testid="departmentLabel"
        >
          Department:
          <span className={departmentList ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            className="mb-1"
            data-testid="departmentList"
            id="departmentList"
            size="sm"
            aria-label="Department"
            name="departmentList"
            onChange={(e) => {
              setDepartmentList(e.target.value)
            }}
            value={departmentList}
          >
            <option value={''}>Select Department</option>
            {allDepartments
              .slice()
              .sort((department1, department2) =>
                department1.departmentName.localeCompare(
                  department2.departmentName,
                ),
              )
              ?.map((departmentItems, department) => (
                <option key={department} value={departmentItems.departmentId}>
                  {departmentItems.departmentName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel {...formLabelProps} className={formLabel}>
          Vendor:
        </CFormLabel>
        <CCol sm={3}>
          <Autocomplete
            inputProps={{
              className: 'form-control form-control-sm',
              placeholder: 'Vendor Name',
              onBlur: onVendorFocusOut,
            }}
            getItemValue={(item) => item.vendorName}
            items={allVendors ? allVendors : []}
            wrapperStyle={{ position: 'relative' }}
            renderMenu={(children) => (
              <div
                className={
                  vendorAutoCompleteTarget &&
                  vendorAutoCompleteTarget.length > 0
                    ? 'autocomplete-dropdown-wrap'
                    : 'autocomplete-dropdown-wrap hide'
                }
              >
                {children}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                data-testid="vendor-option"
                className={
                  isHighlighted
                    ? 'autocomplete-dropdown-item active'
                    : 'autocomplete-dropdown-item '
                }
                key={item.id}
              >
                {item.vendorName}
              </div>
            )}
            value={vendorAutoCompleteTarget}
            shouldItemRender={(item, vendorValue) =>
              item?.vendorName
                ?.toLowerCase()
                .indexOf(vendorValue.toLowerCase()) > -1
            }
            onChange={(e) => autoCompleteOnVendorChangeHandler(e)}
            onSelect={(selectedVal) => onHandleSelectVendorName(selectedVal)}
          />
          {/* {isProjectNameExist && ()} */}
          <span
            className={isEnable ? TextWhite : TextDanger}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '0.25rem',
            }}
          >
            Please select valid vendor
          </span>
        </CCol>
        <CCol></CCol>
      </CRow>
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
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
          data-testid="countryLabel"
        >
          Country:
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            className="mb-1"
            data-testid="country"
            id="country"
            size="sm"
            aria-label="Country"
            name="country"
            onChange={(e) => {
              setCountry(e.target.value)
            }}
            value={country}
          >
            <option value={''}>Select Country</option>
            {countriesList
              .slice()
              .sort((country1, country2) =>
                country1.name.localeCompare(country2.name),
              )
              ?.map((countryItems, countries) => (
                <option key={countries} value={countryItems.id}>
                  {countryItems.name}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
          data-testid="currencyLabel"
        >
          Currency:
          <span className={currency ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            className="mb-1"
            data-testid="currency"
            id="currency"
            size="sm"
            aria-label="Category"
            name="currency"
            onChange={(e) => {
              setCurrency(e.target.value)
            }}
            value={currency}
          >
            <option value={''}>Select Currency</option>
            {currenciesList
              .slice()
              .sort((currencies1, currencies2) =>
                currencies1.type.localeCompare(currencies2.type),
              )
              ?.map((categoryNames, index) => (
                <option key={index} value={categoryNames.id}>
                  {categoryNames.type}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
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
            onChange={(e) => {
              setPaymentMode(e.target.value)
            }}
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

      {paymentMode === '3' ? (
        <>
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
            data-testid="creditCardLabel"
          >
            Credit Card List:
          </CFormLabel>
          {creditCards.map((item, index) => {
            return (
              <>
                <CFormCheck
                  key={index}
                  type="radio"
                  name="creditCard"
                  value={item.cardName}
                  id="creditCardActive"
                  onChange={handleCreditCard}
                  inline
                />

                <span>
                  <b>Card Name :</b> {item.cardName}
                </span>
              </>
            )
          })}
        </>
      ) : (
        ''
      )}

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
    </OCard>
  )
}

export default ExpenseForm
