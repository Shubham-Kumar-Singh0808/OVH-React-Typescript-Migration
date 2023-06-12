import { CRow, CCol, CButton } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'

const Testing = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const backButtonHandler = () => {
    dispatch(reduxServices.changeStatus.actions.setToggle(''))
  }

  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info"
            className="btn-ovh me-1"
            data-testid="back-btn"
            onClick={backButtonHandler}
          >
            <i className="fa fa-arrow-left  me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default Testing
