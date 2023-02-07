import React, { useMemo } from 'react'
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
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { currentPageData } from '../../../utils/paginationUtils'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'

const ProcessAreaTable = ({
  selectCategory,
}: {
  selectCategory: string
}): JSX.Element => {
  const ProjectTailoringList = useTypedSelector(
    reduxServices.processArea.selectors.ProjectTailoringList,
  )

  const result = ProjectTailoringList?.filter(
    (value) => value.processHeadname === selectCategory,
  )

  const pageFromState = useTypedSelector(
    reduxServices.processArea.selectors.pageFromState,
  )

  const pageSizeFromState = useTypedSelector(
    reduxServices.processArea.selectors.pageSizeFromState,
  )

  const dispatch = useAppDispatch()

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(result.length, pageSizeFromState, pageFromState)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const currentPageItems = useMemo(
    () => currentPageData(result, currentPage, pageSize),
    [result, currentPage, pageSize],
  )

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
            <CTableHeaderCell scope="col">Process Area</CTableHeaderCell>
            <CTableHeaderCell scope="col">Document</CTableHeaderCell>
            <CTableHeaderCell scope="col">Responsible</CTableHeaderCell>
            <CTableHeaderCell scope="col">Document Link</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status </CTableHeaderCell>
            <CTableHeaderCell scope="col">Order </CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentPageItems?.length > 0 &&
            currentPageItems?.map((cycle) => {
              return (
                <>
                  {cycle.processSubHeadsDto.length > 0 &&
                    cycle.processSubHeadsDto?.map((count, index) => {
                      return (
                        <>
                          <CTableRow key={index}>
                            <CTableDataCell scope="row">
                              {getItemNumber(index)}
                            </CTableDataCell>
                            <CTableDataCell>
                              {count.processSubHeadName || 'N/A'}
                            </CTableDataCell>
                            <CTableDataCell>
                              {count?.documentName || 'N/A'}
                            </CTableDataCell>
                            <CTableDataCell>
                              {count?.responsible || 'N/A'}
                            </CTableDataCell>
                            <CTableDataCell>
                              {count?.link || 'N/A'}
                            </CTableDataCell>
                            <CTableDataCell>
                              {count.status === 'true'
                                ? 'Active'
                                : 'Inactive' || 'N/A'}
                            </CTableDataCell>
                            <CTableDataCell>
                              {count?.order || 'N/A'}
                            </CTableDataCell>
                            <CTableDataCell>
                              <CTooltip content="Edit">
                                <CButton
                                  size="sm"
                                  className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                                  color="info btn-ovh me-1"
                                >
                                  <i
                                    className="fa fa-edit"
                                    aria-hidden="true"
                                  ></i>
                                </CButton>
                              </CTooltip>
                            </CTableDataCell>
                          </CTableRow>
                        </>
                      )
                    })}
                </>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong>
            {result?.length
              ? `Total Records: ${result.length}`
              : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {result?.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {result?.length > 20 && (
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
export default ProcessAreaTable
