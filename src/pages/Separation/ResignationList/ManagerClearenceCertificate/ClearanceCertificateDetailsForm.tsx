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

const ClearenceCertificateDetailsForm = (): JSX.Element => {
  const [isMailTemplateEdit, setIsMailTemplateEdit] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<boolean>()
  const initialMailTemplateType = {} as UpdateClearanceDetails
  const [editTemplateTypeDetails, setEditTemplateTypeDetails] = useState(
    initialMailTemplateType,
  )
  const dispatch = useAppDispatch()
  const [templateId, setTemplateId] = useState(0)
  const managerClearenceDetails = useTypedSelector(
    reduxServices.resignationList.selectors.managerClearanceDetails,
  )
  const getAllResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )
  console.log(managerClearenceDetails)

  const editTemplateTypeButtonHandler = (
    updateClearanceDetails: UpdateClearanceDetails,
  ): void => {
    setIsMailTemplateEdit(true)
    setTemplateId(updateClearanceDetails?.seperationId)
    setEditTemplateTypeDetails(updateClearanceDetails)
    setIsActive(updateClearanceDetails?.isDue)
    console.log(`${typeof updateClearanceDetails?.isDue} vinesh`)
  }

  const handleEditMailTemplateHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    setEditTemplateTypeDetails((values) => {
      return { ...values, ...{ [name]: value } }
    })
  }

  const SubmitClearanceCertificateHandler = async () => {
    const updateCCDetailsResultAction = await dispatch(
      reduxServices.resignationList.updateCCDetails({
        addedBy: 'Manager',
        ccId: managerClearenceDetails[0].ccId,
        comments: editTemplateTypeDetails?.comments,
        createdDate: new Date(),
        employeeId: managerClearenceDetails[0]?.employeeId,
        employeeName: managerClearenceDetails[0]?.employeeName,
        isDue: isActive as boolean,
        seperationEmpId: managerClearenceDetails[0]?.seperationEmpId,
        seperationEmpName: managerClearenceDetails[0]?.seperationEmpName,
        seperationId: managerClearenceDetails[0]?.seperationId,
      }),
    )
    if (
      reduxServices.resignationList.updateCCDetails.fulfilled.match(
        updateCCDetailsResultAction,
      )
    ) {
      setIsMailTemplateEdit(false)
      dispatch(
        reduxServices.resignationList.getClearanceDetails({
          separationId: getAllResignationHistory.separationId,
          submittedBy: 'Manager',
        }),
      )
    }
  }

  const cancelMailTemplateTypeButtonHandler = () => {
    setIsMailTemplateEdit(false)
  }
  const due = managerClearenceDetails[0]?.isDue ? 'Due' : 'No Due'
  return (
    <>
      <div className="card mb-4 myprofile-wrapper">
        {isMailTemplateEdit &&
        managerClearenceDetails[0]?.seperationId === templateId ? (
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
                {isMailTemplateEdit &&
                managerClearenceDetails[0]?.seperationId === templateId ? (
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
                        editTemplateTypeButtonHandler(
                          managerClearenceDetails[0],
                        )
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
                <p className="mb-0">{managerClearenceDetails[0]?.employeeId}</p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Employee Name:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">
                  {managerClearenceDetails[0]?.employeeName}
                </p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Submitted Employee Id:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">
                  {managerClearenceDetails[0]?.seperationEmpId}
                </p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Submitted Employee Name:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">
                  {managerClearenceDetails[0]?.seperationEmpName}
                </p>
              </CCol>
            </CRow>

            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Due:
              </CFormLabel>
              {isMailTemplateEdit &&
              managerClearenceDetails[0]?.seperationId === templateId ? (
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
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.value !== 'true')}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="No"
                    id="No"
                    data-testId="workfromhome"
                    value={'false'}
                    label="No"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.value !== 'false')}
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
              {isMailTemplateEdit &&
              managerClearenceDetails[0]?.seperationId === templateId ? (
                <CCol sm={5}>
                  <CFormTextarea
                    aria-label="comments"
                    id="comments"
                    name="comments"
                    value={editTemplateTypeDetails?.comments}
                    onChange={handleEditMailTemplateHandler}
                  ></CFormTextarea>
                </CCol>
              ) : (
                <CCol sm={3}>
                  <p className="mb-0">{managerClearenceDetails[0]?.comments}</p>
                </CCol>
              )}
            </CRow>
            {isMailTemplateEdit &&
            managerClearenceDetails[0]?.seperationId === templateId ? (
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

export default ClearenceCertificateDetailsForm
