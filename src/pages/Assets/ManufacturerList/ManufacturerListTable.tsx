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
import React from 'react'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OPagination from '../../../components/ReusableComponent/OPagination'

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

  const Manufacturer = useTypedSelector(
    reduxServices.ManufacturerList.selectors.manufacturerList,
  )
  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }
  const listSize = useTypedSelector(
    reduxServices.ManufacturerList.selectors.listSize,
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
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Manufacturer Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Last Updated by</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {Manufacturer?.length > 0 &&
              Manufacturer?.map((manufacturer, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableHeaderCell>{getItemNumber(index)}</CTableHeaderCell>
                    <CTableDataCell>
                      {manufacturer.manufacturerName}
                    </CTableDataCell>
                    <CTableDataCell>{manufacturer.productName}</CTableDataCell>
                    <CTableDataCell>{manufacturer.createdBy}</CTableDataCell>
                    <CTableDataCell scope="row">
                      <CTooltip content="Edit">
                        <CButton
                          color="info"
                          className="btn-ovh me-1 btn-ovh-employee-list"
                          data-testid="edit-family"
                        >
                          <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                      </CTooltip>

                      <CTooltip content="Delete">
                        <CButton
                          data-testid="delete-family"
                          size="sm"
                          color="danger btn-ovh me-1"
                          className="btn-ovh-employee-list"
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
          </CTableBody>
        </CTable>

        <CRow>
          <CCol md={3} className="no-records">
            <strong>
              {listSize ? `Total Records: ${listSize}` : `No records found.`}
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
