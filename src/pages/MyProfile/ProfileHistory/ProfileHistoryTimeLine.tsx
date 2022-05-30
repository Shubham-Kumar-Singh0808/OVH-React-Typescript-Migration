import { CBadge, CFormLabel, CSpinner } from '@coreui/react-pro'

import React from 'react'
import { profileHistorySelectors } from '../../../reducers/MyProfile/ProfileHistory/profileHistorySlice'
import { useTypedSelector } from '../../../stateStore'

interface HistoryValue {
  [key: string]: string | number | boolean
}

const ProfileHistoryTimeLine = (): JSX.Element => {
  const employeeProfileHistory = useTypedSelector(
    profileHistorySelectors.profileHistoryData,
  )
  const historyFields = ['personName', 'contactNumber']
  return (
    <>
      <div className="sh-timeline-container">
        {employeeProfileHistory.map((curItem, id) => {
          const historyValue = [] as HistoryValue[]
          // let historyValue
          Object.entries(curItem).map(([key, value]) => {
            if (value) {
              // const myKey = key
              historyValue.push({ [key]: value })
              // historyValue = { [key]: value }

              console.log(historyValue)
              // console.log(myKey)
            }
            // console.log(`${key}: ${value}`)
          })

          return (
            <div key={id} className="sh-timeline-card">
              <div className="sh-timeline-timestamp">
                {curItem.modifiedDate}
              </div>
              <div className="sh-timeline-content">
                <div className="sh-timeline-header mb-4 clearfix">
                  <h4 className="sh-timeline-title">{curItem.modifiedBy} -</h4>
                  <span className="sh-timeline-status">
                    {historyValue?.map((item, idx) => (
                      <p key={idx}>{item[idx]}</p>
                    ))}
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
                    {curItem.persistType === 'UPDATED' ? (
                      <>
                        {curItem.personName ? (
                          <>
                            <CFormLabel className="col-form-label p-0">
                              Person Name
                            </CFormLabel>
                            Changed from {curItem.oldPersonName} to
                            {curItem.personName}
                          </>
                        ) : (
                          <></>
                        )}
                        {curItem.contactNumber ? (
                          <>
                            <CFormLabel className="col-form-label p-0">
                              contactNumber
                            </CFormLabel>
                            Changed from {curItem.oldContactNumber} to
                            {curItem.contactNumber}
                          </>
                        ) : (
                          <></>
                        )}
                        {curItem.currentLocation ? (
                          <>
                            <CFormLabel className="col-form-label p-0">
                              Current Location
                            </CFormLabel>
                            Changed from {curItem.oldCurrentLocation} to
                            {curItem.currentLocation}
                          </>
                        ) : (
                          <></>
                        )}
                        {curItem.gender ? (
                          <>
                            <CFormLabel className="col-form-label p-0">
                              Gender
                            </CFormLabel>
                            Changed from {curItem.oldgender} to
                            {curItem.gender}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    {curItem.persistType === 'CREATED' ? (
                      <>
                        {curItem.personName ? (
                          <>
                            <CFormLabel className="col-form-label p-0">
                              Person Name
                            </CFormLabel>
                            {curItem.personName
                              ?.replace(/\b(\w)/g, (x) => x.toUpperCase())
                              .replace(/([a-z])([A-Z])/g, '$1 $2')}
                          </>
                        ) : (
                          <></>
                        )}
                        {/* <CFormLabel className="col-form-label p-0">
                          Person Name
                        </CFormLabel>
                        <span>
                          {curItem.personName
                            ?.replace(/\b(\w)/g, (x) => x.toUpperCase())
                            .replace(/([a-z])([A-Z])/g, '$1 $2')}
                        </span> */}
                      </>
                    ) : (
                      <></>
                    )}
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
