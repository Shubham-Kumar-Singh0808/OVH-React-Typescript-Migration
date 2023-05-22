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
import { formLabelProps } from '../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OToast from '../../../components/ReusableComponent/OToast'

const AddManuFactureFilterOptions = ({
  setToggle,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const [productType, setProductType] = useState<string>('')
  const [manufactureName, setManufatureName] = useState<string>('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const result = useTypedSelector(
    reduxServices.ManufacturerList.selectors.manufacturerData,
  )

  const clearButtonHandler = () => {
    setProductType('')
    setManufatureName('')
  }

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.ManufacturerList.getAllLookUps())
  }, [dispatch])
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
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="ManufacturerList added successfully"
          />,
        ),
      )
    }
  }
  console.log('result')
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
              id="leaveType"
              name="leaveType"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value={''}>Select Product Type</option>
              {result.productList?.length > 0 &&
                result?.map((result, index) => (
                  <option key={index} value={result?.productId}>
                    {result?.productName}
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
            Name Of Leave Category
            <span className={manufactureName ? 'text-white' : 'text-danger'}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              id="name"
              name="name"
              placeholder="Leave Name"
              value={manufactureName}
              onChange={(e) => setManufatureName(e.target.value)}
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 mb-3">
          <CCol className="col-md-3 offset-md-3">
            <CButton
              color="success"
              className="btn-ovh me-1"
              size="sm"
              disabled={!isAddButtonEnabled}
              onClick={handleAddManufactureHandler}
            >
              Add
            </CButton>
            <CButton
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
