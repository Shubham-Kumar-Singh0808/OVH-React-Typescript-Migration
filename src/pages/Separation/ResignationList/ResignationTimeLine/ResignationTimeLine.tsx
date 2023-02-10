import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CButton,
  CFormSelect,
} from '@coreui/react-pro'
import React, { useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { SeparationTimeLine } from '../../../../types/Separation/ResignationList/resignationListTypes'

const ResignationTimeLine = ({
  editResignationTimeLine,
  setEditResignationTimeLine,
  resignationId,
  isResignationTimeLineEdit,
}: {
  editResignationTimeLine: SeparationTimeLine
  resignationId: number
  isResignationTimeLineEdit: boolean
  setEditResignationTimeLine: React.Dispatch<
    React.SetStateAction<SeparationTimeLine>
  >
}): JSX.Element => {
  const getAllResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )

  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [comments, setComments] = useState<string>()
  const handleDescription = (description: string) => {
    setComments(description)
  }
  const onStartDateChangeHandler = (date: Date) => {
    const formatDate = moment(date).format('DD/MM/YYYY')
    const name = 'relievingDate'
    setEditResignationTimeLine((prevState) => {
      return { ...prevState, ...{ [name]: formatDate } }
    })
  }
  const handleEditResignationTimeLineHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    setEditResignationTimeLine((values) => {
      return { ...values, ...{ [name]: value } }
    })
  }
  const clearBtnHandler = () => {
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }
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
            {isResignationTimeLineEdit &&
            getAllResignationHistory.separationId === resignationId ? (
              <div className="edit-time-control">
                <DatePicker
                  className="form-control form-control-sm sh-date-picker"
                  placeholderText="dd/mm/yy"
                  name="relievingDate"
                  id="relievingDate"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  value={editResignationTimeLine?.relievingDate}
                  onChange={(date: Date) => onStartDateChangeHandler(date)}
                />
              </div>
            ) : (
              <p className="mb-0">{getAllResignationHistory?.relievingDate}</p>
            )}
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
            <p className="mb-0">
              <span className="descriptionField">
                <div
                  dangerouslySetInnerHTML={{
                    __html: getAllResignationHistory?.employeeComments,
                  }}
                />
              </span>
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Status:
          </CFormLabel>
          <CCol sm={3}>
            {isResignationTimeLineEdit &&
            getAllResignationHistory.separationId === resignationId ? (
              <div className="edit-time-control">
                <CFormSelect
                  aria-label="Default select example"
                  size="sm"
                  id="status"
                  data-testid="form-select2"
                  name="status"
                  value={editResignationTimeLine.status}
                  onChange={handleEditResignationTimeLineHandler}
                >
                  <option value=""></option>
                  <option value="">Select Status</option>
                  <option value="Resigned">Resigned</option>
                  <option value="Absconding">Absconding</option>
                  <option value="Terminated">Terminated</option>
                </CFormSelect>
              </div>
            ) : (
              <p className="mb-0">{getAllResignationHistory?.status}</p>
            )}
          </CCol>
        </CRow>
        {getAllResignationHistory.status === 'Resigned' ? (
          <CRow className="mt-1 mb-0 align-items-center">
            <CFormLabel className="col-sm-4 col-form-label text-end p-1">
              Comments:
            </CFormLabel>
            {/* <CCol sm={12}> */}
            {showEditor ? (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={comments}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    handleDescription(editor.getData().trim())
                  }}
                />
              </CCol>
            ) : (
              ''
            )}
            {/* </CCol> */}
          </CRow>
        ) : (
          ''
        )}
        <CRow>
          <CCol md={{ span: 6, offset: 2 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                data-testid="create-btn"
                color="success"
                // onClick={updateTimeLineHandler}
                // disabled={!isCreateButtonEnabled || dateError}
              >
                Submit
              </CButton>
              <CButton
                color="warning "
                data-testid="clear-btn"
                className="btn-ovh"
                onClick={clearBtnHandler}
              >
                Clear
              </CButton>
            </>
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
                          <div className="mb-1 resignation-comments">
                            <CFormLabel className="col-form-label p-0">
                              Comments:
                            </CFormLabel>
                            &nbsp;
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item?.comments,
                              }}
                            />
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
