import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useMemo } from 'react'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { InitiateCycleTableProps } from '../../../../types/Settings/InitiateCycle/initiateCycleTypes'
import { currentPageData } from '../../../../utils/paginationUtils'

const AddInitiateCycleTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: InitiateCycleTableProps): JSX.Element => {
  const allCycles = useTypedSelector(
    reduxServices.initiateCycle.selectors.allCycles,
  )
  const allQuestionsListSize = useTypedSelector(
    reduxServices.initiateCycle.selectors.listSize,
  )

  const allRecords = allCycles?.list?.length
    ? `Total Records: ${allQuestionsListSize}`
    : `No Records found...`

  const dispatch = useAppDispatch()

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const getPageNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const currentTotalPageRecords = useMemo(
    () => currentPageData(allCycles?.list, currentPage, pageSize),
    [allCycles?.list, currentPage, pageSize],
  )
  console.log(currentTotalPageRecords)

  const editCycleHandler = (id: number) => {
    dispatch(reduxServices.initiateCycle.actions.setToggle('editCycle'))
    dispatch(reduxServices.initiateCycle.editCycle(id))
  }

  return (
    <>
      <CTable striped responsive className="mt-5 align-middle alignment">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Cycle Name</CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-middle">
              From Month
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-center">
              To Month
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-center">
              Status
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-center">
              Start Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-center">
              End Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-center">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentTotalPageRecords?.map((cycle, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell>{getPageNumber(index)}</CTableDataCell>
                <CTableDataCell>{cycle.cycleName}</CTableDataCell>
                <CTableDataCell>{cycle.fromMonth}</CTableDataCell>
                <CTableDataCell>{cycle.toMonth}</CTableDataCell>
                <CTableDataCell>{cycle.activateFlag}</CTableDataCell>
                <CTableDataCell>{cycle.startDate}</CTableDataCell>
                <CTableDataCell>{cycle.endDate}</CTableDataCell>
                <CTableDataCell>
                  <CTooltip content="Edit">
                    <CButton
                      size="sm"
                      className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                      color="info btn-ovh me-1"
                      onClick={() => editCycleHandler(cycle?.id)}
                    >
                      <i className="fa fa-edit" aria-hidden="true"></i>
                    </CButton>
                  </CTooltip>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p className="mt-2">
            <strong>{allRecords}</strong>
          </p>
        </CCol>
        <CCol xs={3}>
          {allQuestionsListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSize}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {allQuestionsListSize > 20 && (
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
    </>
  )
}
export default AddInitiateCycleTable
