import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const InvestmentTable = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const investments = useTypedSelector(
    reduxServices.itDeclarationForm.selectors.investments,
  )
  useEffect(() => {
    dispatch(reduxServices.itDeclarationForm.getInvestsBySectionId(1))
  }, [dispatch])

  return (
    <>
      <CTable striped responsive>
        <CTableBody>
          <CTableRow>
            <CTableDataCell scope="row">
              <CCol className="mt-2">1</CCol>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <CCol sm={12}>
                <CFormSelect
                  data-testid="form-select-investment"
                  size="sm"
                  id="technologyId"
                  name="technologyId"
                >
                  <option value="">Select Investment</option>
                  {investments?.map((invest, index) => (
                    <option key={index} value={invest.investmentId}>
                      {invest.investmentName}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <CCol sm={12}>
                <CFormInput
                  type="text"
                  id="savingAmount"
                  size="sm"
                  placeholder="Enter Savings Amount"
                  name="customAmount"
                  maxLength={12}
                ></CFormInput>
              </CCol>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <CCol className="mt-1">
                <CButton
                  color="info"
                  data-testid={`df-remove-btn`}
                  className="btn-ovh-employee-list me-1 text-white"
                  size="sm"
                >
                  <i className="fa fa-minus" aria-hidden="true"></i>
                </CButton>
              </CCol>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <CCol className="mt-1">
                <CButton
                  color="info"
                  data-testid={`df-query-btn`}
                  className="btn btn-primary bigfont text-white"
                  size="sm"
                >
                  <i className="fa fa-question" aria-hidden="true"></i>
                </CButton>
              </CCol>
            </CTableDataCell>
            <CTableDataCell scope="row">
              <CCol className="mt-2">Documents Required</CCol>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default InvestmentTable
