import { CCardBody, CCardHeader } from '@coreui/react-pro'
import React from 'react'
import ServiceAwards from './ServiceAwards'
import SpecialAward from './SpecialAward'
import StarOfTheMonth from './StarOfTheMonth'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const Achievements = (): JSX.Element => {
  const achievements = useTypedSelector(
    reduxServices.employeeAchievements.selectors.achievements,
  )
  return (
    <>
      {achievements?.starOfTheMonth?.length && (
        <>
          <CCardHeader>
            <h4 className="h4">Star of the Month</h4>
          </CCardHeader>
          <CCardBody className="ps-0 pe-0 mt-4">
            <StarOfTheMonth />
          </CCardBody>
        </>
      )}
      {achievements?.specialAwards?.length && (
        <>
          <CCardHeader>
            <h4 className="h4">Special Award</h4>
          </CCardHeader>
          <CCardBody className="ps-0 pe-0 mt-4">
            <SpecialAward />
          </CCardBody>
        </>
      )}
      {achievements?.serviceAwards?.length && (
        <>
          <CCardHeader>
            <h4 className="h4">Service Awards</h4>
          </CCardHeader>
          <CCardBody className="ps-0 pe-0 mt-4">
            <ServiceAwards />
          </CCardBody>
        </>
      )}
    </>
  )
}

export default Achievements
