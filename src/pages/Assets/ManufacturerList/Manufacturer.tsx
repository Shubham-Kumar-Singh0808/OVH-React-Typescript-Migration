import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react-pro'
import ManufacturerListTable from './ManufacturerListTable'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { downloadFile } from '../../../utils/helper'
import ManufacturerApi from '../../../middleware/Assets/ManufacturerList/ManufacturerListApi'

const Manufacturer = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [searchInput, setSearchInput] = useState<string>('')

  const employees = useTypedSelector(
    reduxServices.ManufacturerList.selectors.manufacturerList,
  )
  const listSize = useTypedSelector(
    reduxServices.ManufacturerList.selectors.listSize,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  const handleSearchBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.ManufacturerList.getManufacturerList({
          endIndex: pageSize * currentPage,
          manufacturerName: searchInput,
          startIndex: pageSize * (currentPage - 1),
          search: '',
        }),
      )
    }
  }
  const handleExportLeaveReportData = async () => {
    const employeeLeaveReportDataDownload =
      await ManufacturerApi.exportManufacturerData({
        manufacturerNameSearch: searchInput,
        token: '',
      })

    downloadFile(employeeLeaveReportDataDownload, 'manufacturerList.csv')
  }

  const multiSearchBtnHandler = () => {
    dispatch(
      reduxServices.ManufacturerList.getManufacturerList({
        endIndex: pageSize * currentPage,
        manufacturerName: searchInput,
        startIndex: pageSize * (currentPage - 1),
        search: '',
      }),
    )
  }

  useEffect(() => {
    dispatch(
      reduxServices.ManufacturerList.getManufacturerList({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        manufacturerName: '',
        search: '',
      }),
    )
  }, [dispatch, currentPage, pageSize])
  console.log(employees)

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Manufacturer List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="mt-2">
          <CCol
            lg={12}
            className="gap-2 d-md-flex justify-content-end mt-3 mb-3"
            data-testid="exportBtn"
          >
            <CButton
              color="info"
              className="text-white"
              size="sm"
              onClick={handleExportLeaveReportData}
            >
              <i className="fa fa-plus me-1"></i>
              Click to Export
            </CButton>
            <CButton color="info btn-ovh me-0" data-testid="addButton">
              <i className="fa fa-plus me-1"></i>Add
            </CButton>
          </CCol>
        </CRow>
        <CRow className="gap-2 d-md-flex justify-content-md-end">
          <CCol sm={3} md={3}>
            <CInputGroup className="global-search me-0 justify-content-md-end">
              <CFormInput
                data-testid="searchField"
                placeholder="Multiple Search"
                aria-label="Multiple Search"
                aria-describedby="button-addon2"
                id="searchInput"
                name="searchInput"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value)
                }}
                onKeyDown={handleSearchBtn}
              />
              <CButton
                disabled={!searchInput}
                data-testid="multi-search-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="button-addon2"
                onClick={multiSearchBtnHandler}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
        <ManufacturerListTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </OCard>
    </>
  )
}

export default Manufacturer
