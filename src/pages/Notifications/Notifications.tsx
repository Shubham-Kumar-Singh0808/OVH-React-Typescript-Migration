import React, { useEffect } from 'react'
import {
  CButton,
  CCol,
  CRow,
  CTableDataCell,
  CTableRow,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import OCard from '../../components/ReusableComponent/OCard'
import { reduxServices } from '../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import OPageSizeSelect from '../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../components/ReusableComponent/OPagination'
import { usePagination } from '../../middleware/hooks/usePagination'
import { AlertsData } from '../../types/Notifications/notificationTypes'

const Notifications = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const notificationAlerts = useTypedSelector(
    reduxServices.notification.selectors.notificationAlerts,
  )
  const listSize = useTypedSelector(
    reduxServices.notification.selectors.listSize,
  )

  const totalNoOfRecords = notificationAlerts?.length
    ? `Total Records: ${listSize}`
    : `No Records found...`

  const CurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  useEffect(() => {
    if (CurrentPage) {
      setCurrentPage(CurrentPage)
    }
  }, [CurrentPage])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  useEffect(() => {
    dispatch(
      reduxServices.notification.getAllAlerts({
        employeeId: Number(employeeId),
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }, [currentPage, dispatch, pageSize])

  const iconButtonHandler = (id: number) => {
    dispatch(
      reduxServices.notification.getUpdateAlert({
        employeeId: Number(employeeId),
        alertId: id,
      }),
    )
    dispatch(
      reduxServices.notification.getAllAlerts({
        employeeId: Number(employeeId),
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }

  const isPersistValue = (notification: AlertsData) => {
    if (
      notification.alertType === 'MilestoneDelay' ||
      notification.alertType === 'MilestoneClose'
    ) {
      return (
        <CButton
          size="sm"
          color="info btn-ovh me-1"
          className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
          onClick={() => iconButtonHandler(notification.id)}
          disabled={notification.alertStatus === true}
        >
          <i className="fa fa-briefcase fa-lg" aria-hidden="true"></i>
        </CButton>
      )
    } else if (notification.alertType === 'LeaveCancel') {
      return (
        <Link to={`/employeeLeaveSummary`}>
          <CButton
            size="sm"
            color="info btn-ovh me-1"
            onClick={() => iconButtonHandler(notification.id)}
            className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
            disabled={notification.alertStatus === true}
          >
            <i className="fa fa-user-times"></i>
          </CButton>
        </Link>
      )
    } else if (notification.alertType === 'LeaveApply') {
      return (
        <Link to={`/leaveApprovals`}>
          <CButton
            size="sm"
            color="info btn-ovh me-1"
            onClick={() => iconButtonHandler(notification.id)}
            className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
            disabled={notification.alertStatus === true}
          >
            <i className="fa fa-calendar-o"></i>
          </CButton>
        </Link>
      )
    } else if (notification.alertType === 'LeaveReject') {
      return (
        <Link to={`/employeeLeaveSummary`}>
          <CButton
            size="sm"
            color="info btn-ovh me-1"
            onClick={() => iconButtonHandler(notification.id)}
            className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
            disabled={notification.alertStatus === true}
          >
            <i className="fa fa-times"></i>
          </CButton>
        </Link>
      )
    } else if (notification.alertType === 'LeaveApprove') {
      return (
        <Link to={`/employeeLeaveSummary`}>
          <CButton
            size="sm"
            color="info btn-ovh me-1"
            onClick={() => iconButtonHandler(notification.id)}
            className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
            disabled={notification.alertStatus === true}
          >
            <i className="fa fa-check"></i>
          </CButton>
        </Link>
      )
    } else {
      return ''
    }
  }

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
            notificationAlerts?.map((notification, index) => {
              return (
                <CRow key={index}>
                  <span className="sh-timeline-status">
                    {isPersistValue(notification)} {notification.msg}
                  </span>
                  {/* <CCol sm={6}>
                    <CRow>{notification.msg}</CRow>
                  </CCol> */}
                  <b>{notification.msgDate}</b>
                </CRow>
              )
            })}
        </CRow>
        <CRow>
          <CCol xs={4}>
            <p className="mt-2">
              <strong>{totalNoOfRecords}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {listSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSize}
                options={[20, 40, 60, 80, 100]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {listSize > 20 && (
            <CCol
              xs={5}
              className="d-grid gap-1 d-md-flex justify-content-md-end"
            >
              <OPagination
                currentPage={currentPage}
                pageSetter={setCurrentPage}
                paginationRange={paginationRange}
              />
            </CCol>
          )}
        </CRow>
      </OCard>
    </>
  )
}

export default Notifications
