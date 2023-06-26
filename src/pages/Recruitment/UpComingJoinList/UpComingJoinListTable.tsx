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
  CFormInput,
  CInputGroup,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import * as XLSX from 'xlsx'
import { Link } from 'react-router-dom'
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
  searchInput,
  setSearchInput,
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

  useEffect(() => {
    dispatch(
      reduxServices.upComingJoinList.getUpConingJoinList({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        searchName: searchInput,
      }),
    )
  }, [dispatch, pageSize, currentPage])

  const searchButtonHandlerOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.upComingJoinList.getUpConingJoinList({
          startIndex: 0,
          endIndex: 20,
          searchName: searchInput,
        }),
      )
      setCurrentPage(1)
      setPageSize(20)
    }
  }

  const searchButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      reduxServices.upComingJoinList.getUpConingJoinList({
        startIndex: 0,
        endIndex: 20,
        searchName: searchInput,
      }),
    )
    setCurrentPage(1)
    setPageSize(20)
  }

  const totalNoOfRecords = upComingJoinee?.length
    ? `Total Records: ${joinListSize}`
    : `No Records found...`

  const handleExportUpComingJoinList = () => {
    const contentElement = document.getElementById('upcomingJoineeListId')
    if (contentElement) {
      const worksheet = XLSX.utils.table_to_sheet(
        document.getElementById('upcomingJoineeListId'),
      )
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'UpcomingJoineeList')
      XLSX.writeFile(workbook, 'UpcomingJoineeList.xls')
    }
  }

  const createEmployeeButtonHandler = (id: number) => {
    dispatch(reduxServices.upComingJoinList.getJoineeById(id))
  }

  return (
    <>
      <CRow className="gap-2 d-md-flex justify-content-md-end">
        <CCol sm={3} md={3}>
          <CInputGroup className="global-search me-0 justify-content-md-end">
            <CFormInput
              data-testid="searchField"
              placeholder="Search by name"
              aria-label="Multiple Search"
              aria-describedby="button-addon2"
              id="searchInput"
              name="searchInput"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
              onKeyDown={searchButtonHandlerOnKeyDown}
            />
            <CButton
              disabled={!searchInput}
              data-testid="multi-search-btn"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
              onClick={searchButtonHandler}
            >
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CCol>
        {upComingJoinee?.length > 0 && (
          <CCol sm="auto" className="px-0 text-end">
            <CButton
              size="sm"
              color="info"
              className="btn-ovh me-1"
              data-testid="export-btn1"
              onClick={handleExportUpComingJoinList}
            >
              + Click To Export
            </CButton>
          </CCol>
        )}
      </CRow>
      <CTable striped className="mt-3" id="upcomingJoineeListId">
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
                  <CTableDataCell data-testid="action-cell">
                    <div className="sh-btn-group">
                      <CTooltip content="Edit">
                        <CButton color="info" size="sm" className="mb-1">
                          <i className="text-white fa fa-pencil-square-o"></i>
                        </CButton>
                      </CTooltip>

                      {joinee.candidateInterviewStatus === 'JOINED' ? (
                        <CTooltip content="Create Employee">
                          <Link to={`/addEmployee/${joinee.id}`}>
                            <CButton
                              ng-show="joinee.candidateInterviewStatus=='JOINED'"
                              type="button"
                              className="btn btn-success"
                              data-original-title="Create Employee"
                              onClick={() =>
                                createEmployeeButtonHandler(joinee.id)
                              }
                            >
                              <i className="fa fa-plus-square"></i>
                            </CButton>
                          </Link>
                        </CTooltip>
                      ) : (
                        ''
                      )}
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
