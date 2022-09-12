import { CCol, CImage, CRow } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const ServiceAwards = (): JSX.Element => {
  const achievements = useTypedSelector(
    reduxServices.employeeAchievements.selectors.achievements,
  )

  return (
    <>
      <CRow>
        <CCol sm={12}>
          <CRow className="media-body text-center">
            {achievements.serviceAwards?.map((award, index) => {
              return (
                <CCol sm={3} key={index}>
                  <h6>
                    <span className="profile-avatar">
                      <CImage
                        src={award.profilePicture}
                        className="employee-profile"
                      />
                    </span>
                  </h6>
                  <h6>{award.employeeName}</h6>
                  <h6>
                    {award.timePeriod}
                    <span>Years</span>
                  </h6>
                </CCol>
              )
            })}
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default ServiceAwards
