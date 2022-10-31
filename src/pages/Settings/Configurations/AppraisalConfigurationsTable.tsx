import React, { useEffect } from 'react'
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
} from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import { usePagination } from '../../../middleware/hooks/usePagination'

const AppraisalConfigurationsTable = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const appraisalCycleNames = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.appraisalCycleNames,
  )

  useEffect(() => {
    dispatch(reduxServices.appraisalConfigurations.getAllAppraisalCycle())
  }, [dispatch])

  const pageFromState = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.pageSizeFromState,
  )
  const {
    paginationRange,
    setCurrentPage,
    setPageSize,
    currentPage,
    pageSize,
  } = usePagination(
    appraisalCycleNames.length,
    pageSizeFromState,
    pageFromState,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }
  return (
    <>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Review Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Review Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Duration(days)</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Service Period(days)
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Active</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {appraisalCycleNames.length > 0 &&
            appraisalCycleNames?.map((appraisalCycle, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{appraisalCycle.name}</CTableDataCell>
                <CTableDataCell>{appraisalCycle.appraisalType}</CTableDataCell>
                <CTableDataCell>{appraisalCycle.toDate}</CTableDataCell>
                <CTableDataCell>{appraisalCycle.fromDate}</CTableDataCell>
                <CTableDataCell>
                  {appraisalCycle.appraisalDuration}
                </CTableDataCell>
                <CTableDataCell>{appraisalCycle.servicePeriod}</CTableDataCell>
                <CTableDataCell>{appraisalCycle.active}</CTableDataCell>
                <CTableDataCell>{appraisalCycle.description}</CTableDataCell>
                <CTableDataCell scope="row">
                  <>
                    <CButton
                      size="sm"
                      color="info"
                      className="btn-ovh me-1 btn-sm"
                    >
                      <i className="fa fa-edit" aria-hidden="true"></i>
                    </CButton>
                  </>
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <>
                    <CButton
                      size="sm"
                      color="info"
                      className="btn-ovh me-1 btn-sm"
                    >
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </CButton>
                  </>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
      {appraisalCycleNames.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {appraisalCycleNames.length}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {appraisalCycleNames.length > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {appraisalCycleNames.length > 20 && (
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
          <CRow className="mt-3 ms-3">
            <p>
              <strong>No Records Found... </strong>
            </p>
          </CRow>
        </CCol>
      )}
    </>
  )
}
export default AppraisalConfigurationsTable
