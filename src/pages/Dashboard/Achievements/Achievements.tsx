import { CCardBody, CCardHeader } from '@coreui/react-pro'
import React from 'react'
import ServiceAwards from './ServiceAwards'
import SpecialAward from './SpecialAward'
import StarOfTheMonth from './StarOfTheMonth'

const Achievements = (): JSX.Element => {
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Star of the Month</h4>
      </CCardHeader>
      <CCardBody className="ps-0 pe-0 mt-4">
        <StarOfTheMonth />
      </CCardBody>
      <CCardHeader>
        <h4 className="h4">Special Award</h4>
      </CCardHeader>
      <CCardBody className="ps-0 pe-0 mt-4">
        <SpecialAward />
      </CCardBody>
      <CCardHeader>
        <h4 className="h4">Service Awards</h4>
      </CCardHeader>
      <CCardBody className="ps-0 pe-0 mt-4">
        <ServiceAwards />
      </CCardBody>
    </>
  )
}

export default Achievements
