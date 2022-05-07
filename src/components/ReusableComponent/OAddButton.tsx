/* eslint-disable prettier/prettier */
import React from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
const OAddButton = (  {addButtonHandler}:any): JSX.Element => {
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton color="info btn-ovh me-1" onClick={addButtonHandler}>
            <i className="fa fa-plus me-1"></i>Add
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}
export default OAddButton
