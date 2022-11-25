import React, { useState } from 'react'
import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CButton,
  CFormCheck,
  CFormTextarea,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import { UpdateClearanceDetails } from '../../../../types/Separation/ResignationList/resignationListTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const ClearenceCertificateDetailsForm = (): JSX.Element => {
  const [isMailTemplateEdit, setIsMailTemplateEdit] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<string>('false')
  const initialMailTemplateType = {} as UpdateClearanceDetails
  const [editTemplateTypeDetails, setEditTemplateTypeDetails] = useState(
    initialMailTemplateType,
  )
  const dispatch = useAppDispatch()
  const [templateId, setTemplateId] = useState(0)
  const managerClearenceDetails = useTypedSelector(
    reduxServices.resignationList.selectors.managerClearenceDetails,
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
  }

  const handleEditMailTemplateHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    setEditTemplateTypeDetails((values) => {
      return { ...values, ...{ [name]: value } }
    })
  }

  const SubmitClearenceCertificateHandler = async () => {
    const updateCCDetailsResultAction = await dispatch(
      reduxServices.resignationList.updateCCDetails({
        addedBy: 'Manager',
        ccId: managerClearenceDetails[0].ccId,
        comments: editTemplateTypeDetails?.comments,
        createdDate: new Date(),
        employeeId: managerClearenceDetails[0]?.employeeId,
        employeeName: managerClearenceDetails[0]?.employeeName,
        isDue: isActive,
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
  console.log(isActive)
  return (
    <>
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
                    editTemplateTypeButtonHandler(managerClearenceDetails[0])
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
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Employee ID:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{managerClearenceDetails[0]?.employeeId}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">{managerClearenceDetails[0]?.employeeName}</p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Submitted Employee Id:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {managerClearenceDetails[0]?.seperationEmpId}
            </p>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
            Submitted Employee Name:
          </CFormLabel>
          <CCol sm={3}>
            <p className="mb-0">
              {managerClearenceDetails[0]?.seperationEmpName}
            </p>
          </CCol>
        </CRow>

        <CRow className="mt-1 mb-0 align-items-center">
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
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
                checked={isActive === 'true'}
                onChange={(e) => setIsActive(e.target.value)}
              />
              <CFormCheck
                inline
                type="radio"
                name="No"
                id="No"
                data-testId="workfromhome"
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
          <CFormLabel className="col-sm-4 col-form-label text-end p-1">
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
            <CRow className="mt-5 mb-4">
              <CCol md={{ span: 6, offset: 3 }}>
                <CButton
                  className="btn-ovh me-1"
                  data-testid="confirmBtn"
                  color="success"
                  onClick={SubmitClearenceCertificateHandler}
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
    </>
  )
}

export default ClearenceCertificateDetailsForm
