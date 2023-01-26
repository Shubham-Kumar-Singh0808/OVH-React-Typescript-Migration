import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CButton,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
} from '@coreui/react-pro'
import React from 'react'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import OPageSizeSelect from '../../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../../components/ReusableComponent/OPagination'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'

const ProjectStatusTable = ({
  paginationRange,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const projectStatusList = useTypedSelector(
    reduxServices.projectStatus.selectors.projectStatusReport,
  )

  const listSize = useTypedSelector(
    reduxServices.projectStatus.selectors.statusReportListSize,
  )
  const isLoading = useTypedSelector(
    reduxServices.projectStatus.selectors.isLoading,
  )
  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }
  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }
  return (
    <>
      <CTable striped className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Prev. Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Prev. Task</CTableHeaderCell>
            <CTableHeaderCell scope="col">Next Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Next Task</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            projectStatusList &&
            projectStatusList?.map((statusReort, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                  <CTableDataCell>{statusReort.prevDate}</CTableDataCell>
                  <CTableDataCell>{statusReort.prevstatus}</CTableDataCell>
                  <CTableDataCell>{statusReort.nextDate}</CTableDataCell>
                  <CTableDataCell>{statusReort.nextstatus}</CTableDataCell>
                  <CTableDataCell>
                    <>
                      <CButton
                        color="info"
                        className="btn-ovh me-2"
                        data-testid="edit-btn"
                      >
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                      <CButton
                        color="danger"
                        className="btn-ovh me-1 btn-ovh-employee-list"
                        // onClick={() => handleShowDeleteModal(item.id)}
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </>
                  </CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      {projectStatusList?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {listSize}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {listSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {listSize > 20 && (
            <CCol
              xs={5}
              className="gap-1 d-grid d-md-flex justify-content-md-end"
            >
              <OPagination
                currentPage={currentPage}
                pageSetter={setCurrentPage}
                paginationRange={paginationRange}
              />
            </CCol>
          )}
        </CRow>
      ) : (
        <CCol>
          <CRow className="mt-4 ms-3">
            <h5>No Records Found... </h5>
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default ProjectStatusTable
