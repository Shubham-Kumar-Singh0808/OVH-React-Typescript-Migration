import { CBadge, CFormLabel, CSpinner } from '@coreui/react-pro'

import React from 'react'
import { profileHistorySelectors } from '../../../reducers/MyProfile/ProfileHistory/profileHistorySlice'
import { useTypedSelector } from '../../../stateStore'

const ProfileHistoryTimeLine = (): JSX.Element => {
  const employeeProfileHistory = useTypedSelector(
    profileHistorySelectors.profileHistoryData,
  )
  if (employeeProfileHistory.length > 0) {
    console.log(employeeProfileHistory)
  }
  console.log(employeeProfileHistory)
  console.log(employeeProfileHistory.length)
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
        {employeeProfileHistory.map((curItem, id) => {
          return (
            <div key={id} className="sh-timeline-card">
              <div className="sh-timeline-timestamp">
                {curItem.modifiedDate}
              </div>
              <div className="sh-timeline-content">
                <div className="sh-timeline-header mb-4 clearfix">
                  <h4 className="sh-timeline-title">{curItem.modifiedBy} -</h4>
                  <span className="sh-timeline-status">
                    {curItem.persistType === 'UPDATED' ? (
                      <>
                        <CBadge className="rounded-pill" color="info">
                          Updated
                        </CBadge>
                      </>
                    ) : (
                      <></>
                    )}
                    {curItem.persistType === 'CREATED' ? (
                      <CBadge className="rounded-pill" color="success">
                        Created
                      </CBadge>
                    ) : (
                      <></>
                    )}
                  </span>
                </div>
                <div className="sh-timeline-body">
                  <p className="sh-timeline-item mb-1">
                    <CFormLabel className="col-form-label p-0">
                      {curItem.persistType === 'UPDATED' ? (
                        <>
                          {curItem.oldPersonName} to {curItem.personName}
                        </>
                      ) : (
                        <></>
                      )}
                      {curItem.persistType === 'CREATED' ? (
                        <>Person Name {curItem.personName}</>
                      ) : (
                        <></>
                      )}
                    </CFormLabel>
                  </p>
                </div>
              </div>
            </div>
          )
        })}
        {/* {employeeProfileHistory.length > 0 ? (
          <>
            {employeeProfileHistory?.map((curItem, index) => {
              curItem?.list.map((childItem, index) => {
                ;<CBadge className="rounded-pill" color="success">
                  {childItem?.baseLocation}
                </CBadge>
              })
            })}
          </>
        ) : (
          <>
            <CSpinner />
          </>
        )} */}
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
      </div>
    </>
  )
}

export default ProfileHistoryTimeLine
