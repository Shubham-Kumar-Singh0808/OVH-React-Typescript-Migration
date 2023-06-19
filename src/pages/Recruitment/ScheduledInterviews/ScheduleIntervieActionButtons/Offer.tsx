import { CButton } from '@coreui/react-pro'
import React from 'react'

const Offer = (): JSX.Element => {
  return (
    <>
      <CButton
        ng-show="(myservice.Roles | filter:{name:'candidateOffer'}:true)[0].viewaccess"
        ng-click="updateInterviewStatusPopup(interviewTimelineDetailsList.personId, 'OFFERED')"
        type="submit"
        className="btn btn-success btn-labeled fa fa-check fa-lg"
      >
        Offer
      </CButton>
    </>
  )
}

export default Offer
