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
import { Link, useHistory, useParams } from 'react-router-dom'
import OCard from '../../../../../components/ReusableComponent/OCard'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { EditHolidayDetails } from '../../../../../types/Dashboard/Holidays/upcomingHolidaysTypes'
import { showIsRequired } from '../../../../../utils/helper'

const EditHoliday = (): JSX.Element => {
  const editHolidayInformation = {} as EditHolidayDetails
  const [editHoliday, setEditHoliday] = useState(editHolidayInformation)
  const [holidayDate, setHolidayDate] = useState<string>()
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const { holidayId } = useParams<{ holidayId: string }>()
  const dispatch = useAppDispatch()
  const history = useHistory()

  const getHolidayCountries = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.employeeCountries,
  )
  const editHolidayDetails = useTypedSelector(
    reduxServices.holidays.selectors.holidayInfo,
  )

  useEffect(() => {
    dispatch(reduxServices.employeeHandbookSettings.getEmployeeCountries())
    dispatch(reduxServices.holidays.getHolidayInformation(Number(holidayId)))
  }, [dispatch])

  const formLabelProps = {
    htmlFor: 'inputEditHoliday',
    className: 'col-form-label holiday-label',
  }

  useEffect(() => {
    if (editHolidayDetails !== null) {
      setEditHoliday(editHolidayDetails)
      setHolidayDate(editHolidayDetails.date)
    }
  }, [editHolidayDetails])

  useEffect(() => {
    if (editHoliday.name && editHoliday.country && holidayDate) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [editHoliday, holidayDate])

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setEditHoliday((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  const getUpdateToastMessage = (
    <OToast toastMessage="Holiday updated successfully" toastColor="success" />
  )
  const alreadyExistToastMessage = (
    <OToast
      toastMessage="Already holiday is added for this date"
      toastColor="danger"
    />
  )

  const handleUpdateHoliday = async () => {
    const prepareObject = {
      ...editHoliday,
      ...{ date: holidayDate as string },
    }
    const updateHolidayResultAction = await dispatch(
      reduxServices.holidays.updateHoliday(prepareObject),
    )

    if (
      reduxServices.holidays.updateHoliday.fulfilled.match(
        updateHolidayResultAction,
      )
    ) {
      history.push('/holidaylist')
      dispatch(reduxServices.app.actions.addToast(getUpdateToastMessage))
    } else if (
      reduxServices.holidays.updateHoliday.rejected.match(
        updateHolidayResultAction,
      ) &&
      updateHolidayResultAction.payload === 409
    ) {
      dispatch(reduxServices.app.actions.addToast(alreadyExistToastMessage))
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Holiday"
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
              <span className={showIsRequired(editHoliday?.name)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="holiday-name"
                autoComplete="off"
                placeholder="Holiday Name"
                type="text"
                name="name"
                value={editHoliday.name}
                maxLength={50}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Holiday Date :
              <span className={showIsRequired(editHoliday.date)}>*</span>
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
                value={holidayDate}
                onChange={(date: Date) =>
                  setHolidayDate(moment(date).format('DD/MM/YYYY'))
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
              <span className={showIsRequired(editHoliday.country)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="country"
                size="sm"
                id="country"
                data-testid="select-country"
                name="country"
                value={editHoliday?.country}
                onChange={handleInputChange}
              >
                <option value={''}>Select Country</option>
                {getHolidayCountries.length > 0 &&
                  getHolidayCountries?.map((country, index) => (
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
                data-testid="update-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                onClick={handleUpdateHoliday}
                disabled={!isButtonEnabled}
              >
                Update
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default EditHoliday
