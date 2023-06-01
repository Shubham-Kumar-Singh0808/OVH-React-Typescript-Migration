import { CCardFooter, CCol, CImage, CLink, CRow } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { baseImageExtension } from '../../Achievements/AchievementConstants'

const ServiceAwards = (): JSX.Element => {
  const achievements = useTypedSelector(
    reduxServices.employeeAchievements.selectors.achievements,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToAchieversList = userAccessToFeatures?.find(
    (feature) => feature.name === `Achiever's List`,
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
              const imageUrl = award.profilePicture
              const baseUrl = baseImageExtension
              const url = new URL(imageUrl, baseUrl)
              const finalImageUrl = url.href
              return (
                <CCol sm={3} key={index}>
                  <h6>
                    <span className="profile-avatar">
                      <CImage
                        src={finalImageUrl}
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
        {userAccessToAchieversList?.viewaccess && <>{serviceAwardFooterLink}</>}
      </CRow>
    </>
  )
}

export default ServiceAwards
