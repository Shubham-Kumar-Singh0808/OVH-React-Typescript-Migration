import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getDateTimeFromTimestamp } from './ChecklistHelpers'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import OPageSizeSelect from '../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../components/ReusableComponent/OPagination'
import { usePagination } from '../../middleware/hooks/usePagination'
import { reduxServices } from '../../reducers/reduxServices'
import { IncomingChecklistItem } from '../../types/Checklist/ChecklistTypes'

const ChecklistInformationTable = (): JSX.Element => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const incomingChecklist = useTypedSelector(
    (state) => state.Checklist.incomingChecklist,
  )

  const {
    currentPage,
    setCurrentPage,
    pageSize,
    paginationRange,
    setPageSize,
  } = usePagination(22)

  const pageSelectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.target.value)
    setCurrentPage(1)
  }

  useEffect(() => {
    // whenever page size or page changes, we set the params
    dispatch(
      reduxServices.Checklist.actions.setChecklistParams({
        endIndex: currentPage * pageSize,
        startIndex: (currentPage - 1) * pageSize,
      }),
    )
  }, [currentPage, pageSize])

  const checklistItemTitleClickHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    checkListItem: IncomingChecklistItem,
  ) => {
    e.preventDefault()
    // pushing to required url
    history.push(`/checklistInfo/${checkListItem.pageName}`)
  }

  return (
    <>
      <CTable responsive striped align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Checklist Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Department</CTableHeaderCell>
            <CTableHeaderCell scope="col">Username</CTableHeaderCell>
            <CTableHeaderCell scope="col">Last Modified Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {incomingChecklist.list.map((checklistItem, checklistItemIndex) => (
            <CTableRow key={checklistItemIndex} data-testid="checkListItemRow">
              <CTableDataCell>{checklistItemIndex + 1}</CTableDataCell>
              <CTableDataCell>
                <div
                  className="cursor-pointer checklist-title-hover"
                  data-testid={`checkListTitle-${checklistItemIndex}`}
                  onClick={(e) =>
                    checklistItemTitleClickHandler(e, checklistItem)
                  }
                >
                  <span>
                    <i className="fa fa-eye fa-fw fa-lg"></i>
                  </span>
                  {checklistItem.title}
                </div>
              </CTableDataCell>
              <CTableDataCell
                data-testid={`checkListPageName-${checklistItemIndex}`}
              >
                {checklistItem.pageName}
              </CTableDataCell>
              <CTableDataCell
                data-testid={`checkListDeptName-${checklistItemIndex}`}
              >
                {checklistItem.departmentName}
              </CTableDataCell>
              <CTableDataCell
                data-testid={`checkListUserName-${checklistItemIndex}`}
              >
                {checklistItem.userName}
              </CTableDataCell>
              <CTableDataCell
                data-testid={`checkListModDate-${checklistItemIndex}`}
              >
                {getDateTimeFromTimestamp(checklistItem.updatedDate)}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <div className="d-flex flex-row align-items-center justify-content-between mt-2">
        <div>
          <b>
            {incomingChecklist.size > 0
              ? `Total Records: ${incomingChecklist.size}`
              : 'No Records Found...'}
          </b>
        </div>
        {incomingChecklist.size >= 20 && (
          <>
            <div>
              <OPageSizeSelect
                handlePageSizeSelectChange={pageSelectChangeHandler}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            </div>
            <div>
              <OPagination
                currentPage={currentPage}
                pageSetter={setCurrentPage}
                paginationRange={paginationRange}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ChecklistInformationTable
