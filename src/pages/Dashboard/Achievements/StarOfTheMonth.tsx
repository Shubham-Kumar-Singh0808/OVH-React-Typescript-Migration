import { CCardFooter, CCol, CImage, CLink, CRow } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const StarOfTheMonth = (): JSX.Element => {
  const achievements = useTypedSelector(
    reduxServices.employeeAchievements.selectors.achievements,
  )

  const starOfTheMonthFooterLink = (
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
            {achievements.starOfTheMonth?.map((starOfTheMonthAward, index) => {
              return (
                <CCol sm={3} key={index}>
                  <h6>
                    <span className="profile-avatar">
                      <CImage
                        src={starOfTheMonthAward.profilePicture}
                        className="employee-profile"
                      />
                    </span>
                  </h6>
                  <h6>{starOfTheMonthAward.employeeName}</h6>
                  <p>
                    {`${starOfTheMonthAward.startDate} to
                    ${starOfTheMonthAward.endDate}`}
                  </p>
                </CCol>
              )
            })}
          </CRow>
        </CCol>
        {starOfTheMonthFooterLink}
      </CRow>
    </>
  )
}

export default StarOfTheMonth
