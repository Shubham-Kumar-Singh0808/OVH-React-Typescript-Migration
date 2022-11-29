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

const ClearanceCertificateDetailsForm = (): JSX.Element => {
  const [isCCDetailsEdit, setIsCCDetailsEdit] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<string>('false')
  const initialCCDetails = {} as UpdateClearanceDetails
  const [editCCDetails, setEditCCDetails] = useState(initialCCDetails)
  const dispatch = useAppDispatch()
  const [separationId, setSeparationId] = useState(0)
  const managerClearanceDetails = useTypedSelector(
    reduxServices.resignationList.selectors.managerClearanceDetails,
  )
  const getAllResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )

  const editCCDetailsButtonHandler = (
    updateClearanceDetails: UpdateClearanceDetails,
  ): void => {
    setIsCCDetailsEdit(true)
    setSeparationId(updateClearanceDetails?.seperationId)
    setEditCCDetails(updateClearanceDetails)
    setIsActive(updateClearanceDetails?.isDue as string)
  }

  const handleEditMailTemplateHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    setEditCCDetails((values) => {
      return { ...values, ...{ [name]: value } }
    })
  }

  const SubmitClearanceCertificateHandler = async () => {
    const updateCCDetailsResultAction = await dispatch(
      reduxServices.resignationList.updateCCDetails({
        addedBy: 'Manager',
        ccId: managerClearanceDetails[0].ccId,
        comments: editCCDetails?.comments,
        createdDate: new Date(),
        employeeId: managerClearanceDetails[0]?.employeeId,
        employeeName: managerClearanceDetails[0]?.employeeName,
        isDue: isActive as string,
        seperationEmpId: managerClearanceDetails[0]?.seperationEmpId,
        seperationEmpName: managerClearanceDetails[0]?.seperationEmpName,
        seperationId: managerClearanceDetails[0]?.seperationId,
      }),
    )
    if (
      reduxServices.resignationList.updateCCDetails.fulfilled.match(
        updateCCDetailsResultAction,
      )
    ) {
      setIsCCDetailsEdit(false)
      dispatch(
        reduxServices.resignationList.getClearanceDetails({
          separationId: getAllResignationHistory.separationId,
          submittedBy: 'Manager',
        }),
      )
    }
  }

  const cancelMailTemplateTypeButtonHandler = () => {
    setIsCCDetailsEdit(false)
  }
  const due = managerClearanceDetails[0]?.isDue ? 'Due' : 'No Due'
  return (
    <>
      <div className="card mb-4 myprofile-wrapper">
        {isCCDetailsEdit &&
        managerClearanceDetails[0]?.seperationId === separationId ? (
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
                {isCCDetailsEdit &&
                managerClearanceDetails[0]?.seperationId === separationId ? (
                  <>
                    <CButton
                      color="info"
                      className="btn-ovh me-1"
                      onClick={cancelMailTemplateTypeButtonHandler}
                    >
                      <i className="fa fa-arrow-left  me-1"></i>Back
                    </CButton>
                  </>
                ) : (
                  <>
                    <CButton
                      color="info"
                      className="btn-ovh me-1"
                      onClick={() => {
                        editCCDetailsButtonHandler(managerClearanceDetails[0])
                      }}
                    >
                      <i className="fa fa-arrow-left  me-1"></i>Edit
                    </CButton>
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
                <p className="mb-0">{managerClearanceDetails[0]?.employeeId}</p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Employee Name:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">
                  {managerClearanceDetails[0]?.employeeName}
                </p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Submitted Employee Id:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">
                  {managerClearanceDetails[0]?.seperationEmpId}
                </p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Submitted Employee Name:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">
                  {managerClearanceDetails[0]?.seperationEmpName}
                </p>
              </CCol>
            </CRow>

            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Due:
              </CFormLabel>
              {isCCDetailsEdit &&
              managerClearanceDetails[0]?.seperationId === separationId ? (
                <CCol sm={3}>
                  <CFormCheck
                    inline
                    type="radio"
                    name="Yes"
                    id="yes"
                    data-testId="yes"
                    value="true"
                    label="Yes"
                    defaultChecked
                    checked={isActive === 'true'}
                    onChange={(e) => setIsActive(e.target.value)}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="No"
                    id="No"
                    data-testId="due-test"
                    value="false"
                    label="No"
                    checked={isActive === 'false'}
                    onChange={(e) => setIsActive(e.target.value)}
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
              {isCCDetailsEdit &&
              managerClearanceDetails[0]?.seperationId === separationId ? (
                <CCol sm={5}>
                  <CFormTextarea
                    aria-label="comments"
                    id="comments"
                    name="comments"
                    value={editCCDetails?.comments}
                    onChange={handleEditMailTemplateHandler}
                  ></CFormTextarea>
                </CCol>
              ) : (
                <CCol sm={3}>
                  <p className="mb-0">
                    {managerClearanceDetails[0]?.comments || 'N/A'}
                  </p>
                </CCol>
              )}
            </CRow>
            {isCCDetailsEdit &&
            managerClearanceDetails[0]?.seperationId === separationId ? (
              <>
                <CRow className="mt-3 mb-4">
                  <CCol md={{ span: 6, offset: 3 }}>
                    <CButton
                      className="btn-ovh me-1"
                      data-testid="confirmBtn"
                      color="success"
                      onClick={SubmitClearanceCertificateHandler}
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

export default ClearanceCertificateDetailsForm
