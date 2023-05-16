import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import OPageSizeSelect from '../../components/ReusableComponent/OPageSizeSelect'
import { reduxServices } from '../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import OPagination from '../../components/ReusableComponent/OPagination'

const ManufacturerListTable = ({
  paginationRange,
  setPageSize,
  setCurrentPage,
  currentPage,
  pageSize,
}: {
  paginationRange: number[]
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  pageSize: number
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const employees = useTypedSelector(
    reduxServices.ManufacturerList.selectors.manufacturerList,
  )
  const listSize = useTypedSelector(
    reduxServices.employeeList.selectors.listSize,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  return (
    <>
      <>
        <CTable striped align="middle">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">Manufacturer Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Last Updated by</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {employees?.length > 0 &&
              employees?.map((manufacturer, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableDataCell>
                      {manufacturer.manufacturerName}
                    </CTableDataCell>
                    <CTableDataCell>{manufacturer.productName}</CTableDataCell>
                    <CTableDataCell>{manufacturer.createdBy}</CTableDataCell>
                  </CTableRow>
                )
              })}
          </CTableBody>
        </CTable>
        <CRow>
          <CCol md={3} className="no-records">
            <strong>
              {listSize ? `Total Records: ${listSize}` : `Employee Not Found.`}
            </strong>
          </CCol>
          <CCol xs={3}>
            {listSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80, 100]}
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
      </>
    </>
  )
}

export default ManufacturerListTable
