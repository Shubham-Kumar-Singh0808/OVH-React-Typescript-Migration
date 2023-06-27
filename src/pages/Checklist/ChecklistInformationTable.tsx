import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react-pro'
import React from 'react'
import { getDateTimeFromTimestamp } from './ChecklistHelpers'
import { useTypedSelector } from '../../stateStore'
import OPageSizeSelect from '../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../components/ReusableComponent/OPagination'
import { usePagination } from '../../middleware/hooks/usePagination'

const ChecklistInformationTable = (): JSX.Element => {
  const incomingChecklist = useTypedSelector(
    (state) => state.Checklist.incomingChecklist,
  )

  const {
    currentPage,
    setCurrentPage,
    pageSize,
    paginationRange,
    setPageSize,
  } = usePagination(incomingChecklist.size)

  const pageSelectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.target.value)
    setCurrentPage(1)
  }

  return (
    <>
      <CTable responsive striped align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Title</CTableHeaderCell>
            <CTableHeaderCell>Checklist Name</CTableHeaderCell>
            <CTableHeaderCell>Department</CTableHeaderCell>
            <CTableHeaderCell>Username</CTableHeaderCell>
            <CTableHeaderCell>Last Modified Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {incomingChecklist.list.map((checklistItem, checklistItemIndex) => (
            <CTableRow key={checklistItemIndex}>
              <CTableDataCell>{checklistItemIndex + 1}</CTableDataCell>
              <CTableDataCell>
                <div className="cursor-pointer">
                  <span>
                    <i className="fa fa-eye fa-fw fa-lg"></i>
                  </span>
                  {checklistItem.title}
                </div>
              </CTableDataCell>
              <CTableDataCell>{checklistItem.pageName}</CTableDataCell>
              <CTableDataCell>{checklistItem.departmentName}</CTableDataCell>
              <CTableDataCell>{checklistItem.userName}</CTableDataCell>
              <CTableDataCell>
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
