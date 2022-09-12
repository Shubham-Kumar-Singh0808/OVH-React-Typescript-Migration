import { CCol, CImage, CRow } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const StarOfTheMonth = (): JSX.Element => {
  const achievements = useTypedSelector(
    reduxServices.employeeAchievements.selectors.achievements,
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
                  <h6>
                    {starOfTheMonthAward.startDate}to
                    {starOfTheMonthAward.endDate}
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

export default StarOfTheMonth
