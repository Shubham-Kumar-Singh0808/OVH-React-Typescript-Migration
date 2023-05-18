import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react-pro'
import ProductTypeListTable from './ProductTypeListTable'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OCard from '../../../components/ReusableComponent/OCard'
import { downloadFile } from '../../../utils/helper'
import ProductTypeAPI from '../../../middleware/api/Assets/ProductTypeList/ProductTypeListApi'

const ProductTypeList = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useAppDispatch()

  const TotalListSize = useTypedSelector(
    reduxServices.ProductTypeList.selectors.listSize,
  )

  const selectCurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessProductList = userAccessToFeatures?.find(
    (feature) => feature.name === 'Product Type List',
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,

    pageSize,
  } = usePagination(TotalListSize, 20)

  useEffect(() => {
    if (selectCurrentPage) {
      setCurrentPage(selectCurrentPage)
    }
  }, [selectCurrentPage])

  useEffect(() => {
    dispatch(
      reduxServices.ProductTypeList.getProductTypeList({
        endIndex: pageSize * currentPage,
        startIndex: pageSize * (currentPage - 1),
        productName: '',
      }),
    )
  }, [currentPage, dispatch, pageSize])

  const handleExportProjectList = async () => {
    const ExportProductList = await ProductTypeAPI.ExportProductListDownloading(
      {
        productSearch: searchInput,
        token: '',
      },
    )
    downloadFile(ExportProductList, 'ExportProductList.csv')
  }

  useEffect(() => {
    if (window.location.pathname === '/productList') {
      setCurrentPage(1)
    }
  }, [])

  const handleSearchBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter')
      dispatch(
        reduxServices.ProductTypeList.getProductTypeList({
          endIndex: 20,
          productName: searchInput,
          startIndex: 0,
        }),
      )
  }
  const multiSearchBtnHandler = () => {
    dispatch(
      reduxServices.ProductTypeList.getProductTypeList({
        endIndex: 20,
        productName: searchInput,
        startIndex: 0,
      }),
    )
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Product Type List"
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
              onClick={handleExportProjectList}
            >
              <i className="fa fa-plus me-1"></i>
              Click to Export
            </CButton>
            {userAccessProductList?.updateaccess && (
              <CButton color="info btn-ovh me-0" data-testid="add-button">
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
        <>
          <ProductTypeListTable
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </>
      </OCard>
    </>
  )
}
export default ProductTypeList
