import { CRow, CCol, CFormLabel, CFormInput, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'

const AddNewMailTemplateType = () => {
  const dispatch = useAppDispatch()

  const [newTemplateType, setNewTemplateType] = useState('')
  const [isAddTemplateTypeBtnEnabled, setIsTemplateTypeBtnEnabled] =
    useState(false)

  useEffect(() => {
    if (newTemplateType) {
      setIsTemplateTypeBtnEnabled(true)
    } else {
      setIsTemplateTypeBtnEnabled(false)
    }
  }, [newTemplateType])

  const toastElement = (
    <OToast
      toastMessage="Template Type successfully added"
      toastColor="danger"
    />
  )

  const handleAddTemplateType = async () => {
    const addFamilyMemberResultAction = await dispatch(
      reduxServices.addNewmailTemplateType.addMailTemplateType(newTemplateType),
    )
    if (
      reduxServices.addNewmailTemplateType.addMailTemplateType.fulfilled.match(
        addFamilyMemberResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
    }
  }

  const formLabelProps = {
    htmlFor: 'inputNewTemplateType',
    className: 'col-form-label category-label',
  }

  return (
    <>
      <CRow className="mb-35">
        <CCol sm={3} className="col-sm-3 col-form-label text-end">
          <CFormLabel {...formLabelProps}>Template Type:</CFormLabel>
        </CCol>
        <CCol sm={4} className="new-category-col">
          <CFormInput
            type="text"
            id="inputNewTemplateType"
            value={newTemplateType}
            onChange={(e) => setNewTemplateType(e.target.value)}
            placeholder={'Template Type'}
          />
        </CCol>
        <CCol sm={3} className="d-flex align-items-center new-category-col">
          <CButton
            color="info"
            className="text-white btn-ovh"
            size="sm"
            disabled={!isAddTemplateTypeBtnEnabled}
            onClick={handleAddTemplateType}
          >
            <i className="fa fa-plus me-1"></i>
            Add
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}
export default AddNewMailTemplateType
