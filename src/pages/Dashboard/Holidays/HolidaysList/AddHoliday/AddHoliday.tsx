import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { Link, useHistory } from 'react-router-dom'
import OCard from '../../../../../components/ReusableComponent/OCard'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { SaveHoliday } from '../../../../../types/Dashboard/Holidays/upcomingHolidaysTypes'
import { showIsRequired } from '../../../../../utils/helper'

const AddHoliday = (): JSX.Element => {
  const initialHolidayDetails = {} as SaveHoliday
  const [addHoliday, setAddHoliday] = useState(initialHolidayDetails)
  const [holidayDate, setHolidayDate] = useState<string>()
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)

  const dispatch = useAppDispatch()
  const history = useHistory()
  const commonFormatDate = 'L'
  const deviceLocale: string =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language

  const getCountries = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.employeeCountries,
  )

  useEffect(() => {
    dispatch(reduxServices.employeeHandbookSettings.getEmployeeCountries())
  }, [dispatch])

  const formLabelProps = {
    htmlFor: 'inputAddHoliday',
    className: 'col-form-label category-label',
  }

  useEffect(() => {
    if (addHoliday.name && addHoliday.country && holidayDate) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [addHoliday, holidayDate])
  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setAddHoliday((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  const handleClear = () => {
    setAddHoliday({
      name: '',
      country: '',
      date: '',
    })
    setHolidayDate('')
  }
  const getSuccessToastMessage = (
    <OToast toastMessage="Holiday added successfully" toastColor="success" />
  )
  const getWarningToastMessage = (
    <OToast
      toastMessage="Already holiday is added for this date"
      toastColor="danger"
    />
  )

  const handleAddHoliday = async () => {
    const prepareObject = {
      ...addHoliday,
      ...{ date: holidayDate as string },
    }
    const addHolidayResultAction = await dispatch(
      reduxServices.holidays.addHoliday(prepareObject),
    )

    if (
      reduxServices.holidays.addHoliday.fulfilled.match(addHolidayResultAction)
    ) {
      history.push('/holidaylist')
      dispatch(reduxServices.app.actions.addToast(getSuccessToastMessage))
    } else if (
      reduxServices.holidays.addHoliday.rejected.match(
        addHolidayResultAction,
      ) &&
      addHolidayResultAction.payload === 409
    ) {
      dispatch(reduxServices.app.actions.addToast(getWarningToastMessage))
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Holiday"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/holidaylist`}>
              <CButton color="info" className="btn-ovh me-1">
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Holiday Name:
              <span className={showIsRequired(addHoliday?.name)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="holiday-name"
                type="text"
                name="name"
                placeholder="Holiday Name"
                autoComplete="off"
                value={addHoliday.name}
                maxLength={50}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Holiday Date :
              <span className={showIsRequired(holidayDate as string)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <ReactDatePicker
                id="holiday-date"
                data-testid="holidayDateInput"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Holiday Date"
                name="holidayDate"
                value={
                  holidayDate
                    ? new Date(holidayDate).toLocaleDateString(deviceLocale, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                    : ''
                }
                onChange={(date: Date) =>
                  setHolidayDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Country:
              <span className={showIsRequired(addHoliday.country)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="country"
                size="sm"
                id="country"
                data-testid="country-form-select"
                name="country"
                value={addHoliday?.country}
                onChange={handleInputChange}
              >
                <option value={''}>Select Country</option>
                {getCountries.length > 0 &&
                  getCountries?.map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="add-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                onClick={handleAddHoliday}
                disabled={!isButtonEnabled}
              >
                Add
              </CButton>
              <CButton
                data-testid="clear-btn"
                color="warning "
                className="btn-ovh text-white"
                onClick={handleClear}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default AddHoliday
