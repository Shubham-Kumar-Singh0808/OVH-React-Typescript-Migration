import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react-pro'
import { useParams } from 'react-router-dom'
import { ChangeRequest } from '../../../../../types/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestTypes'
import { showIsRequired } from '../../../../../utils/helper'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../../stateStore'
import OToast from '../../../../../components/ReusableComponent/OToast'

const EditChangeRequest = ({
  setToggle,
  editChangeRequest,
  setEditChangeRequest,
  editDescription,
  setEditDescription,
}: {
  setToggle: (value: string) => void
  editChangeRequest: ChangeRequest
  setEditChangeRequest: React.Dispatch<React.SetStateAction<ChangeRequest>>
  editDescription: string | undefined
  setEditDescription: React.Dispatch<React.SetStateAction<string | undefined>>
}): JSX.Element => {
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] = useState(false)
  const classNameProps = 'col-sm-3 col-form-label text-end'
  const nameProps = {
    className: classNameProps,
    htmlFor: 'Name',
  }
  const { projectId } = useParams<{ projectId: string }>()
  const dispatch = useAppDispatch()
  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'duration') {
      const durationValue = value.replace(/\D/gi, '')
      setEditChangeRequest((prevState) => {
        return { ...prevState, ...{ [name]: durationValue } }
      })
    } else {
      setEditChangeRequest((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }
  const toastElement = (
    <OToast toastMessage="CR Updated Successfully" toastColor={'success'} />
  )
  const handleUpdateChangeRequest = async () => {
    const prepareObject = {
      ...editChangeRequest,
      ...{
        descripition: editDescription as string,
      },
    }
    const updateChangeRequestResultAction = await dispatch(
      reduxServices.projectChangeRequest.updateChangeRequest(prepareObject),
    )
    if (
      reduxServices.projectChangeRequest.updateChangeRequest.fulfilled.match(
        updateChangeRequestResultAction,
      )
    ) {
      setToggle('')
      dispatch(
        reduxServices.projectChangeRequest.getProjectChangeRequestList({
          endIndex: 20,
          firstIndex: 0,
          projectid: projectId,
        }),
      )
      dispatch(dispatch(reduxServices.app.actions.addToast(toastElement)))
    }
  }

  useEffect(() => {
    if (
      editChangeRequest?.name?.replace(/^\s*/, '') &&
      editChangeRequest?.duration?.replace(/^\s*/, '') &&
      editDescription
    ) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [editChangeRequest?.name, editChangeRequest?.duration, editDescription])
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info"
            className="btn-ovh me-1"
            data-testid="back-btn"
            onClick={() => setToggle('')}
          >
            <i className="fa fa-arrow-left  me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel {...nameProps}>
            Name :
            <span
              className={showIsRequired(
                editChangeRequest?.name?.replace(/^\s*/, ''),
              )}
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              data-testid="request-name"
              value={editChangeRequest?.name}
              onChange={onChangeHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
            Duration :
            <span
              className={showIsRequired(
                editChangeRequest?.duration?.replace(/^\s*/, ''),
              )}
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              id="duration"
              autoComplete="off"
              data-testid="duration-testing"
              name="duration"
              placeholder="Hours"
              value={editChangeRequest?.duration}
              onChange={onChangeHandler}
              maxLength={8}
            />
          </CCol>
        </CRow>

        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
            Description :
            <span
              className={showIsRequired(
                editChangeRequest.descripition as string,
              )}
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormTextarea
              placeholder="Purpose"
              data-testid="text-area"
              aria-label="textarea"
              autoComplete="off"
              value={editDescription}
              maxLength={150}
              onChange={(e) => setEditDescription(e.target.value)}
            ></CFormTextarea>
            <p>{editDescription?.length}/150</p>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                color="success"
                onClick={handleUpdateChangeRequest}
                disabled={!isUpdateButtonEnabled}
              >
                Update
              </CButton>
            </>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default EditChangeRequest
