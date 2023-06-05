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

const AdminClearanceDetails = (): JSX.Element => {
  const [isAdminCCDetailsEdit, setIsAdminCCDetailsEdit] =
    useState<boolean>(false)
  const [isEditAdminActiveValue, setIsAdminEditActiveValue] =
    useState<boolean>(false)
  const initialAdminCCDetails = {} as UpdateClearanceDetails
  const [editAdminCCDetails, setEditAdminCCDetails] = useState(
    initialAdminCCDetails,
  )
  const dispatch = useAppDispatch()
  const [separationId, setSeparationId] = useState(0)
  const adminClearanceDetails = useTypedSelector(
    reduxServices.resignationList.selectors.managerClearanceDetails,
  )
  const getAllResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )

  const editAdminCCDetailsButtonHandler = (
    updateClearanceDetails: UpdateClearanceDetails,
  ): void => {
    setIsAdminCCDetailsEdit(true)
    setSeparationId(updateClearanceDetails?.seperationId)
    setEditAdminCCDetails(updateClearanceDetails)
    setIsAdminEditActiveValue(updateClearanceDetails.isDue)
  }

  const handleEditAdminCCDetailsHandler = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'activeState') {
      setIsAdminEditActiveValue(value === 'true')
      const activeStatus = value === 'true'
      setEditAdminCCDetails((values) => {
        return { ...values, ...{ [name]: activeStatus } }
      })
    } else {
      setEditAdminCCDetails((values) => {
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

  const SubmitAdminClearanceCertificateHandler = async () => {
    const updateItCCDetailsResultAction = await dispatch(
      reduxServices.resignationList.updateCCDetails({
        addedBy: 'Admin',
        ccId: adminClearanceDetails[0].ccId,
        comments: editAdminCCDetails?.comments,
        createdDate: new Date(),
        employeeId: adminClearanceDetails[0]?.employeeId,
        employeeName: adminClearanceDetails[0]?.employeeName,
        isDue: isEditAdminActiveValue,
        seperationEmpId: adminClearanceDetails[0]?.seperationEmpId,
        seperationEmpName: adminClearanceDetails[0]?.seperationEmpName,
        seperationId: adminClearanceDetails[0]?.seperationId,
      }),
    )
    if (
      reduxServices.resignationList.updateCCDetails.fulfilled.match(
        updateItCCDetailsResultAction,
      )
    ) {
      setIsAdminCCDetailsEdit(false)
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
      dispatch(
        reduxServices.resignationList.getClearanceDetails({
          separationId: getAllResignationHistory.separationId,
          submittedBy: 'Admin',
        }),
      )
    }
  }

  const cancelAdminCCDetailsButtonHandler = () => {
    setIsAdminCCDetailsEdit(false)
  }
  const due = adminClearanceDetails[0]?.isDue ? 'Due' : 'No Due'
  return (
    <>
      <div className="card mb-4 myprofile-wrapper">
        {isAdminCCDetailsEdit &&
        adminClearanceDetails[0]?.seperationId === separationId ? (
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
                {isAdminCCDetailsEdit &&
                adminClearanceDetails[0]?.seperationId === separationId ? (
                  <>
                    <CButton
                      color="info"
                      className="btn-ovh me-1"
                      onClick={cancelAdminCCDetailsButtonHandler}
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
                        editAdminCCDetailsButtonHandler(
                          adminClearanceDetails[0],
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
                <p className="mb-0">
                  {adminClearanceDetails[0]?.seperationEmpId}
                </p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Employee Name:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">
                  {adminClearanceDetails[0]?.seperationEmpName}
                </p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Submitted Employee Id:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">{adminClearanceDetails[0]?.employeeId}</p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Submitted Employee Name:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">{adminClearanceDetails[0]?.employeeName}</p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Due:
              </CFormLabel>
              {isAdminCCDetailsEdit &&
              adminClearanceDetails[0]?.seperationId === separationId ? (
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
                    checked={isEditAdminActiveValue}
                    onChange={handleEditAdminCCDetailsHandler}
                  />
                  <CFormCheck
                    className="mt-2 sh-hover-handSymbol"
                    type="radio"
                    name="activeState"
                    id="no"
                    label="No"
                    value="false"
                    inline
                    checked={!isEditAdminActiveValue}
                    onChange={handleEditAdminCCDetailsHandler}
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
              {isAdminCCDetailsEdit &&
              adminClearanceDetails[0]?.seperationId === separationId ? (
                <CCol sm={5}>
                  <CFormTextarea
                    aria-label="comments"
                    id="comments"
                    name="comments"
                    value={editAdminCCDetails?.comments}
                    onChange={handleEditAdminCCDetailsHandler}
                  ></CFormTextarea>
                </CCol>
              ) : (
                <CCol sm={3}>
                  <p className="mb-0">
                    {adminClearanceDetails[0]?.comments?.replace(/^\s*/, '') ||
                      'N/A'}
                  </p>
                </CCol>
              )}
            </CRow>
            {isAdminCCDetailsEdit &&
            adminClearanceDetails[0]?.seperationId === separationId ? (
              <>
                <CRow className="mt-3 mb-4">
                  <CCol md={{ span: 6, offset: 3 }}>
                    <CButton
                      className="btn-ovh me-1"
                      data-testid="update-btn"
                      color="success"
                      onClick={SubmitAdminClearanceCertificateHandler}
                      disabled={
                        isEditAdminActiveValue === true &&
                        editAdminCCDetails?.comments?.replace(/^\s*/, '') === ''
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

export default AdminClearanceDetails
