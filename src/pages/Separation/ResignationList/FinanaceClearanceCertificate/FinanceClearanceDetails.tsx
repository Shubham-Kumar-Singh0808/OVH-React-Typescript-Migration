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

const FinanceClearanceDetails = (): JSX.Element => {
  const [isFinanceCCDetailsEdit, setIsFinanceCCDetailsEdit] =
    useState<boolean>(false)
  const [isFinanceEditActiveValue, setIsEditFinanceActiveValue] =
    useState<boolean>(false)
  const initialFinanceCCDetails = {} as UpdateClearanceDetails
  const [editFinanceCCDetails, setEditFinanceCCDetails] = useState(
    initialFinanceCCDetails,
  )
  const dispatch = useAppDispatch()
  const [separationId, setSeparationId] = useState(0)
  const FinanceCCDetails = useTypedSelector(
    reduxServices.resignationList.selectors.managerClearanceDetails,
  )
  const getAllResignationHistory = useTypedSelector(
    reduxServices.resignationList.selectors.resignationTimeLine,
  )

  const editFinanceCCDetailsButtonHandler = (
    updateClearanceDetails: UpdateClearanceDetails,
  ): void => {
    setIsFinanceCCDetailsEdit(true)
    setSeparationId(updateClearanceDetails?.seperationId)
    setEditFinanceCCDetails(updateClearanceDetails)
    setIsEditFinanceActiveValue(updateClearanceDetails.isDue)
  }

  const handleEditFinanceCCDetailsHandler = (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'activeState') {
      setIsEditFinanceActiveValue(value === 'true')
      const activeStatus = value === 'true'
      setEditFinanceCCDetails((values) => {
        return { ...values, ...{ [name]: activeStatus } }
      })
    } else {
      setEditFinanceCCDetails((values) => {
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

  const SubmitFinanceClearanceCertificateHandler = async () => {
    const updateCCDetailsResultAction = await dispatch(
      reduxServices.resignationList.updateCCDetails({
        addedBy: 'Finance',
        ccId: FinanceCCDetails[0].ccId,
        comments: editFinanceCCDetails?.comments,
        createdDate: new Date(),
        employeeId: FinanceCCDetails[0]?.employeeId,
        employeeName: FinanceCCDetails[0]?.employeeName,
        isDue: isFinanceEditActiveValue as unknown as boolean,
        seperationEmpId: FinanceCCDetails[0]?.seperationEmpId,
        seperationEmpName: FinanceCCDetails[0]?.seperationEmpName,
        seperationId: getAllResignationHistory.separationId,
      }),
    )
    if (
      reduxServices.resignationList.updateCCDetails.fulfilled.match(
        updateCCDetailsResultAction,
      )
    ) {
      setIsFinanceCCDetailsEdit(false)
      dispatch(
        reduxServices.resignationList.getClearanceDetails({
          separationId: getAllResignationHistory.separationId,
          submittedBy: 'Finance',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    }
  }

  const cancelFinanceCCDetailsButtonHandler = () => {
    setIsFinanceCCDetailsEdit(false)
  }
  const due = FinanceCCDetails[0]?.isDue ? 'Due' : 'No Due'
  return (
    <>
      <div className="card mb-4 myprofile-wrapper">
        {isFinanceCCDetailsEdit &&
        FinanceCCDetails[0]?.seperationId === separationId ? (
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
                {isFinanceCCDetailsEdit &&
                FinanceCCDetails[0]?.seperationId === separationId ? (
                  <>
                    <CButton
                      color="info"
                      className="btn-ovh me-1"
                      onClick={cancelFinanceCCDetailsButtonHandler}
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
                        editFinanceCCDetailsButtonHandler(FinanceCCDetails[0])
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
                <p className="mb-0">{FinanceCCDetails[0]?.seperationEmpId}</p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Employee Name:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">{FinanceCCDetails[0]?.seperationEmpName}</p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Submitted Employee Id:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">{FinanceCCDetails[0]?.employeeId}</p>
              </CCol>
            </CRow>
            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Submitted Employee Name:
              </CFormLabel>
              <CCol sm={3}>
                <p className="mb-0">{FinanceCCDetails[0]?.employeeName}</p>
              </CCol>
            </CRow>

            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1">
                Due:
              </CFormLabel>
              {isFinanceCCDetailsEdit &&
              FinanceCCDetails[0]?.seperationId === separationId ? (
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
                    checked={isFinanceEditActiveValue}
                    onChange={handleEditFinanceCCDetailsHandler}
                  />
                  <CFormCheck
                    className="mt-2 sh-hover-handSymbol"
                    type="radio"
                    name="activeState"
                    id="no"
                    label="No"
                    value="false"
                    inline
                    checked={!isFinanceEditActiveValue}
                    onChange={handleEditFinanceCCDetailsHandler}
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
              {isFinanceCCDetailsEdit &&
              FinanceCCDetails[0]?.seperationId === separationId ? (
                <CCol sm={5}>
                  <CFormTextarea
                    aria-label="comments"
                    id="comments"
                    name="comments"
                    value={editFinanceCCDetails?.comments}
                    onChange={handleEditFinanceCCDetailsHandler}
                  ></CFormTextarea>
                </CCol>
              ) : (
                <CCol sm={3}>
                  <p className="mb-0">
                    {FinanceCCDetails[0]?.comments?.replace(/^\s*/, '') ||
                      'N/A'}
                  </p>
                </CCol>
              )}
            </CRow>
            {isFinanceCCDetailsEdit &&
            FinanceCCDetails[0]?.seperationId === separationId ? (
              <>
                <CRow className="mt-3 mb-4">
                  <CCol md={{ span: 6, offset: 3 }}>
                    <CButton
                      className="btn-ovh me-1"
                      data-testid="update-btn"
                      color="success"
                      onClick={SubmitFinanceClearanceCertificateHandler}
                      disabled={
                        isFinanceEditActiveValue === true &&
                        editFinanceCCDetails?.comments?.replace(/^\s*/, '') ===
                          ''
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

export default FinanceClearanceDetails
