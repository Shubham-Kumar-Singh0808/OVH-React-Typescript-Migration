import { CCardFooter, CCol, CImage, CLink, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const StarOfTheMonth = (): JSX.Element => {
  const achievements = useTypedSelector(
    reduxServices.employeeAchievements.selectors.achievements,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToAchieversList = userAccessToFeatures?.find(
    (feature) => feature.name === `Achiever's List`,
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

  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    fetch(
      'https://ovh2.raybiztech.com/achieverprofilepics/acheiver105720-Dec-2022%2012:37:34:IST.jpeg',
    )
      .then((response) => response.blob())
      .then((blob) => {
        setImageUrl(URL.createObjectURL(blob))
      })
  }, [])

  return (
    <>
      <CRow>
        <CCol sm={12}>
          <CRow className="media-body text-center">
            {achievements.starOfTheMonth &&
              achievements.starOfTheMonth?.map((starOfTheMonthAward, index) => {
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
          <CCol sm={3}>
            {imageUrl && <img src={imageUrl} alt="API Image" />}
          </CCol>
        </CCol>
        {userAccessToAchieversList?.viewaccess && (
          <>{starOfTheMonthFooterLink}</>
        )}
      </CRow>
    </>
  )
}

export default StarOfTheMonth
