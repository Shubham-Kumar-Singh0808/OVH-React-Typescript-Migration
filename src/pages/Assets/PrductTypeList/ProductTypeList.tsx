import React, { useEffect, useState } from 'react'
import { CButton, CCol, CFormInput, CInputGroup, CRow } from '@coreui/react-pro'
import ProductTypeListTable from './ProductTypeListTable'
import AddProductType from './addproductType/AddProductType'
import EditProductTypeRecord from './addproductType/EditProductType'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OCard from '../../../components/ReusableComponent/OCard'
import { downloadFile } from '../../../utils/helper'
import ProductTypeAPI from '../../../middleware/api/Assets/ProductTypeList/ProductTypeListApi'
import { ProductTypeListType } from '../../../types/Assets/ProductTypeList/ProductTypeListTypes'

const ProductTypeList = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState('')
  const [toggle, setToggle] = useState<string>('')
  const dispatch = useAppDispatch()
  const initialProduct = {} as ProductTypeListType
  const [EditProductType, setEditProductType] = useState(initialProduct)

  const TotalListSize = useTypedSelector(
    reduxServices.ProductTypeList.selectors.listSize,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessProductList = userAccessToFeatures?.find(
    (feature) => feature.name === 'Product Type List',
  )

  const selectCurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )
  useEffect(() => {
    if (selectCurrentPage) {
      setCurrentPage(selectCurrentPage)
    }
  }, [selectCurrentPage])
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(TotalListSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.ProductTypeList.getProductTypeList({
        endIndex: pageSize * currentPage,
        startIndex: pageSize * (currentPage - 1),
        productName: searchInput || '',
      }),
    )
  }, [currentPage, dispatch, pageSize])

  useEffect(() => {
    dispatch(reduxServices.ProductTypeList.getAllLookUpsApi())
  }, [dispatch])

  useEffect(() => {
    if (window.location.pathname === '/productList') {
      setCurrentPage(1)
    }
  }, [])
  console.log(currentPage)

  const handleExportProductTypeList = async () => {
    const ExportProductList = await ProductTypeAPI.ExportProductListDownloading(
      {
        productSearch: searchInput,
        token: '',
      },
    )
    downloadFile(ExportProductList, 'ExportProductList.csv')
  }

  const handleSearchBtns = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.ProductTypeList.getProductTypeList({
          endIndex: 20,
          productName: searchInput,
          startIndex: 0,
        }),
      )
      setCurrentPage(1)
      setPageSize(20)
    }
  }
  const multiSearchBtnHandlers = () => {
    dispatch(
      reduxServices.ProductTypeList.getProductTypeList({
        endIndex: 20,
        productName: searchInput,
        startIndex: 0,
      }),
    )
    setCurrentPage(1)
    setPageSize(20)
  }

  return (
    <>
      {toggle === '' && (
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
                onClick={handleExportProductTypeList}
              >
                <i className="fa fa-plus me-1"></i>
                Click to Export
              </CButton>
              {userAccessProductList?.createaccess && (
                <CButton
                  color="info btn-ovh me-0"
                  data-testid="add-button"
                  onClick={() => setToggle('AddProductType')}
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
                  onKeyDown={handleSearchBtns}
                />
                <CButton
                  disabled={!searchInput}
                  data-testid="multi-search-btn"
                  className="cursor-pointer"
                  type="button"
                  color="info"
                  id="button-addon2"
                  onClick={multiSearchBtnHandlers}
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
              setToggle={setToggle}
              setEditProductType={setEditProductType}
            />
          </>
        </OCard>
      )}
      {toggle === 'AddProductType' && <AddProductType setToggle={setToggle} />}

      {toggle === 'ProductData' && (
        <EditProductTypeRecord
          setToggle={setToggle}
          EditProductType={EditProductType}
          setEditProductType={setEditProductType}
        />
      )}
    </>
  )
}
export default ProductTypeList
