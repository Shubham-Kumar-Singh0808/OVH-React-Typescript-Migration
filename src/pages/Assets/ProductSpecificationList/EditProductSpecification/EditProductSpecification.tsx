import React, { useEffect } from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import EditProductSpecificationFilterOptions from './EditProductSpecificationFilterOptions'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ProductSpecifications } from '../../../../types/Assets/ProductSpecificationList/ProductSpecificationListTypes'

const EditProductSpecification = ({
  setToggle,
  editProductSpecification,
  setEditProductSpecification,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  editProductSpecification: ProductSpecifications
  setEditProductSpecification: React.Dispatch<
    React.SetStateAction<ProductSpecifications>
  >
}): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Product Specification"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <>
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-button"
                onClick={() => setToggle('')}
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </CCol>
          </CRow>
          <EditProductSpecificationFilterOptions
            editProductSpecification={editProductSpecification}
            setEditProductSpecification={setEditProductSpecification}
            setToggle={setToggle}
          />
        </>
      </OCard>
    </>
  )
}

export default EditProductSpecification
