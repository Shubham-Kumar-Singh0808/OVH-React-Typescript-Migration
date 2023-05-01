import React, { useState } from 'react'
import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CButton,
  CFormCheck,
  CFormTextarea,
  CCardHeader,
  CCardBody,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import { UpdateClearanceDetails } from '../../../../types/Separation/ResignationList/resignationListTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'

const HRClearanceCertificateDetails = (): JSX.Element => {
  const [isHrCCDetailsEdit, setIsHrCCDetailsEdit] = useState<boolean>(false)
  const [isEditActiveValue, setIsEditActiveValue] = useState<boolean>(false)
  const initialHrCCDetails = {} as UpdateClearanceDetails
  const [editHrCCDetails, setEditHrCCDetails] = useState(initialHrCCDetails)
  const dispatch = useAppDispatch()
  const [separationId, setSeparationId] = useState(0)
  const HrClearanceDetails = useTypedSelector(
    reduxServices.resignationList.selectors.managerClearanceDetails,
  )
  const getAllResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )

  const editHrCCDetailsButtonHandler = (
    updateClearanceDetails: UpdateClearanceDetails,
  ): void => {
    setIsHrCCDetailsEdit(true)
    setSeparationId(updateClearanceDetails?.seperationId)
    setEditHrCCDetails(updateClearanceDetails)
    setIsEditActiveValue(updateClearanceDetails.isDue)
  }

  const handleEditHrCCDetailsHandler = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'activeState') {
      setIsEditActiveValue(value === 'true')
      const activeStatus = value === 'true'
      setEditHrCCDetails((values) => {
        return { ...values, ...{ [name]: activeStatus } }
      })
    } else {
      setEditHrCCDetails((values) => {
        return { ...values, ...{ [name]: value } }
      })
    }
  }

  const successToastMessage = (
    <OToast
      toastMessage="CC details updated Successfully."
      toastColor="success"
    />
  )

  const SubmitHrClearanceCertificateHandler = async () => {
    const updateCCDetailsResultAction = await dispatch(
      reduxServices.resignationList.updateCCDetails({
        addedBy: 'HR',
        ccId: HrClearanceDetails[0].ccId,
        comments: editHrCCDetails?.comments,
        createdDate: new Date(),
        employeeId: HrClearanceDetails[0]?.employeeId,
        employeeName: HrClearanceDetails[0]?.employeeName,
        isDue: isEditActiveValue,
        seperationEmpId: HrClearanceDetails[0]?.seperationEmpId,
        seperationEmpName: HrClearanceDetails[0]?.seperationEmpName,
        seperationId: HrClearanceDetails[0]?.seperationId,
      }),
    )
    if (
      reduxServices.resignationList.updateCCDetails.fulfilled.match(
        updateCCDetailsResultAction,
      )
    ) {
      setIsHrCCDetailsEdit(false)
      dispatch(
        reduxServices.resignationList.getClearanceDetails({
          separationId: getAllResignationHistory.separationId,
          submittedBy: 'HR',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    }
  }

  const cancelHrCCDetailsButtonHandler = () => {
    setIsHrCCDetailsEdit(false)
  }
  const due = HrClearanceDetails[0]?.isDue ? 'Due' : 'No Due'

  const exitDocumentHandler = (HRClearanceId: number) => {
    dispatch(reduxServices.resignationList.getEmpDetails(HRClearanceId))
  }
  return (
    <>
      <div className="card mb-4 myprofile-wrapper">
        {isHrCCDetailsEdit &&
        HrClearanceDetails[0]?.seperationId === separationId ? (
          <>
            <CCardHeader>
              <h4 className="h4">Edit Clearance Certificate Details</h4>
            </CCardHeader>
          </>
        ) : (
          <>
            <CCardHeader>
              <h4 className="h4">Clearance Certificate Details</h4>
            </CCardHeader>
          </>
        )}
        <CCardBody>
          <CForm>
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                {isHrCCDetailsEdit &&
                HrClearanceDetails[0]?.seperationId === separationId ? (
                  <>
                    <CButton
                      color="info"
                      className="btn-ovh me-1"
                      onClick={cancelHrCCDetailsButtonHandler}
                      data-testid="back-btn"
                    >
                      <i className="fa fa-arrow-left  me-1"></i>Back
                    </CButton>
                  </>
                ) : (
                  <>
                    <CButton
                      color="info"
                      className="btn-ovh me-1"
                      data-testid="edit-btn"
                      onClick={() => {
                        editHrCCDetailsButtonHandler(HrClearanceDetails[0])
                      }}
                    >
                      <i className="fa fa-arrow-left  me-1"></i>Edit
                    </CButton>
                    <Link to={`/ExitFeedBackForm`}>
                      <CButton
                        color="info"
                        className="btn-ovh me-1"
                        onClick={() =>
                          exitDocumentHandler(
                            getAllResignationHistory.separationId,
                          )
                        }
                      >
                        <i className="fa fa-sign-out text-white"></i> Exit
                        Documents
                      </CButton>
                    </Link>
                    <Link to={`/resignationList`}>
                      <CButton color="info" className="btn-ovh me-1">
                        <i className="fa fa-arrow-left  me-1"></i>Back
                      </CButton>
                    </Link>
                  </>
                )}
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Employee ID:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">{HrClearanceDetails[0]?.seperationEmpId}</p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Employee Name:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">
                  {HrClearanceDetails[0]?.seperationEmpName}
                </p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Submitted Employee Id:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">{HrClearanceDetails[0]?.employeeId}</p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Submitted Employee Name:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">{HrClearanceDetails[0]?.employeeName}</p>
              </CCol>
            </CRow>

            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Due:
              </CFormLabel>
              {isHrCCDetailsEdit &&
              HrClearanceDetails[0]?.seperationId === separationId ? (
                <CCol sm={3}>
                  <CFormCheck
                    data-testid="active"
                    className="mt-2 sh-hover-handSymbol"
                    type="radio"
                    name="activeState"
                    id="yes"
                    value="true"
                    label="Yes"
                    inline
                    checked={isEditActiveValue}
                    onChange={handleEditHrCCDetailsHandler}
                  />
                  <CFormCheck
                    className="mt-2 sh-hover-handSymbol"
                    type="radio"
                    name="activeState"
                    id="no"
                    label="No"
                    value="false"
                    inline
                    checked={!isEditActiveValue}
                    onChange={handleEditHrCCDetailsHandler}
                  />
                </CCol>
              ) : (
                <CCol sm={3}>
                  <p className="mb-0">{due}</p>
                </CCol>
              )}
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Comments:
              </CFormLabel>
              {isHrCCDetailsEdit &&
              HrClearanceDetails[0]?.seperationId === separationId ? (
                <CCol sm={5}>
                  <CFormTextarea
                    aria-label="comments"
                    id="comments"
                    name="comments"
                    value={editHrCCDetails?.comments}
                    onChange={handleEditHrCCDetailsHandler}
                  ></CFormTextarea>
                </CCol>
              ) : (
                <CCol sm={3}>
                  <p className="mb-0">
                    {HrClearanceDetails[0]?.comments?.replace(/^\s*/, '') ||
                      'N/A'}
                  </p>
                </CCol>
              )}
            </CRow>
            {isHrCCDetailsEdit &&
            HrClearanceDetails[0]?.seperationId === separationId ? (
              <>
                <CRow className="mt-3 mb-4">
                  <CCol md={{ span: 6, offset: 3 }}>
                    <CButton
                      className="btn-ovh me-1"
                      data-testid="update-btn"
                      color="success"
                      onClick={SubmitHrClearanceCertificateHandler}
                      disabled={
                        isEditActiveValue === true &&
                        editHrCCDetails?.comments?.replace(/^\s*/, '') === ''
                      }
                    >
                      Update
                    </CButton>
                  </CCol>
                </CRow>
              </>
            ) : (
              ''
            )}
          </CForm>
        </CCardBody>
      </div>
    </>
  )
}

export default HRClearanceCertificateDetails
