import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'
import {
  ITDeclarationFormToggleType,
  ITForm,
} from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const ITDeclarationFormViewTable = ({
  viewDeclarationForm,
}: {
  viewDeclarationForm: ITForm
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const backButtonHandler = () => {
    dispatch(
      reduxServices.itDeclarationList.actions.setToggle(
        ITDeclarationFormToggleType.HomePage,
      ),
    )
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        CBodyClassName="ps-0 pe-0"
        CHeaderClassName="d-none"
        CFooterClassName="d-none"
      >
        <CCardHeader>
          <h4 className="h4">IT Declaration Form View</h4>
        </CCardHeader>
        <CCardBody>
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              <CButton
                color="info"
                className="btn-ovh me-0"
                data-testid="back-btn"
                onClick={backButtonHandler}
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </CCol>
          </CRow>
          <CCol>
            <CRow className="mt-3">
              <CFormLabel className="col-sm-6 col-md-2 col-form-label text-end">
                Employee Id:
              </CFormLabel>
              <CCol sm={3} className="mt-2">
                {viewDeclarationForm?.employeeId}
              </CCol>
              <CFormLabel className="col-sm-6 col-md-2 col-form-label text-end">
                Employee Name:
              </CFormLabel>
              <CCol sm={3} className="mt-2">
                {viewDeclarationForm?.employeeName}
              </CCol>
            </CRow>
            <CRow>
              <CFormLabel className="col-sm-6 col-md-2 col-form-label text-end">
                PAN:
              </CFormLabel>
              <CCol sm={3} className="mt-2">
                {viewDeclarationForm?.panNumber}
              </CCol>
              <CFormLabel className="col-sm-6 col-md-2 col-form-label text-end">
                Designation:
              </CFormLabel>
              <CCol sm={3} className="mt-2">
                {viewDeclarationForm?.designation}
              </CCol>
            </CRow>
          </CCol>
        </CCardBody>
        <CCardHeader>
          <h4 className="h4">
            Deduction available for Salaried employees under Income Tax Act 1961
          </h4>
        </CCardHeader>
        <CCardBody>
          <CTable responsive className="mt-3 align-middle">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" className="text-center">
                  Sections
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">
                  Investment
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-right">
                  Saving Amount
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            {viewDeclarationForm?.formSectionsDTOs
              ?.slice()
              .sort((sec1, sec2) =>
                sec1.sectionName.localeCompare(sec2.sectionName),
              )
              ?.map((itDeclaration, index) => {
                return (
                  <CTableBody key={index}>
                    {itDeclaration?.formInvestmentDTO?.map(
                      (invest, investIndex) => {
                        return (
                          <CTableRow key={investIndex}>
                            {investIndex === 0 ? (
                              <CTableDataCell
                                rowSpan={
                                  itDeclaration?.formInvestmentDTO?.length
                                }
                                className="text-center"
                              >
                                <label>{itDeclaration.sectionName}</label>
                              </CTableDataCell>
                            ) : (
                              <></>
                            )}
                            <CTableDataCell className="text-center">
                              {invest.investmentName}
                            </CTableDataCell>
                            <CTableDataCell className="text-right">
                              {invest.customAmount.toLocaleString()}
                            </CTableDataCell>
                          </CTableRow>
                        )
                      },
                    )}
                    <CTableRow>
                      <CTableDataCell colSpan={3}>
                        <p className="pull-right sub-total">
                          <b>
                            Sub Total:{' '}
                            {itDeclaration.formInvestmentDTO?.reduce(
                              (prev, current) => {
                                return prev + +current?.customAmount
                              },
                              0,
                            )}
                          </b>
                        </p>
                        <p className="pull-right sub-total mar-100 pr-50">
                          <b>
                            Max-Amount:{' '}
                            {itDeclaration.maxLimit.toLocaleString()}
                          </b>
                        </p>
                      </CTableDataCell>
                    </CTableRow>
                  </CTableBody>
                )
              })}
          </CTable>
          <div className=" bdr-top col-sm-12">
            <div className="col-sm-12">
              <p className="pull-right fs-16">
                <b data-testid="viewITForm-grand-total">
                  Grand Total:{' '}
                  {viewDeclarationForm?.grandTotal?.toLocaleString()}
                </b>
              </p>
            </div>
          </div>
        </CCardBody>
      </OCard>
    </>
  )
}

export default ITDeclarationFormViewTable
