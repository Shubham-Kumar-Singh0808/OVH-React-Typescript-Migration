import { CButton, CCol, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import InvestmentTable from './InvestmentTable'
import OModal from '../../../components/ReusableComponent/OModal'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const MoreSections = (): JSX.Element => {
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false)
  const dispatch = useAppDispatch()
  const section = useTypedSelector(
    reduxServices.itDeclarationForm.selectors.sections,
  )
  const handleShowCategoryDeleteModal = () => {
    setIsCancelModalVisible(true)
  }
  return (
    <>
      <div className="block-session clearfix widget_gap">
        <CButton
          color="warning"
          className="btn btn-warning close-btn"
          data-testid="df-cancel-btn"
          size="sm"
          onClick={handleShowCategoryDeleteModal}
        >
          <i className="fa fa-times text-white"></i>
        </CButton>
        <CRow className="form-group">
          <CRow className="col-sm-4">
            <CFormLabel className="col-sm-3 txt-info"> Sections:</CFormLabel>
            <CCol className="col-sm-8">
              <CFormLabel className="txt-info">80 C</CFormLabel>
            </CCol>
          </CRow>
          <div className="col-sm-2 ps-2">
            <CButton color="info" className="text-white btn-ovh" size="sm">
              <i className="fa fa-plus me-1"></i>
              More Investments
            </CButton>
          </div>
          <div className="col-sm-6">
            <b className="pull-right txt-info">
              Max Limit: <span className="txt-info">1,50,000</span>
            </b>
          </div>
        </CRow>
        <InvestmentTable />
        <div className="clearfix">
          <p className="pull-right txt-subtotal">
            Sub Total: <span>20,000</span>
          </p>
        </div>
      </div>
      <CRow>
        <CCol>
          <p className="pull-right txt-grandtotal">Grand Total: 20,000</p>
        </CCol>
      </CRow>
      <OModal
        alignment="center"
        visible={isCancelModalVisible}
        setVisible={setIsCancelModalVisible}
        modalTitle="Remove Section"
        modalBodyClass="mt-0"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        // confirmButtonAction={}
      >
        <>Do you really want to remove this ?</>
      </OModal>
    </>
  )
}

export default MoreSections
