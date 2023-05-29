import React, { Suspense, useEffect } from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { CContainer } from '@coreui/react-pro'
// routes config
import OLoadingSpinner from './ReusableComponent/OLoadingSpinner'
import routes from '../routes'
import { LoadingType } from '../types/Components/loadingScreenTypes'
import { reduxServices } from '../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../stateStore'

const AppContent = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const getPIPValue = useTypedSelector(
    reduxServices.pipList.selectors.getPIPValue,
  )

  const getSelectedMonthValue = useTypedSelector(
    reduxServices.resignationList.selectors.getSelectedMonthValue,
  )
  const getSelectedStatusValue = useTypedSelector(
    reduxServices.resignationList.selectors.getSelectedStatusValue,
  )
  const getSelectedEmployeeStatusValue = useTypedSelector(
    reduxServices.resignationList.selectors.getSelectedEmployeeStatusValue,
  )

  const fromDateValue = useTypedSelector(
    reduxServices.pipList.selectors.getFromDateValue,
  )
  const toDateValue = useTypedSelector(
    reduxServices.pipList.selectors.getToDateValue,
  )

  useEffect(() => {
    if (
      location.pathname === '/PIPList' ||
      location.pathname === '/PIPClearnceCerticates' ||
      location.pathname.split('/')[1] === 'ViewPIPDetail'
    ) {
      dispatch(reduxServices.pipList.actions.setMonthValue(getPIPValue))
      dispatch(reduxServices.pipList.actions.setFromDate(fromDateValue))
      dispatch(reduxServices.pipList.actions.setToDate(toDateValue))
    } else {
      dispatch(reduxServices.pipList.actions.setMonthValue('Current Month'))
      dispatch(reduxServices.pipList.actions.setFromDate(''))
      dispatch(reduxServices.pipList.actions.setToDate(''))
    }
  }, [dispatch, location, getPIPValue, fromDateValue, toDateValue])

  const getFromDateValue = useTypedSelector(
    reduxServices.resignationList.selectors.getFromDateValue,
  )
  const getToDateValue = useTypedSelector(
    reduxServices.resignationList.selectors.getToDateValue,
  )

  useEffect(() => {
    if (
      location.pathname === '/resignationList' ||
      location.pathname === '/managerComments' ||
      location.pathname === '/separationChart' ||
      location.pathname === '/ClearanceCertificateIT' ||
      location.pathname === '/ClearanceCertificateFinance' ||
      location.pathname === '/ClearanceCertificateAdmin' ||
      location.pathname === '/ClearanceCertificateHR' ||
      location.pathname === '/ExitFeedBackForm' ||
      location.pathname === '/ClearanceCertificateManager'
    ) {
      dispatch(
        reduxServices.resignationList.actions.setMonthValue(
          getSelectedMonthValue,
        ),
      )
      dispatch(
        reduxServices.resignationList.actions.setStatusValue(
          getSelectedStatusValue,
        ),
      )
      dispatch(
        reduxServices.resignationList.actions.setEmployeeStatusValue(
          getSelectedEmployeeStatusValue,
        ),
      )
      dispatch(
        reduxServices.resignationList.actions.setFromDate(getFromDateValue),
      )
      dispatch(reduxServices.resignationList.actions.setToDate(getToDateValue))
    } else {
      dispatch(reduxServices.resignationList.actions.setMonthValue(''))
      dispatch(reduxServices.resignationList.actions.setStatusValue('All'))
      dispatch(reduxServices.resignationList.actions.setEmployeeStatusValue(''))
      dispatch(reduxServices.resignationList.actions.setFromDate(''))
      dispatch(reduxServices.resignationList.actions.setToDate(''))
    }
  }, [
    dispatch,
    location,
    getPIPValue,
    getSelectedStatusValue,
    getSelectedEmployeeStatusValue,
    getFromDateValue,
    getToDateValue,
  ])
  const TicketStatusValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.TicketStatusValue,
  )
  const ApprovalStatusValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.ApprovalStatusValue,
  )
  const DateValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.DateValue,
  )
  const TrackerValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.TrackerValue,
  )
  const DepartmentNameValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.DepartmentNameValue,
  )
  const CategoryNameValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.CategoryNameValue,
  )
  const SubCategoryNameValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.SubCategoryNameValue,
  )
  const FormDateValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.FormDateValue,
  )
  const ToDateValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.ToDateValue,
  )
  useEffect(() => {
    if (
      location.pathname === '/ticketApprovals' ||
      location.pathname.split('/')[1] === 'updateTicketInApprovals'
    ) {
      dispatch(
        reduxServices.ticketApprovals.actions.setTicketStatusValue(
          TicketStatusValue,
        ),
      )
      dispatch(
        reduxServices.ticketApprovals.actions.setApprovalStatusValue(
          ApprovalStatusValue,
        ),
      )
      dispatch(reduxServices.ticketApprovals.actions.setDateValue(DateValue))
      dispatch(
        reduxServices.ticketApprovals.actions.setTrackerValue(TrackerValue),
      )
      dispatch(
        reduxServices.ticketApprovals.actions.setDepartmentNameValue(
          DepartmentNameValue,
        ),
      )
      dispatch(
        reduxServices.ticketApprovals.actions.setCategoryNameValue(
          CategoryNameValue,
        ),
      )
      dispatch(
        reduxServices.ticketApprovals.actions.setSubCategoryNameValue(
          SubCategoryNameValue,
        ),
      )
      dispatch(
        reduxServices.ticketApprovals.actions.setFormDataValue(FormDateValue),
      )
      dispatch(
        reduxServices.ticketApprovals.actions.setToDateValue(ToDateValue),
      )
    } else {
      dispatch(
        reduxServices.ticketApprovals.actions.setTicketStatusValue('New'),
      )
      dispatch(
        reduxServices.ticketApprovals.actions.setApprovalStatusValue(
          'pending Approval',
        ),
      )
      dispatch(reduxServices.ticketApprovals.actions.setDateValue('Today'))
      dispatch(reduxServices.ticketApprovals.actions.setTrackerValue('All'))
      dispatch(
        reduxServices.ticketApprovals.actions.setDepartmentNameValue('All'),
      )
      dispatch(
        reduxServices.ticketApprovals.actions.setCategoryNameValue('All'),
      )
      dispatch(
        reduxServices.ticketApprovals.actions.setSubCategoryNameValue('All'),
      )
      dispatch(reduxServices.ticketApprovals.actions.setFormDataValue(''))
      dispatch(reduxServices.ticketApprovals.actions.setToDateValue(''))
    }
  }, [
    dispatch,
    location,
    TicketStatusValue,
    ApprovalStatusValue,
    DateValue,
    TrackerValue,
    DepartmentNameValue,
    CategoryNameValue,
    SubCategoryNameValue,
    FormDateValue,
    ToDateValue,
  ])

  const getSelectValue = useTypedSelector(
    reduxServices.projectReport.selectors.getSelectValue,
  )
  const getStatusValue = useTypedSelector(
    reduxServices.projectReport.selectors.getStatusValue,
  )
  const getPricingModel = useTypedSelector(
    reduxServices.projectReport.selectors.getPricingModel,
  )
  const getProjectHealth = useTypedSelector(
    reduxServices.projectReport.selectors.getProjectHealth,
  )
  const getCustomFromValue = useTypedSelector(
    reduxServices.projectReport.selectors.getCustomFromValue,
  )
  const getCustomToValue = useTypedSelector(
    reduxServices.projectReport.selectors.getCustomToValue,
  )

  useEffect(() => {
    if (
      location.pathname === '/projectreport' ||
      location.pathname.split('/')[1] === 'viewProject' ||
      location.pathname.split('/')[1] === 'editproject'
    ) {
      dispatch(
        reduxServices.projectReport.actions.setPricingModel(getPricingModel),
      )
      dispatch(
        reduxServices.projectReport.actions.setProjectHealth(getProjectHealth),
      )
      dispatch(
        reduxServices.projectReport.actions.setSelectValue(getSelectValue),
      )
      dispatch(
        reduxServices.projectReport.actions.setStatusValue(getStatusValue),
      )
      dispatch(
        reduxServices.projectReport.actions.setCustomFromValue(
          getCustomFromValue,
        ),
      )
      dispatch(
        reduxServices.projectReport.actions.setCustomToValue(getCustomToValue),
      )
    } else {
      dispatch(reduxServices.projectReport.actions.setProjectHealth('All'))
      dispatch(reduxServices.projectReport.actions.setPricingModel('All'))
      dispatch(reduxServices.projectReport.actions.setSelectValue('INPROGRESS'))
      dispatch(reduxServices.projectReport.actions.setStatusValue(''))
      dispatch(reduxServices.projectReport.actions.setCustomFromValue(''))
      dispatch(reduxServices.projectReport.actions.setCustomToValue(''))
    }
  }, [
    dispatch,
    location,
    getSelectValue,
    getProjectHealth,
    getPricingModel,
    getStatusValue,
    getCustomFromValue,
    getCustomToValue,
  ])

  const getDepartmentName = useTypedSelector(
    reduxServices.ticketReport.selectors.getDepartmentName,
  )
  const getDateValue = useTypedSelector(
    reduxServices.ticketReport.selectors.getDateValue,
  )
  const getFromDate = useTypedSelector(
    reduxServices.ticketReport.selectors.getFromDate,
  )
  const getToDate = useTypedSelector(
    reduxServices.ticketReport.selectors.getToDate,
  )

  useEffect(() => {
    if (location.pathname === '/ticketReport') {
      dispatch(
        reduxServices.ticketReport.actions.setDepartmentName(getDepartmentName),
      )
      dispatch(reduxServices.ticketReport.actions.setDateValue(getDateValue))

      dispatch(reduxServices.ticketReport.actions.setFromDate(getFromDate))

      dispatch(reduxServices.ticketReport.actions.setToDate(getToDate))
    } else {
      dispatch(reduxServices.ticketReport.actions.setDepartmentName('All'))
      dispatch(reduxServices.ticketReport.actions.setDateValue('Today'))

      dispatch(reduxServices.ticketReport.actions.setFromDate(''))

      dispatch(reduxServices.ticketReport.actions.setToDate(''))
    }
  }, [
    dispatch,
    location,
    getDepartmentName,
    getDateValue,
    getFromDate,
    getToDate,
  ])

  const LocationValue = useTypedSelector(
    reduxServices.bookingList.selectors.LocationValue,
  )
  const MeetingStatus = useTypedSelector(
    reduxServices.bookingList.selectors.MeetingStatus,
  )
  const RoomValue = useTypedSelector(
    reduxServices.bookingList.selectors.RoomValue,
  )
  const SelectCustom = useTypedSelector(
    reduxServices.bookingList.selectors.SelectCustom,
  )
  const FromDateValue = useTypedSelector(
    reduxServices.bookingList.selectors.FromDateValue,
  )

  useEffect(() => {
    if (location.pathname === '/meetingList') {
      dispatch(
        reduxServices.bookingList.actions.setLocationValue(LocationValue),
      )
      dispatch(reduxServices.bookingList.actions.setRoomValue(RoomValue))

      dispatch(
        reduxServices.bookingList.actions.setMeetingStatus(MeetingStatus),
      )

      dispatch(reduxServices.bookingList.actions.setSelectCustom(SelectCustom))
      dispatch(
        reduxServices.bookingList.actions.setFromDateValue(FromDateValue),
      )
    } else {
      dispatch(reduxServices.bookingList.actions.setLocationValue('1'))
      dispatch(reduxServices.bookingList.actions.setRoomValue(''))

      dispatch(reduxServices.bookingList.actions.setMeetingStatus('New'))

      dispatch(reduxServices.bookingList.actions.setSelectCustom('Today'))
      dispatch(reduxServices.bookingList.actions.setFromDateValue(''))
    }
  }, [
    dispatch,
    location,
    LocationValue,
    RoomValue,
    MeetingStatus,
    SelectCustom,
    FromDateValue,
  ])

  const SelectCustomEventList = useTypedSelector(
    reduxServices.eventList.selectors.SelectCustom,
  )
  const FromDateFilter = useTypedSelector(
    reduxServices.eventList.selectors.FromDateFilter,
  )
  const ToDateFilter = useTypedSelector(
    reduxServices.eventList.selectors.ToDateFilter,
  )

  useEffect(() => {
    if (
      location.pathname === '/eventList' ||
      location.pathname.split('/')[1] === 'ViewPIPDetail'
    ) {
      dispatch(
        reduxServices.eventList.actions.setFromDateFilter(FromDateFilter),
      )
      dispatch(reduxServices.eventList.actions.setToDateFilter(ToDateFilter))
      dispatch(
        reduxServices.eventList.actions.setSelectCustom(SelectCustomEventList),
      )
    } else {
      dispatch(reduxServices.eventList.actions.setFromDateFilter(''))
      dispatch(reduxServices.eventList.actions.setToDateFilter(''))
      dispatch(reduxServices.eventList.actions.setSelectCustom('Current Month'))
    }
  }, [dispatch, location, getPIPValue])

  const getMonthValue = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.getSelectedMonthValue,
  )
  const getStatus = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.getSelectedStatusValue,
  )

  const getSelectedRescheduleStatusValue = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.getSelectedRescheduleStatusValue,
  )
  const getFromValue = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.getFromDateValue,
  )
  const getToValue = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.getToDateValue,
  )

  useEffect(() => {
    if (
      location.pathname === '/SQAAudit' ||
      location.pathname.split('/')[1] === '/viewProjectAudit' ||
      location.pathname.split('/')[1] === 'editAuditForm' ||
      location.pathname.split('/')[1] === '/newProjectAuditTimeline'
    ) {
      dispatch(
        reduxServices.sqaAuditReport.actions.setMonthValue(getMonthValue),
      )
      dispatch(reduxServices.sqaAuditReport.actions.setStatusValue(getStatus))
      dispatch(
        reduxServices.sqaAuditReport.actions.setRescheduleStatus(
          getSelectedRescheduleStatusValue,
        ),
      )
      dispatch(reduxServices.sqaAuditReport.actions.setFromDate(getFromValue))
      dispatch(reduxServices.sqaAuditReport.actions.setToDate(getToValue))
    } else {
      dispatch(reduxServices.sqaAuditReport.actions.setMonthValue(''))
      dispatch(reduxServices.sqaAuditReport.actions.setStatusValue(''))
      dispatch(reduxServices.sqaAuditReport.actions.setRescheduleStatus(''))
      dispatch(reduxServices.sqaAuditReport.actions.setFromDate(''))
      dispatch(reduxServices.sqaAuditReport.actions.setToDate(''))
    }
  }, [
    dispatch,
    location,
    getMonthValue,
    getStatus,
    getSelectedRescheduleStatusValue,
    getFromValue,
    getToValue,
  ])

  return (
    <CContainer fluid>
      <Suspense fallback={<OLoadingSpinner type={LoadingType.PAGE} />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  render={() => (
                    <>
                      <route.component />
                    </>
                  )}
                />
              )
            )
          })}
          <Redirect from="/" to="/dashboard" />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
