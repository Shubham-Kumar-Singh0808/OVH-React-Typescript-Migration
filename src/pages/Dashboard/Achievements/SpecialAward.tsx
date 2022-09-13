import { CCardFooter, CCol, CImage, CLink, CRow } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const SpecialAward = (): JSX.Element => {
  const achievements = useTypedSelector(
    reduxServices.employeeAchievements.selectors.achievements,
  )

  const specialAwardFooterLink = (
    <CCardFooter>
      <CLink
        className="font-weight-bold font-xs float-end"
        href="/achievementList"
        rel="noopener norefferer"
        target="_self"
      >
        View more
      </CLink>
    </CCardFooter>
  )

  return (
    <>
      <CRow>
        <CCol sm={12}>
          <CRow className="media-body text-center">
            {achievements.specialAwards?.map((specialAward, index) => {
              return (
                <CCol sm={3} key={index}>
                  <h6>
                    <span className="profile-avatar">
                      <CImage
                        src={specialAward.profilePicture}
                        className="employee-profile"
                      />
                    </span>
                  </h6>
                  <h6>{specialAward.employeeName}</h6>
                  <p>{specialAward.startDate}</p>
                </CCol>
              )
            })}
          </CRow>
        </CCol>
        {specialAwardFooterLink}
      </CRow>
    </>
  )
}

export default SpecialAward
