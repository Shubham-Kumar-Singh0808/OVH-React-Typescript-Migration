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
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OModal from '../../../components/ReusableComponent/OModal'
import {
  ProductTypeListTableProps,
  ProductTypeListType,
} from '../../../types/Assets/ProductTypeList/ProductTypeListTypes'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OToast from '../../../components/ReusableComponent/OToast'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const ProductTypeListTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  setToggle,
  setEditProductType,
}: ProductTypeListTableProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteProductTypeId, setToDeleteProductTypeId] = useState(0)
  const [toDeleteProductTypeName, setToDeleteProductTypeName] = useState('')

  const isLoading = useTypedSelector(
    reduxServices.ProductTypeList.selectors.isLoading,
  )
  const ProductTypeList = useTypedSelector(
    reduxServices.ProductTypeList.selectors.ProductTypeLists,
  )
  const totalListSize = useTypedSelector(
    reduxServices.ProductTypeList.selectors.listSize,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessProductList = userAccessToFeatures?.find(
    (feature) => feature.name === 'Product Type List',
  )

  const handleShowDeleteModal = (productId: number, productName: string) => {
    setIsDeleteModalVisible(true)
    setToDeleteProductTypeId(productId)
    setToDeleteProductTypeName(productName)
  }

  const deleteFailedToastMessage = (
    <OToast
      toastMessage="This product type is used in the manufacturer,So you cannot delete"
      toastColor="danger"
      data-testid="failedToast"
    />
  )

  const deletedToastElement = (
    <OToast
      toastColor="success"
      toastMessage="Prodution Deleted Successfully"
    />
  )
  useEffect(() => {
    dispatch(
      reduxServices.ProductTypeList.getProductTypeList({
        endIndex: pageSize * currentPage,
        startIndex: pageSize * (currentPage - 1),
        productName: '',
      }),
    )
  }, [currentPage, dispatch, pageSize])

  const onHandlerPageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const handleConfirmDeleteProductTypeDetails = async () => {
    setIsDeleteModalVisible(false)
    const DeleteProductType = await dispatch(
      reduxServices.ProductTypeList.DeleteProductType(toDeleteProductTypeId),
    )
    if (
      reduxServices.ProductTypeList.DeleteProductType.fulfilled.match(
        DeleteProductType,
      )
    ) {
      dispatch(
        reduxServices.ProductTypeList.getProductTypeList({
          endIndex: pageSize * currentPage,
          startIndex: pageSize * (currentPage - 1),
          productName: '',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(deletedToastElement))
    } else if (
      reduxServices.ProductTypeList.DeleteProductType.rejected.match(
        DeleteProductType,
      ) &&
      DeleteProductType.payload === 500
    ) {
      dispatch(reduxServices.app.actions.addToast(deleteFailedToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const editButtonHandler = (ProductType: ProductTypeListType) => {
    setToggle('ProductData')
    setEditProductType(ProductType)
    window.scrollTo(0, 0)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }
  const totalRecordList = ProductTypeList?.list?.length
    ? `Total Records: ${totalListSize}`
    : `No Records found...`

  return (
    <>
      {isLoading !== ApiLoadingState?.loading ? (
        <>
          <CTable striped align="middle">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Asset Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Last Updated by</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              <>
                {ProductTypeList?.list?.length > 0 &&
                  ProductTypeList?.list?.map((ProductType, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell scope="col">
                          {getItemNumber(index)}
                        </CTableDataCell>
                        <CTableDataCell scope="col">
                          {ProductType.productName}
                        </CTableDataCell>
                        <CTableDataCell scope="col">
                          {ProductType.assetType}
                        </CTableDataCell>
                        <CTableDataCell scope="col">
                          {ProductType.createdBy || 'N/A'}
                        </CTableDataCell>
                        <CTableDataCell scope="col">
                          {userAccessProductList?.updateaccess && (
                            <CTooltip content="Edit">
                              <CButton
                                color="info btn-ovh me-1"
                                className="btn-ovh-employee-list me-1"
                                data-testid="btn-edit"
                                onClick={() => editButtonHandler(ProductType)}
                              >
                                <i
                                  className="fa fa-edit"
                                  aria-hidden="true"
                                ></i>
                              </CButton>
                            </CTooltip>
                          )}
                          {userAccessProductList?.deleteaccess && (
                            <CTooltip content="Delete">
                              <CButton
                                data-testid="btn-delete"
                                size="sm"
                                color="danger btn-ovh me-1"
                                className="btn-ovh-employee-list me-1"
                                onClick={() =>
                                  handleShowDeleteModal(
                                    ProductType.productId,
                                    ProductType.productName,
                                  )
                                }
                              >
                                <i
                                  className="fa fa-trash-o"
                                  aria-hidden="true"
                                ></i>
                              </CButton>
                            </CTooltip>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
              </>
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p className="mt-2">
                <strong>{totalRecordList}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {totalListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={onHandlerPageSize}
                  options={[20, 40, 60, 80, 100]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {totalListSize > 20 && (
              <CCol
                xs={5}
                className="d-grid gap-1 d-md-flex justify-content-md-end"
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
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Product Type"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmDeleteProductTypeDetails}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this{' '}
          <strong>{toDeleteProductTypeName}</strong> Product ?
        </>
      </OModal>
    </>
  )
}
export default ProductTypeListTable
