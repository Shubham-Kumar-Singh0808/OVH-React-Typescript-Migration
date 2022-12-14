import { CForm, CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const ResignationTimeLine = (): JSX.Element => {
  const getAllResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )
  return (
    <>
      <CForm>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Employee ID:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllResignationHistory?.employeeId}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllResignationHistory?.employeeName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Resignation Date:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllResignationHistory?.resignationDate}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Relieving Date:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllResignationHistory?.relievingDate}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Primary Reason:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {getAllResignationHistory?.primaryReasonName}
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Employee Comments:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllResignationHistory?.employeeComments}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Status:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{getAllResignationHistory?.status}</p>
          </CCol>
        </CRow>
        <div className="sh-timeline-container">
          {getAllResignationHistory?.separationComments?.map((item, index) => {
            return (
              <div key={index} className="sh-timeline-card">
                <div
                  className="sh-timeline-timestamp"
                  data-testid="sh-time-stamp"
                >
                  {item.createdDate}
                </div>
                <div className="sh-timeline-content">
                  <div
                    className="sh-timeline-header mb-4 clearfix"
                    data-testid="sh-modifiedBy"
                  >
                    <h4 className="sh-timeline-title">{item.employeeName}</h4>
                  </div>
                  <div className="sh-timeline-body">
                    <div className="sh-timeline-item mb-1">
                      <>
                        <div className="mb-1">
                          <CFormLabel className="col-form-label p-0">
                            Status:
                          </CFormLabel>
                          &nbsp;
                          {item.status}
                        </div>
                        {item.comments ? (
                          <div className="mb-1">
                            <CFormLabel className="col-form-label p-0">
                              Comments:
                            </CFormLabel>
                            &nbsp;
                            {item.comments}
                          </div>
                        ) : (
                          ''
                        )}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CForm>
    </>
  )
}

export default ResignationTimeLine
