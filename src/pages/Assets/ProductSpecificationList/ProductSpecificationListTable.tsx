import {
  CButton,
  CCol,
  CLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { ProductSpecificationListTableProps } from '../../../types/Assets/ProductSpecificationList/ProductSpecificationListTypes'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OModal from '../../../components/ReusableComponent/OModal'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const ProductSpecificationListTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: ProductSpecificationListTableProps): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [productSpecificationId, setProductSpecificationsId] =
    useState<string>('')

  const handleModal = (specificationDetails: string) => {
    setIsModalVisible(true)
    setProductSpecificationsId(specificationDetails)
  }
  const productSpecification = useTypedSelector(
    reduxServices.productSpecificationList.selectors.productSpecificationList,
  )
  const listSize = useTypedSelector(
    reduxServices.productSpecificationList.selectors.listSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.productSpecificationList.selectors.isLoading,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }
  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  return (
    <>
      <>
        <CTable striped align="middle">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Manufacturer Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Product Specification
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Last Updated by</CTableHeaderCell>
              <CTableHeaderCell scope="col" data-testid="action-header">
                Actions
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody color="light">
            {isLoading !== ApiLoadingState?.loading ? (
              productSpecification?.length > 0 &&
              productSpecification?.map((productSpecificationItem, index) => {
                const removeSpaces =
                  productSpecificationItem?.productSpecification
                    ?.replace(/\s+/g, ' ')
                    ?.replace('/(<([^>]+)>)/gi', '')
                    .trim()
                    .replace(/&nbsp;/g, '')
                const productSpecificationLimit =
                  removeSpaces && removeSpaces.length > 30
                    ? `${removeSpaces.substring(0, 30)}...`
                    : removeSpaces
                return (
                  <CTableRow key={index}>
                    <CTableDataCell scope="row">
                      {getItemNumber(index)}
                    </CTableDataCell>
                    <CTableDataCell>
                      {productSpecificationItem.productName}
                    </CTableDataCell>
                    <CTableDataCell>
                      {productSpecificationItem.manufacturerName}
                    </CTableDataCell>
                    {productSpecificationLimit ? (
                      <CTableDataCell
                        scope="row"
                        className="sh-organization-link"
                      >
                        <CLink
                          className="cursor-pointer text-primary centerAlignment-text"
                          data-testid={`product-specification${index}`}
                          onClick={() =>
                            handleModal(
                              productSpecificationItem.productSpecification,
                            )
                          }
                        >
                          {parse(productSpecificationItem.productSpecification)}
                        </CLink>
                      </CTableDataCell>
                    ) : (
                      <CTableDataCell>{`N/A`}</CTableDataCell>
                    )}
                    <CTableDataCell>
                      {productSpecificationItem.createdBy}
                    </CTableDataCell>
                    <CTableDataCell data-testid="action-cell">
                      <CTooltip content="Edit">
                        <CButton
                          color="info"
                          size="sm"
                          className="btn-ovh-employee-list"
                        >
                          <i className="text-white fa fa-pencil-square-o"></i>
                        </CButton>
                      </CTooltip>
                      &nbsp; &nbsp; &nbsp;
                      <CTooltip content="Delete">
                        <CButton color="danger" className="btn-ovh me-2">
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>
                    </CTableDataCell>
                  </CTableRow>
                )
              })
            ) : (
              <OLoadingSpinner type={LoadingType.PAGE} />
            )}
          </CTableBody>
        </CTable>
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {listSize}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {listSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
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
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      >
        <p>
          <span className="descriptionField">
            <div
              dangerouslySetInnerHTML={{
                __html: productSpecificationId,
              }}
            />
          </span>
        </p>
      </OModal>
    </>
  )
}

export default ProductSpecificationListTable
