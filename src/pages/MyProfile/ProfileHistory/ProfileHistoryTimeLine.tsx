import { CBadge, CFormLabel, CSpinner } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import {
  profileHistorySelectors,
  profileHistoryThunk,
} from '../../../reducers/MyProfile/ProfileHistory/profileHistorySlice'

import { ProfileHistoryState } from '../../../types/MyProfile/ProfileHistory/profileHistoryTypes'
import { authenticationSelectors } from '../../../reducers/Login/authenticationSlice'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../stateStore'

const ProfileHistoryTimeLine = (): JSX.Element => {
  const employeeProfileHistory = useTypedSelector(
    profileHistorySelectors.profileHistoryData,
  )
  console.log(employeeProfileHistory)

  // const employeeProfileHistory = useTypedSelector(
  //   profileHistorySelectors.profileHistoryData,
  // )
  // console.log(employeeProfileHistory)
  // if (employeeProfileHistory.length === 0) {
  //   console.log(`${employeeProfileHistory.length} Unidened hai`)
  // } else {
  //   console.log('Unidened nai hai')
  // }
  return (
    <>
      <div className="sh-timeline-container">
        {employeeProfileHistory.length ? (
          <>
            {employeeProfileHistory?.map((curItem, index) => {
              curItem.list.map((childItem, index) => {
                ;<CBadge className="rounded-pill" color="success">
                  {childItem.baseLocation}
                </CBadge>
              })
            })}
          </>
        ) : (
          <>
            <CSpinner />
          </>
        )}
        {/* {employeeProfileHistory &&
          employeeProfileHistory?.map((curItem, index) =>
            curItem.list.length ? (
              curItem.list?.map((childItem, index) => {
                ;<CBadge className="rounded-pill" color="success">
                  {childItem.baseLocation}
                </CBadge>
              })
            ) : (
              <>No data</>
            ),
          )} */}
        {/* <div className="sh-timeline-card">
          <div className="sh-timeline-timestamp">09-Apr-2022 10:16:48 AM</div>
          <div className="sh-timeline-content">
            <div className="sh-timeline-header mb-4 clearfix">
              <h4 className="sh-timeline-title">Basheer -</h4>
              <span className="sh-timeline-status">
                <CBadge className="rounded-pill" color="success">
                  curItem.persistType
                </CBadge>
              </span>
            </div>
            <div className="sh-timeline-body">
              <p className="sh-timeline-item mb-1">
                <CFormLabel className="col-form-label p-0">
                  Person Name
                </CFormLabel>
                Basheer
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default ProfileHistoryTimeLine
