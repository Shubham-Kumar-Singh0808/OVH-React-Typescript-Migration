import { CCol, CImage, CRow } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const ServiceAwards = (): JSX.Element => {
  const serviceAwards = useTypedSelector(
    reduxServices.serviceAwards.selectors.achievements,
  )

  console.log(serviceAwards.employeeServiceAwards)
  return (
    <>
      <CRow>
        <CCol sm={12}>
          <CRow>
            {/* {
              serviceAwards?.map((award, index) => {
                return (
                  <CCol sm={3} key={index}>
                    <CImage src={award.thumbPicture} className="employee-thumb" />
                    <p>{award.employeeName}</p>
                  </CCol>
                )
              })} */}
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default ServiceAwards
