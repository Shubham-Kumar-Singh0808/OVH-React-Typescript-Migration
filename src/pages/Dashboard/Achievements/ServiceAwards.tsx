import { CCardFooter, CCol, CImage, CLink, CRow } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const ServiceAwards = (): JSX.Element => {
  const achievements = useTypedSelector(
    reduxServices.employeeAchievements.selectors.achievements,
  )

  const serviceAwardFooterLink = (
    <CCardFooter>
      <CLink
        className="font-weight-bold font-xs float-end"
        href="/achievementList"
        rel="noopener norefferer"
        target="_self"
      >
        More
        {''} <i className="fa fa-angle-double-right fa-lg"></i>
      </CLink>
    </CCardFooter>
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
                  <p>
                    {award.timePeriod}
                    <span>Years</span>
                  </p>
                </CCol>
              )
            })}
          </CRow>
        </CCol>
        {serviceAwardFooterLink}
      </CRow>
    </>
  )
}

export default ServiceAwards
