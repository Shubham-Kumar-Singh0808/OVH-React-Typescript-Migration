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

const ITClearanceDetails = (): JSX.Element => {
  const [isItCCDetailsEdit, setIsItCCDetailsEdit] = useState<boolean>(false)
  const [isEditActiveValue, setIsEditActiveValue] = useState<boolean>(false)
  const initialItCCDetails = {} as UpdateClearanceDetails
  const [editItCCDetails, setEditItCCDetails] = useState(initialItCCDetails)
  const dispatch = useAppDispatch()
  const [separationId, setSeparationId] = useState(0)
  const ItClearanceDetails = useTypedSelector(
    reduxServices.resignationList.selectors.managerClearanceDetails,
  )
  const getAllResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )

  const editItCCDetailsButtonHandler = (
    updateClearanceDetails: UpdateClearanceDetails,
  ): void => {
    setIsItCCDetailsEdit(true)
    setSeparationId(updateClearanceDetails?.seperationId)
    setEditItCCDetails(updateClearanceDetails)
    setIsEditActiveValue(updateClearanceDetails.isDue)
  }

  const handleEditItCCDetailsHandler = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'activeState') {
      setIsEditActiveValue(value === 'true')
      const activeStatus = value === 'true'
      setEditItCCDetails((values) => {
        return { ...values, ...{ [name]: activeStatus } }
      })
    } else {
      setEditItCCDetails((values) => {
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

  const SubmitItClearanceCertificateHandler = async () => {
    const updateItCCDetailsResultAction = await dispatch(
      reduxServices.resignationList.updateCCDetails({
        addedBy: 'IT',
        ccId: ItClearanceDetails[0].ccId,
        comments: editItCCDetails?.comments,
        createdDate: new Date(),
        employeeId: ItClearanceDetails[0]?.employeeId,
        employeeName: ItClearanceDetails[0]?.employeeName,
        isDue: isEditActiveValue as unknown as boolean,
        seperationEmpId: ItClearanceDetails[0]?.seperationEmpId,
        seperationEmpName: ItClearanceDetails[0]?.seperationEmpName,
        seperationId: ItClearanceDetails[0]?.seperationId,
      }),
    )
    if (
      reduxServices.resignationList.updateCCDetails.fulfilled.match(
        updateItCCDetailsResultAction,
      )
    ) {
      setIsItCCDetailsEdit(false)
      dispatch(
        reduxServices.resignationList.getClearanceDetails({
          separationId: getAllResignationHistory.separationId,
          submittedBy: 'IT',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    }
  }

  const cancelHrCCDetailsButtonHandler = () => {
    setIsItCCDetailsEdit(false)
  }
  const due = ItClearanceDetails[0]?.isDue ? 'Due' : 'No Due'
  return (
    <>
      <div className="card mb-4 myprofile-wrapper">
        {isItCCDetailsEdit &&
        ItClearanceDetails[0]?.seperationId === separationId ? (
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
                {isItCCDetailsEdit &&
                ItClearanceDetails[0]?.seperationId === separationId ? (
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
                        editItCCDetailsButtonHandler(ItClearanceDetails[0])
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
                <p className="mb-0">{ItClearanceDetails[0]?.seperationEmpId}</p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Employee Name:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">
                  {ItClearanceDetails[0]?.seperationEmpName}
                </p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Submitted Employee Id:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">{ItClearanceDetails[0]?.employeeId}</p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Submitted Employee Name:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">{ItClearanceDetails[0]?.employeeName}</p>
              </CCol>
            </CRow>

            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Due:
              </CFormLabel>
              {isItCCDetailsEdit &&
              ItClearanceDetails[0]?.seperationId === separationId ? (
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
                    onChange={handleEditItCCDetailsHandler}
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
                    onChange={handleEditItCCDetailsHandler}
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
              {isItCCDetailsEdit &&
              ItClearanceDetails[0]?.seperationId === separationId ? (
                <CCol sm={5}>
                  <CFormTextarea
                    aria-label="comments"
                    id="comments"
                    name="comments"
                    value={editItCCDetails?.comments}
                    onChange={handleEditItCCDetailsHandler}
                  ></CFormTextarea>
                </CCol>
              ) : (
                <CCol sm={3}>
                  <p className="mb-0">
                    {ItClearanceDetails[0]?.comments?.replace(/^\s*/, '') ||
                      'N/A'}
                  </p>
                </CCol>
              )}
            </CRow>
            {isItCCDetailsEdit &&
            ItClearanceDetails[0]?.seperationId === separationId ? (
              <>
                <CRow className="mt-3 mb-4">
                  <CCol md={{ span: 6, offset: 3 }}>
                    <CButton
                      className="btn-ovh me-1"
                      data-testid="update-btn"
                      color="success"
                      onClick={SubmitItClearanceCertificateHandler}
                      disabled={
                        isEditActiveValue === true &&
                        editItCCDetails?.comments?.replace(/^\s*/, '') === ''
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

export default ITClearanceDetails
