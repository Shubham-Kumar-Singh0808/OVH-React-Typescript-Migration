import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'

const AddManuFactureFilterOptions = ({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const [productType, setProductType] = useState<string>('')
  const [manufactureName, setManufacturerName] = useState<string>('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  // const result = useTypedSelector(
  //   reduxServices.ManufacturerList.selectors.manufacturerData,
  // )

  const result = useTypedSelector(
    reduxServices.ProductTypeList.selectors.manufacturerData,
  )

  const clearButtonHandler = () => {
    setProductType('')
    setManufacturerName('')
  }

  const dispatch = useAppDispatch()
  const handleAddManufactureHandler = async () => {
    const addManuFactureListResultAction = await dispatch(
      reduxServices.ManufacturerList.addManufacturer({
        manufacturerName: manufactureName,
        productId: productType,
      }),
    )
    if (
      reduxServices.ManufacturerList.addManufacturer.fulfilled.match(
        addManuFactureListResultAction,
      )
    ) {
      setToggle('')
      dispatch(
        reduxServices.ManufacturerList.getManufacturerList({
          startIndex: 0,
          endIndex: 20,
          manufacturerName: '',
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="ManufacturerList added successfully"
          />,
        ),
      )
    }
  }

  useEffect(() => {
    if (productType && manufactureName) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [productType, manufactureName])
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info"
            className="btn-ovh me-1"
            onClick={() => setToggle('')}
            data-testid="back-button"
          >
            <i className="fa fa-arrow-left  me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <CForm>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end col-form-label category-label"
          >
            Product Type:{' '}
            <span className={productType ? 'text-white' : 'text-danger'}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="form-select"
              aria-label="Default select example"
              size="sm"
              id="ProductType"
              name="ProductType"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="">Select Product</option>
              {result?.productList
                ?.slice()
                .sort((prod1, prod2) =>
                  prod1.productName.localeCompare(prod2.productName),
                )
                ?.map((productItem, index) => (
                  <option key={index} value={productItem?.productId}>
                    {productItem?.productName}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Manufacturer Name
            <span className={manufactureName ? 'text-white' : 'text-danger'}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              data-testid="manufacturerName"
              id="name"
              name="name"
              placeholder="Enter Manufacturer Name"
              value={manufactureName}
              onChange={(e) => setManufacturerName(e.target.value)}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CCol className="col-md-3 offset-md-3">
            <CButton
              data-testid="save-btn"
              color="success"
              className="btn-ovh me-1"
              size="sm"
              disabled={!isAddButtonEnabled}
              onClick={handleAddManufactureHandler}
            >
              Add
            </CButton>
            <CButton
              data-testid="clear-btn"
              color="warning "
              className="btn-ovh"
              onClick={clearButtonHandler}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default AddManuFactureFilterOptions
