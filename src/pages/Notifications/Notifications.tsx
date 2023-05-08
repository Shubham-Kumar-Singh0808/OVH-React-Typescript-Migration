import React, { useEffect } from 'react'
import { CRow, CTableDataCell, CTableRow } from '@coreui/react-pro'
import OCard from '../../components/ReusableComponent/OCard'
import { reduxServices } from '../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../stateStore'

const Notifications = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const notificationAlerts = useTypedSelector(
    reduxServices.notification.selectors.notificationAlerts,
  )

  useEffect(() => {
    dispatch(
      reduxServices.notification.getAllAlerts({
        employeeId: Number(employeeId),
        endIndex: 20,
        startIndex: 0,
      }),
    )
  }, [dispatch])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Notifications"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow>
          {notificationAlerts.length > 0 &&
            notificationAlerts?.map((location, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index}</CTableDataCell>
                  <CTableDataCell>{location.msg}</CTableDataCell>
                </CTableRow>
              )
            })}
        </CRow>
      </OCard>
    </>
  )
}

export default Notifications
