import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CButton,
  CTooltip,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { UpComingJoinListTableProps } from '../../../types/Recruitment/UpComingJoinList/UpComingJoinListTypes'

const UpComingJoinListTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: UpComingJoinListTableProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const upComingJoinee = useTypedSelector(
    reduxServices.upComingJoinList.selectors.upComingJoinList,
  )
  const joinListSize = useTypedSelector(
    reduxServices.upComingJoinList.selectors.listSize,
  )
  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const totalNoOfRecords = upComingJoinee?.length
    ? `Total Records: ${joinListSize}`
    : `No Records found...`

  return (
    <>
      <CTable striped className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
            <CTableHeaderCell scope="col">Experience</CTableHeaderCell>
            <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Joining</CTableHeaderCell>
            <CTableHeaderCell scope="col">Technology</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {upComingJoinee?.length > 0 &&
            upComingJoinee.map((joinee, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                  <CTableDataCell>
                    {joinee.candidateName || 'N/A'}
                  </CTableDataCell>

                  <CTableDataCell>
                    {joinee.candidateEmail || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{joinee.mobile || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{joinee.experience || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{joinee.designation || 'N/A'}</CTableDataCell>

                  <CTableDataCell>{joinee.dateOfJoining}</CTableDataCell>

                  <CTableDataCell>{joinee.technology}</CTableDataCell>
                  {/* <CTableDataCell>{joinee.Actions}</CTableDataCell> */}

                  <CTableDataCell data-testid="action-cell">
                    <div className="sh-btn-group">
                      <CTooltip content="Edit">
                        <CButton color="info" size="sm" className="mb-1">
                          <i className="text-white fa fa-pencil-square-o"></i>
                        </CButton>
                      </CTooltip>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p className="mt-2">
            <strong>{totalNoOfRecords}</strong>
          </p>
        </CCol>
        <CCol xs={3}>
          {joinListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSize}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {joinListSize > 20 && (
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

export default UpComingJoinListTable
