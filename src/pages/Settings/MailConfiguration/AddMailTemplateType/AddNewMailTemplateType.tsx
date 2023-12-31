import { CRow, CCol, CFormLabel, CFormInput, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import { showIsRequired } from '../../../../utils/helper'

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
      toastMessage="Mail template type added successfully"
      toastColor="success"
    />
  )

  const handleAddTemplateType = async () => {
    const addTemplateTypeResultAction = await dispatch(
      reduxServices.addNewMailTemplateType.addMailTemplateType(newTemplateType),
    )
    if (
      reduxServices.addNewMailTemplateType.addMailTemplateType.fulfilled.match(
        addTemplateTypeResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
      dispatch(reduxServices.addNewMailTemplateType.getMailTemplateTypes())
      setNewTemplateType('')
    }
  }

  const formLabelProps = {
    htmlFor: 'inputNewTemplateType',
    className: 'col-sm-2 col-form-label text-end',
  }
  return (
    <>
      <CRow className="mt-0 mb-0">
        <CFormLabel {...formLabelProps}>
          Template Type:
          <span className={showIsRequired(newTemplateType)}>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <CFormInput
            data-testid="template-input"
            type="text"
            id="inputNewTemplateType"
            value={newTemplateType}
            onChange={(e) => setNewTemplateType(e.target.value)}
            placeholder={'Template Type'}
          />
        </CCol>
        <CCol>
          <CButton
            data-testid="btn-add"
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
