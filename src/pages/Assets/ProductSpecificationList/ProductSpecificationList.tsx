import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react-pro'
import ProductSpecificationListTable from './ProductSpecificationListTable'
import AddProduct from './AddNewProduct/AddProductSpecificationList'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import productSpecificationListApi from '../../../middleware/api/Assets/ProductSpecificationList/ProductSpecificationListApi'
import { downloadFile } from '../../../utils/helper'

const ProductSpecificationList = (): JSX.Element => {
  const employees = useTypedSelector(
    reduxServices.productSpecificationList.selectors.productSpecificationList,
  )
  const [searchInput, setSearchInput] = useState<string>('')
  const [toggle, setToggle] = useState<string>('')

  const dispatch = useAppDispatch()
  const listSize = useTypedSelector(
    reduxServices.productSpecificationList.selectors.listSize,
  )
  const isLoading = useTypedSelector(
    reduxServices.productSpecificationList.selectors.isLoading,
  )
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)
  useEffect(() => {
    dispatch(
      reduxServices.productSpecificationList.getProductSpecificationList({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        productName: '',
      }),
    )
  }, [currentPage, dispatch, pageSize])
  console.log(employees)
  const handleSearchBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.productSpecificationList.getProductSpecificationList({
          endIndex: 20,
          productName: searchInput,
          startIndex: 0,
        }),
      )
    }
  }

  const multiSearchBtnHandler = () => {
    dispatch(
      reduxServices.productSpecificationList.getProductSpecificationList({
        endIndex: 20,
        productName: searchInput,
        startIndex: 0,
      }),
    )
  }
  const handleExportData = async () => {
    const productSpecificationListDownload =
      await productSpecificationListApi.exportProductSpecificationData({
        specificationSearch: '',
        endIndex: 0,
        productName: '',
        startIndex: 0,
      })
    downloadFile(
      productSpecificationListDownload,
      'ProductSpecificationList.csv',
    )
  }

  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="Product Specification List"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <div className="d-inline ml15 pull-right">
            <CButton
              color="info"
              className="text-white btn-ovh"
              size="sm"
              onClick={handleExportData}
              data-testid="employee-export-btn"
            >
              <i className="fa fa-plus me-1"></i>
              Click to Export
            </CButton>
            &nbsp; &nbsp; &nbsp;
            <CButton
              color="info"
              className="text-white btn-ovh"
              size="sm"
              onClick={() => setToggle('/addAssetType')}
            >
              <i className="fa fa-plus me-1"></i>
              Add
            </CButton>
          </div>
          <CRow className="gap-2 d-md-flex justify-content-md-end">
            <CCol sm={3} md={3}>
              <CInputGroup className="global-search me-0 justify-content-md-end">
                <CFormInput
                  data-testid="searchField"
                  placeholder="Multiple Search"
                  aria-label="Multiple Search"
                  aria-describedby="button-addon2"
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
          {isLoading !== ApiLoadingState.loading ? (
            <>
              <ProductSpecificationListTable
                paginationRange={paginationRange}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            </>
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </OCard>
      )}
      {toggle === '/addAssetType' && <AddProduct setToggle={setToggle} />}
    </>
  )
}

export default ProductSpecificationList
