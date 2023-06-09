import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react-pro'
import ManufacturerListTable from './ManufacturerListTable'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { downloadFile } from '../../../utils/helper'
import AddManufacturerList from '../AddManufacturer/AddManufacturerList'
import EditManufacturerList from '../EditManufacturer/EditManufacturerList'
import { ManufacturerDetails } from '../../../types/Assets/ManufacturerList/ManufacturerType'
import ManufacturerApi from '../../../middleware/api/Assets/ManufacturerList/ManufacturerListApi'

const Manufacturer = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [searchInput, setSearchInput] = useState<string>('')
  const [toggle, setToggle] = useState<string>('')

  const manufacturerListSize = useTypedSelector(
    reduxServices.ManufacturerList.selectors.listSize,
  )

  const initialManufacturerList = {} as ManufacturerDetails
  const [editManufacturerData, setEditManufacturerData] =
    useState<ManufacturerDetails>(initialManufacturerList)
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(manufacturerListSize, 20)
  useEffect(() => {
    dispatch(
      reduxServices.ManufacturerList.getManufacturerList({
        endIndex: pageSize * currentPage,
        manufacturerName: searchInput,
        startIndex: pageSize * (currentPage - 1),
        search: searchInput || '',
      }),
    )
  }, [currentPage, dispatch, pageSize])

  useEffect(() => {
    if (window.location.pathname === '/manufacturerList') {
      setCurrentPage(1)
    }
  }, [])
  const handleExportLeaveReportData = async () => {
    const employeeLeaveReportDataDownload =
      await ManufacturerApi.exportManufacturerData({
        manufacturerNameSearch: searchInput,
        token: '',
      })

    downloadFile(employeeLeaveReportDataDownload, 'manufacturerList.csv')
  }
  const handleSearchBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.ManufacturerList.getManufacturerList({
          endIndex: 20,
          manufacturerName: searchInput,
          startIndex: 0,
        }),
      )
      setCurrentPage(1)
      setPageSize(20)
    }
  }

  const multiSearchBtnHandler = () => {
    dispatch(
      reduxServices.ManufacturerList.getManufacturerList({
        endIndex: 20,
        manufacturerName: searchInput,
        startIndex: 0,
      }),
    )
    setCurrentPage(1)
    setPageSize(20)
  }
  useEffect(() => {
    dispatch(reduxServices.ProductTypeList.getAllLookUpsApi())
  }, [dispatch])

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Manufacturer List',
  )

  return (
    <>
      {toggle === '' && (
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
                color="info btn-ovh me-0"
                className="btn btn-info btn-sm text-white me-3"
                size="sm"
                onClick={handleExportLeaveReportData}
              >
                <i className="fa fa-plus me-1"></i>
                Click to Export
              </CButton>
              {userAccess?.createaccess && (
                <CButton
                  color="info btn-ovh me-0"
                  data-testid="addButton"
                  onClick={() => setToggle('AddManufacturerList')}
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
            searchInput={searchInput}
            setToggle={setToggle}
            setEditManufacturerData={setEditManufacturerData}
            userAccess={userAccess}
          />
        </OCard>
      )}
      {toggle === 'AddManufacturerList' && (
        <AddManufacturerList setToggle={setToggle} />
      )}
      {toggle === 'EditManufacturerList' && (
        <EditManufacturerList
          setToggle={setToggle}
          editManufacturerData={editManufacturerData}
          setEditManufacturerData={setEditManufacturerData}
        />
      )}
    </>
  )
}

export default Manufacturer
