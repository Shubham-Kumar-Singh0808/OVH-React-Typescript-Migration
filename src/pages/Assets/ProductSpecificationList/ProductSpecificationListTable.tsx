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
} from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
// import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { ProductSpecificationListTableProps } from '../../../types/Assets/ProductSpecificationList/ProductSpecificationListTypes'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OModal from '../../../components/ReusableComponent/OModal'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

// import OModal from '../../../components/ReusableComponent/OModal'

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
  console.log(listSize)

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
      {productSpecification.length ? (
        <>
          <CTable striped align="middle">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Manufacturer Name
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="commentWidth">
                  Product Specification
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Last Updated by</CTableHeaderCell>
                <CTableHeaderCell scope="col" data-testid="action-header">
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {productSpecification.map((productSpecification, index) => {
                const removeTag = '/(<([^>]+)>)/gi'
                const removeSpaces =
                  productSpecification?.productSpecification.replace(
                    removeTag,
                    '',
                  )
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
                      {productSpecification.productName}
                    </CTableDataCell>
                    <CTableDataCell>
                      {productSpecification.manufacturerName}
                    </CTableDataCell>
                    {productSpecificationLimit ? (
                      <CTableDataCell
                        scope="row"
                        className="sh-organization-link"
                      >
                        <CLink
                          className="cursor-pointer text-primary centerAlignment-text"
                          data-testid={`emp-comments${index}`}
                          onClick={() =>
                            handleModal(
                              productSpecification.productSpecification,
                            )
                          }
                        >
                          {parse(productSpecification.productSpecification)}
                        </CLink>
                      </CTableDataCell>
                    ) : (
                      <CTableDataCell>{`N/A`}</CTableDataCell>
                    )}
                    <CTableDataCell>
                      {productSpecification.createdBy}
                    </CTableDataCell>
                    <CTableDataCell data-testid="action-cell">
                      <CButton
                        color="info"
                        size="sm"
                        className="btn-ovh-employee-list"
                      >
                        <i className="text-white fa fa-pencil-square-o"></i>
                      </CButton>
                      &nbsp; &nbsp; &nbsp;
                      <CButton
                        color="danger"
                        className="btn-ovh me-2"
                        // onClick={() => handleShowDeleteModal(family.familyId)}
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
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
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
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
