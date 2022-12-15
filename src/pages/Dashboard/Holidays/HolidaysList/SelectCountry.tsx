import { CButton, CCol, CFormLabel, CFormSelect } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { HolidaysListProps } from '../../../../types/Dashboard/Holidays/upcomingHolidaysTypes'

const SelectCountry = ({ selectedCountry }: HolidaysListProps): JSX.Element => {
  const countries = useTypedSelector(
    reduxServices.employeeHandbookSettings.selectors.employeeCountries,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToAddHoliday = userAccessToFeatures?.find(
    (feature) => feature.name === 'Holiday',
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (selectedCountry) {
      dispatch(
        reduxServices.holidays.getAllUpcomingHolidaysList(selectedCountry),
      )
    }
    if (selectedCountry === '') {
      dispatch(reduxServices.holidays.actions.clearHolidays())
    }
  }, [dispatch, selectedCountry])

  return (
    <>
      <CFormLabel className="col-sm-3 col-form-label text-end"></CFormLabel>
      <CCol sm={3}>
        <CFormSelect
          aria-label="country"
          size="sm"
          id="country"
          data-testid="country-form-select"
          name="country"
          value={selectedCountry}
          onChange={(e) =>
            dispatch(
              reduxServices.holidays.actions.setSelectedEmployeeCountry(
                e.target.value,
              ),
            )
          }
        >
          <option value={''}>Select Country</option>
          {countries?.map((country, index) => (
            <option
              key={index}
              value={country.name}
              data-testid="selectCountry-option"
            >
              {country.name}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol className="d-md-flex justify-content-md-end me-0 ps-0 pe-0">
        <Link to={`/dashboard`}>
          <CButton color="info" className="btn-ovh me-1 text-white">
            <i className="fa fa-arrow-left me-1"></i>Back
          </CButton>
        </Link>
        {userAccessToAddHoliday?.createaccess && (
          <Link to={`/addHoliday`}>
            <CButton color="info" className="btn-ovh text-white">
              <i className="fa fa-plus me-1"></i>Add
            </CButton>
          </Link>
        )}
      </CCol>
    </>
  )
}

export default SelectCountry
