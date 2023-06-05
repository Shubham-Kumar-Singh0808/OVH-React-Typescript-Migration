import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TicketApprovalsFilterOptions from './TicketApprovalsFilterOptions'
import TicketApprovalsTable from './TicketApprovalsTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { GetAllTicketsForApprovalProps } from '../../../types/Support/TicketApprovals/ticketApprovalsTypes'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { downloadFile } from '../../../utils/helper'
import ticketApprovalsApi from '../../../middleware/api/Support/TicketApprovals/ticketApprovalsApi'
import TicketHistoryDetails from '../MyTickets/TicketHistory.tsx/TicketHistoryDetails'

const TicketApprovals = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const FormDateValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.FormDateValue,
  )
  const ToDateValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.ToDateValue,
  )
  const [ticketFromDate, setTicketFromDate] = useState<string | Date>(
    FormDateValue,
  )
  const [ticketToDate, setTicketToDate] = useState<string | Date>(ToDateValue)

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
  console.log(DepartmentNameValue + 'DepartmentNameValue')

  const initialState: GetAllTicketsForApprovalProps = {
    categoryId: Number(CategoryNameValue) || undefined,
    dateSelection: DateValue,
    departmentId: Number(DepartmentNameValue) || undefined,
    endIndex: 20,
    fromDate: (ticketFromDate as string) || '',
    multiSearch: '',
    progressStatus: TicketStatusValue,
    searchByAssigneeName: false,
    searchByEmpName: false,
    startIndex: 0,
    subCategoryId: Number(SubCategoryNameValue) || undefined,
    ticketStatus: ApprovalStatusValue,
    toDate: (ticketToDate as string) || '',
    trackerID: Number(TrackerValue) || undefined,
  }

  const [ticketApprovalParams, setTicketApprovalParams] = useState(initialState)
  const [deptId, setDeptId] = useState<number>(Number(DepartmentNameValue))
  const [categoryId, setCategoryId] = useState<number>(
    Number(CategoryNameValue),
  )
  const [subCategoryIdValue, setSubCategoryIdValue] = useState<number>(
    Number(SubCategoryNameValue),
  )
  const [renderTicketApprovals, setRenderTicketApprovals] =
    useState<boolean>(false)

  console.log(deptId + 'deptId')

  const ticketsForApproval = useTypedSelector(
    reduxServices.ticketApprovals.selectors.ticketsForApproval,
  )

  const toggleValue = useTypedSelector(
    reduxServices.ticketApprovals.selectors.toggleValue,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(ticketsForApproval.size, 20)

  useEffect(() => {
    dispatch(reduxServices.ticketApprovals.getDepartmentNameList())
    dispatch(reduxServices.ticketApprovals.getTrackerList())
    dispatch(reduxServices.ticketApprovals.getAllLookUps())
    dispatch(
      reduxServices.ticketApprovals.actions.setRoutePath(location.pathname),
    )
  }, [dispatch])

  useEffect(() => {
    dispatch(
      reduxServices.ticketApprovals.getAllTicketsForApproval({
        ...ticketApprovalParams,
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      }),
    )
  }, [
    dispatch,
    ticketApprovalParams,
    currentPage,
    pageSize,
    renderTicketApprovals,
  ])

  useEffect(() => {
    if (deptId) {
      dispatch(reduxServices.ticketApprovals.getDepartmentCategoryList(deptId))
      setSubCategoryIdValue(0)
    }
    if (categoryId) {
      dispatch(reduxServices.ticketApprovals.getSubCategoryList(categoryId))
    }
  }, [deptId, categoryId])

  const handleExportTicketApprovalList = async (
    props: GetAllTicketsForApprovalProps,
  ) => {
    const ticketApprovalListDownload =
      await ticketApprovalsApi.exportTicketApprovalList({
        ...props,
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
      })
    downloadFile(ticketApprovalListDownload, 'TicketApprovalList.csv')
  }

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Ticket Approvals',
  )
  useEffect(() => {
    dispatch(
      reduxServices.ticketApprovals.actions.setDepartmentNameValue(
        Number(deptId),
      ),
    )
    dispatch(
      reduxServices.ticketApprovals.actions.setCategoryNameValue(
        Number(categoryId),
      ),
    )
    dispatch(
      reduxServices.ticketApprovals.actions.setSubCategoryNameValue(
        Number(subCategoryIdValue),
      ),
    )
  }, [deptId, categoryId, subCategoryIdValue])

  return (
    <>
      {toggleValue === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title={'Ticket Approvals'}
            CFooterClassName="d-none"
            CBodyClassName="ps-0 pe-0"
          >
            <TicketApprovalsFilterOptions
              setTicketApprovalParams={setTicketApprovalParams}
              deptId={deptId as number}
              setDeptId={setDeptId}
              categoryId={categoryId as number}
              setCategoryId={setCategoryId}
              subCategoryIdValue={subCategoryIdValue as number}
              setSubCategoryIdValue={setSubCategoryIdValue}
              initialState={initialState}
              handleExportTicketApprovalList={handleExportTicketApprovalList}
              ticketFromDate={ticketFromDate}
              setTicketFromDate={setTicketFromDate}
              ticketToDate={ticketToDate}
              setTicketToDate={setTicketToDate}
            />

            <TicketApprovalsTable
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
              renderTicketApprovals={renderTicketApprovals}
              setRenderTicketApprovals={setRenderTicketApprovals}
              userAccess={userAccess?.updateaccess as boolean}
            />
          </OCard>
        </>
      )}
      {toggleValue === 'ticketApprovalHistory' && <TicketHistoryDetails />}
    </>
  )
}

export default TicketApprovals
