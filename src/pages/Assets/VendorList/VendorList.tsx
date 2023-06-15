import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react-pro'
import VendorListTable from './VendorListTable'
import AddVendorDetails from './AddVendorDetails/AddVendorDetails'
import EditVendorDetails from './EditVendorDetails/EditVendorDetails'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import vendorListApi from '../../../middleware/api/Assets/VendorList/vendorListApi'
import { downloadFile } from '../../../utils/helper'
import { VendorDetails } from '../../../types/Assets/VendorList/vendorListTypes'

const VendorList = (): JSX.Element => {
  const [toggle, setToggle] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const initialCycle = {} as VendorDetails
  const [editVendorInfo, setEditVendorInfo] = useState(initialCycle)
  const dispatch = useAppDispatch()
  const vendorListSize = useTypedSelector(
    reduxServices.vendorList.selectors.listSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.vendorList.selectors.isLoading,
  )

  const vendorListData = useTypedSelector(
    reduxServices.vendorList.selectors.vendorLists,
  )

  const vendorsData = useTypedSelector(
    reduxServices.vendorList.selectors.vendors,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(vendorListSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.vendorList.getVendors({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        vendorName: searchInput || '',
      }),
    )
    dispatch(reduxServices.addNewVendor.getDepartment())
  }, [currentPage, dispatch, pageSize])

  const handleExportVendorListData = async () => {
    const vendorListDownload = await vendorListApi.exportVendorListData({
      vendorNameSearch: searchInput,
      token: '',
    })
    downloadFile(vendorListDownload, 'VendorList.csv')
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

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Vendor List',
  )

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
    <>
      {toggle === '' && (
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
              {vendorsData?.length > 0 && (
                <CButton
                  color="info"
                  className="text-white btn-ovh"
                  size="sm"
                  onClick={handleExportVendorListData}
                >
                  <i className="fa fa-plus me-1"></i>
                  Click to Export
                </CButton>
              )}
              {userAccess?.createaccess && (
                <CButton
                  color="info btn-ovh me-0"
                  data-testid="addButton"
                  onClick={() => setToggle('addVendorDetails')}
                >
                  <i className="fa fa-plus me-1"></i>Add
                </CButton>
              )}
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
                setToggle={setToggle}
                setEditVendorInfo={setEditVendorInfo}
                userAccess={userAccess}
              />
            </>
          ) : (
            <>
              <OLoadingSpinner type={LoadingType.PAGE} />
            </>
          )}
        </OCard>
      )}
      {toggle === 'addVendorDetails' && (
        <AddVendorDetails setToggle={setToggle} />
      )}
      {toggle === 'editVendorDetails' && (
        <EditVendorDetails
          setToggle={setToggle}
          editVendorInfo={editVendorInfo}
          setEditVendorInfo={setEditVendorInfo}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      )}
    </>
  )
}

export default VendorList
