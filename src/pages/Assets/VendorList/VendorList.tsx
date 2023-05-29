import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react-pro'
import VendorListTable from './VendorListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import vendorListApi from '../../../middleware/api/Assets/VendorList/vendorListApi'
import { downloadFile } from '../../../utils/helper'

const VendorList = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  const dispatch = useAppDispatch()
  const listSize = useTypedSelector(reduxServices.vendorList.selectors.listSize)

  const isLoading = useTypedSelector(
    reduxServices.vendorList.selectors.isLoading,
  )

  const selectCurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    if (selectCurrentPage) {
      setCurrentPage(selectCurrentPage)
    }
  }, [selectCurrentPage])

  useEffect(() => {
    dispatch(
      reduxServices.vendorList.getVendors({
        startIndex: pageSize * (selectCurrentPage - 1),
        endIndex: pageSize * selectCurrentPage,
        vendorName: '',
      }),
    )
  }, [selectCurrentPage, dispatch, pageSize])

  const handleExportVendorListData = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    const employeeListDownload = await vendorListApi.exportVendorListData({})
    downloadFile(employeeListDownload, 'VendorList.csv')
  }

  const searchButtonHandlerOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.vendorList.getVendors({
          startIndex: 0,
          endIndex: 20,
          vendorName: searchInput,
        }),
      )
      setCurrentPage(1)
      setPageSize(20)
    }
  }

  const searchButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      reduxServices.vendorList.getVendors({
        startIndex: 0,
        endIndex: 20,
        vendorName: searchInput,
      }),
    )
    setCurrentPage(1)
    setPageSize(20)
  }

  useEffect(() => {
    if (window.location.pathname === '/vendorList') {
      setCurrentPage(1)
    }
  }, [])

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Vendor List"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CRow className="d-md-flex justify-content-md-end">
        <CCol
          lg={12}
          className="gap-4 d-md-flex justify-content-end mt-3 mb-3"
          data-testid="exportBtn"
        >
          <CButton
            color="info"
            className="text-white btn-ovh"
            size="sm"
            onClick={handleExportVendorListData}
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
      </CRow>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <VendorListTable
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </>
      ) : (
        <>
          <OLoadingSpinner type={LoadingType.PAGE} />
        </>
      )}
    </OCard>
  )
}

export default VendorList
