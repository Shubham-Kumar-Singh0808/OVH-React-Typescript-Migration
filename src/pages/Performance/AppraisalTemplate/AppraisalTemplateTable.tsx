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
import { GetDesignationsUnderCycle } from '../../../types/Performance/AppraisalTemplate/appraisalTemplateTypes'

const AppraisalTemplateTable = ({
  selectAppraisalId,
  setToggle,
  setEditAppraisalId,
}: {
  selectAppraisalId: string
  setToggle: (value: string) => void
  setEditAppraisalId: React.Dispatch<
    React.SetStateAction<GetDesignationsUnderCycle | undefined>
  >
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const designationsUnderCycle = useTypedSelector(
    reduxServices.appraisalTemplate.selectors.designationsUnderCycle,
  )

  const appraisalTemplateListSize = useTypedSelector(
    reduxServices.appraisalTemplate.selectors.listSize,
  )

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
  } = usePagination(appraisalTemplateListSize, pageSizeFromState, pageFromState)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const editCycleHandler = (
    departmentId: number,
    designationId: number,
    cycle: GetDesignationsUnderCycle,
  ) => {
    setToggle('editViewAppraisalTemplate')
    dispatch(
      reduxServices.appraisalTemplate.getDesignationWiseKRAs({
        departmentId,
        designationId,
      }),
    )
    setEditAppraisalId(cycle)
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
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {getItemNumber(index)}
                  </CTableDataCell>
                  <CTableDataCell>
                    {cycle?.appraisalCycleDto?.name}
                  </CTableDataCell>
                  <CTableDataCell>
                    {cycle.designation.departmentName}
                  </CTableDataCell>
                  <CTableDataCell>{cycle.designation.name}</CTableDataCell>
                  <CTableDataCell>
                    <CTooltip content="View">
                      <CButton
                        className="btn-ovh btn-ovh-employee-list me-1 sh-eye-btn-color"
                        onClick={() =>
                          editCycleHandler(
                            cycle.designation.departmentId,
                            cycle.designation?.id,
                            cycle,
                          )
                        }
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i>
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
          <strong>
            {designationsUnderCycle?.length
              ? `Total Records: ${appraisalTemplateListSize}`
              : `No Records Found...`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {appraisalTemplateListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {appraisalTemplateListSize > 20 && (
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
