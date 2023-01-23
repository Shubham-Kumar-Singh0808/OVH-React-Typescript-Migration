import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CTooltip,
  CButton,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const AppraisalTemplateTable = ({
  selectAppraisalId,
}: {
  selectAppraisalId: string
}): JSX.Element => {
  const designationsUnderCycle = useTypedSelector(
    reduxServices.appraisalTemplate.selectors.designationsUnderCycle,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (selectAppraisalId)
      dispatch(
        reduxServices.appraisalTemplate.getDesignationsUnderCycle({
          cycleId: Number(selectAppraisalId),
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
        }),
      )
  }, [dispatch, selectAppraisalId])

  console.log(designationsUnderCycle)

  const pageFromState = useTypedSelector(
    reduxServices.category.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.category.selectors.pageSizeFromState,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(
    designationsUnderCycle?.length,
    pageSizeFromState,
    pageFromState,
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
      <CTable striped responsive className="mt-5 align-middle alignment">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Appraisal Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Department</CTableHeaderCell>
            <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-center">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {designationsUnderCycle?.length > 0 &&
            designationsUnderCycle?.map((cycle, index) => {
              return (
                <CTableRow key={getItemNumber(index)}>
                  {cycle?.kraLookups.map((item, index) => {
                    return (
                      <>
                        <CTableDataCell key={index}>
                          {item?.departmentName}
                        </CTableDataCell>
                        <CTableDataCell key={index}>
                          {item?.designationName}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CTooltip content="view">
                            <CButton
                              className="btn-ovh-employee-list cursor-pointer"
                              color="info-light btn-ovh me-1"
                              data-testid="view-btn"
                            >
                              <i
                                className="fa fa-eye text-white"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                          </CTooltip>
                        </CTableDataCell>
                      </>
                    )
                  })}
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong>
            {designationsUnderCycle?.length
              ? `Total Records: ${designationsUnderCycle?.length}`
              : `No Records Found...`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {designationsUnderCycle?.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {designationsUnderCycle?.length > 20 && (
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

export default AppraisalTemplateTable
