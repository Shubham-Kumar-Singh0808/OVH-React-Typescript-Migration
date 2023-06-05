import React, { useEffect } from 'react'
import { CCol, CRow } from '@coreui/react-pro'
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

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const isPersistValue = (notification: AlertsData) => {
    if (
      notification.alertType === 'MilestoneDelay' ||
      notification.alertType === 'MilestoneClose'
    ) {
      return (
        <li
          className={`${notification.alertStatus ? 'read' : 'un-read'}`}
          onClick={() => iconButtonHandler(notification.id)}
          aria-disabled={notification.alertStatus === true}
        >
          <div className="media-left">
            <span className="sh-timeline-status icon-wrap icon-circle bg-primary cursor-pointer">
              <i
                className="fa fa-briefcase fa-lg cursor-pointer"
                aria-hidden="true"
              ></i>
            </span>
          </div>
          <div className="media-body">
            <div className="text-nowrap cursor-pointer">{notification.msg}</div>
            <small className="text-muted cursor-pointer">
              {notification.msgDate}
            </small>
          </div>
        </li>
      )
    } else if (notification.alertType === 'LeaveCancel') {
      return (
        <Link to={`/employeeLeaveSummary`}>
          <li
            className={`${notification.alertStatus ? 'read' : 'un-read'}`}
            onClick={() => iconButtonHandler(notification.id)}
            aria-disabled={notification.alertStatus === true}
          >
            <div className="media-left">
              <span className="sh-timeline-status icon-wrap icon-circle bg-primary">
                <i className="fa fa-user-times fa-lg"></i>
              </span>
            </div>
            <div className="media-body">
              <div className="text-nowrap cursor-pointer">
                {notification.msg}
              </div>
              <small className="text-muted cursor-pointer">
                {notification.msgDate}
              </small>
            </div>
          </li>
        </Link>
      )
    } else if (notification.alertType === 'LeaveApply') {
      return (
        <Link to={`/leaveApprovals`}>
          <li
            className={`${notification.alertStatus ? 'read' : 'un-read'}`}
            onClick={() => iconButtonHandler(notification.id)}
            aria-disabled={notification.alertStatus === true}
          >
            <div className="media-left">
              <span className="sh-timeline-status icon-wrap icon-circle bg-primary">
                <i className="fa fa-calendar-o fa-lg"></i>
              </span>
            </div>
            <div className="media-body">
              <div className="text-nowrap cursor-pointer">
                {notification.msg}
              </div>
              <small className="text-muted cursor-pointer">
                {notification.msgDate}
              </small>
            </div>
          </li>
        </Link>
      )
    } else if (notification.alertType === 'LeaveReject') {
      return (
        <Link to={`/employeeLeaveSummary`}>
          <li
            className={`${notification.alertStatus ? 'read' : 'un-read'}`}
            onClick={() => iconButtonHandler(notification.id)}
            aria-disabled={notification.alertStatus === true}
          >
            <div className="media-left">
              <span className="sh-timeline-status icon-wrap icon-circle bg-primary fa-times-bg">
                <i className="fa fa-times fa-lg"></i>
              </span>
            </div>
            <div className="media-body">
              <div className="text-nowrap cursor-pointer">
                {notification.msg}
              </div>
              <small className="text-muted cursor-pointer">
                {notification.msgDate}
              </small>
            </div>
          </li>
        </Link>
      )
    } else if (notification.alertType === 'LeaveApprove') {
      return (
        <Link to={`/employeeLeaveSummary`}>
          <li
            className={`${notification.alertStatus ? 'read' : 'un-read'}`}
            onClick={() => iconButtonHandler(notification.id)}
            aria-disabled={notification.alertStatus === true}
          >
            <div className="media-left">
              <span className="sh-timeline-status icon-wrap icon-circle bg-primary">
                <i className="fa fa-check fa-lg"></i>
              </span>
            </div>
            <div className="media-body">
              <div className="text-nowrap cursor-pointer">
                {notification.msg}
              </div>
              <small className="text-muted cursor-pointer">
                {notification.msgDate}
              </small>
            </div>
          </li>
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
        CBodyClassName="ps-0 pe-0 notifi-page"
        CFooterClassName="d-none"
      >
        <ul className="head-list">
          {notificationAlerts.length > 0 &&
            notificationAlerts?.map((notification, index) => {
              return (
                <React.Fragment key={index}>
                  {isPersistValue(notification)}
                </React.Fragment>
              )
            })}
        </ul>
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
