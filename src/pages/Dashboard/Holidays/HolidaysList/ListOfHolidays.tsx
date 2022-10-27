import React, { useEffect, useState } from 'react'
import { CCol, CRow } from '@coreui/react-pro'
import HolidaysListTable from './HolidaysListTable'
import SelectCountry from './SelectCountry'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const ListOfHolidays = (): JSX.Element => {
  const loggedInEmployee = useTypedSelector(
    reduxServices.generalInformation.selectors.generalInformation,
  )
  const employeeCountry = loggedInEmployee.country
  const [selectedCountry, setSelectedCountry] = useState<string>('')

  const dispatch = useAppDispatch()

  useEffect(() => {
    setSelectedCountry(employeeCountry as string)
    dispatch(reduxServices.employeeHandbookSettings.getEmployeeCountries())
    dispatch(
      reduxServices.generalInformation.getEmployeeGeneralInformation(
        selectedCountry,
      ),
    )
  }, [dispatch, employeeCountry])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="List of Holidays"
        CFooterClassName="d-none"
      >
        <>
          <CRow className="mb-4">
            <SelectCountry
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </CRow>
          <CRow>
            <CCol xs={12} className="mt-4 mb-4 ps-0 pe-0">
              <HolidaysListTable
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
            </CCol>
          </CRow>
        </>
      </OCard>
    </>
  )
}

export default ListOfHolidays
