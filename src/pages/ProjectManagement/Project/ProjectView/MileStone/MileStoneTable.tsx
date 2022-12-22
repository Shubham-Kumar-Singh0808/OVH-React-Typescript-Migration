import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CRow,
  CCol,
} from '@coreui/react-pro'
import React from 'react'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import OPageSizeSelect from '../../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../../components/ReusableComponent/OPagination'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { usePagination } from '../../../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'

const MileStoneTable = (): JSX.Element => {
  const mileStoneList = useTypedSelector(
    reduxServices.projectMileStone.selectors.projectMileStone,
  )
  const mileStoneListSize = useTypedSelector(
    reduxServices.projectMileStone.selectors.projectMileStoneSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.projectMileStone.selectors.isLoading,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(mileStoneListSize, 20)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }
  return (
    <>
      <CTable striped className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">CR Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Effort</CTableHeaderCell>
            <CTableHeaderCell scope="col">Planned End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actual End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Billable</CTableHeaderCell>
            <CTableHeaderCell scope="col">Percentage</CTableHeaderCell>
            <CTableHeaderCell scope="col">Comments</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            mileStoneList.length > 0 &&
            mileStoneList?.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                  <CTableDataCell>{item.title}</CTableDataCell>
                  <CTableDataCell>{item.crName}</CTableDataCell>
                  <CTableDataCell>{item.effort}</CTableDataCell>
                  <CTableDataCell>{item.planedDate}</CTableDataCell>
                  <CTableDataCell>{item.billable}</CTableDataCell>
                  <CTableDataCell>{item.milestonePercentage}%</CTableDataCell>
                  <CTableDataCell>{item.comments}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="danger"
                      className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                      data-testid="edit-btn"
                    >
                      <i className="fa fa-times text-white"></i>
                    </CButton>
                    <CButton
                      color="info"
                      className="btn-ovh me-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-pencil-square-o"></i>
                    </CButton>
                    <CButton
                      color="info"
                      className="btn-ovh me-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-bar-chart text-white"></i>
                    </CButton>
                    <CButton
                      color="info"
                      className="btn-ovh me-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-comments text-white"></i>
                    </CButton>
                    <CButton
                      color="danger"
                      className="btn-ovh me-1 btn-ovh-employee-list"
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      {mileStoneList?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {mileStoneListSize}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {mileStoneListSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {mileStoneListSize > 20 && (
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

export default MileStoneTable
