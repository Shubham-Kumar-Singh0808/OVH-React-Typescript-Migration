import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react-pro'
import ProductSpecificationListTable from './ProductSpecificationListTable'
import EditProductSpecification from './EditProductSpecification/EditProductSpecification'
import AddProduct from './AddNewProductSpecification/AddProductSpecificationList'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import productSpecificationListApi from '../../../middleware/api/Assets/ProductSpecificationList/ProductSpecificationListApi'
import { downloadFile } from '../../../utils/helper'
import { ProductSpecifications } from '../../../types/Assets/ProductSpecificationList/ProductSpecificationListTypes'

const ProductSpecificationList = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [toggle, setToggle] = useState<string>('')

  const productSpecification = {} as ProductSpecifications

  const [editProductSpecification, setEditProductSpecification] =
    useState(productSpecification)

  const productSpecificationList = useTypedSelector(
    reduxServices.productSpecificationList.selectors.productSpecificationList,
  )

  const dispatch = useAppDispatch()
  const listSize = useTypedSelector(
    reduxServices.productSpecificationList.selectors.listSize,
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

  const handleSearchByEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      if (searchInput === '') {
        dispatch(
          reduxServices.productSpecificationList.getProductSpecificationList({
            productName: searchInput,
            startIndex: 0,
            endIndex: 20,
          }),
        )
        setCurrentPage(1)
      } else {
        dispatch(
          reduxServices.productSpecificationList.getProductSpecificationList({
            productName: searchInput,
            startIndex: pageSize * (currentPage - 1),
            endIndex: pageSize * currentPage,
          }),
        )
      }
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
        specificationSearch: searchInput,
        endIndex: 0,
        productName: '',
        startIndex: 0,
      })
    downloadFile(
      productSpecificationListDownload,
      'ProductSpecificationList.csv',
    )
  }

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Product Specification List',
  )
  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="Product Specification List"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <CRow className="d-md-flex justify-content-md-end">
            <CCol
              lg={12}
              className="gap-4 d-md-flex justify-content-end mt-3 mb-3"
            >
              <div className="d-inline ml15 pull-right">
                {productSpecificationList?.length > 0 ? (
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
                ) : (
                  ''
                )}
                &nbsp; &nbsp; &nbsp;
                {userAccess?.createaccess && (
                  <CButton
                    color="info"
                    className="text-white btn-ovh"
                    size="sm"
                    data-testid="add-product"
                    onClick={() => setToggle('/addAssetType')}
                  >
                    <i className="fa fa-plus me-1"></i>
                    Add
                  </CButton>
                )}
              </div>
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
                  value={searchInput}
                  onChange={(e) => {
                    setSearchInput(e.target.value)
                  }}
                  onKeyDown={handleSearchByEnter}
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
            <ProductSpecificationListTable
              paginationRange={paginationRange}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              setEditProductSpecification={setEditProductSpecification}
              setToggle={setToggle}
              userAccess={userAccess}
            />
          </>
        </OCard>
      )}
      {toggle === '/addAssetType' && <AddProduct setToggle={setToggle} />}
      {toggle === '/editProductSpecification' && (
        <EditProductSpecification
          setToggle={setToggle}
          editProductSpecification={editProductSpecification}
          setEditProductSpecification={setEditProductSpecification}
        />
      )}
    </>
  )
}

export default ProductSpecificationList
