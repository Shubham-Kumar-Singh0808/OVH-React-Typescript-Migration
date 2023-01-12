import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormTextarea,
  CButton,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../../stateStore'
import { AddChangeRequestProps } from '../../../../../types/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestTypes'
import { showIsRequired } from '../../../../../utils/helper'

const AddEditChangeRequest = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const initialChangeRequest = {} as AddChangeRequestProps
  const [addChangeRequest, setAddChangeRequest] = useState(initialChangeRequest)
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [changeRequestDescription, setChangeRequestDescription] =
    useState<string>('')
  const classNameProps = 'col-sm-3 col-form-label text-end'
  const { projectId } = useParams<{ projectId: string }>()
  const nameProps = {
    className: classNameProps,
    htmlFor: 'Name',
  }
  const dispatch = useAppDispatch()

  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setAddChangeRequest((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }
  console.log(addChangeRequest?.name)
  useEffect(() => {
    if (
      addChangeRequest?.name?.replace(/^\s*/, '') &&
      addChangeRequest?.duration?.replace(/^\s*/, '') &&
      changeRequestDescription?.replace(/^\s*/, '')
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [
    addChangeRequest?.name,
    addChangeRequest?.duration,
    changeRequestDescription,
  ])
  const toastElement = (
    <OToast toastMessage="CR Added Successfully" toastColor={'success'} />
  )
  const handleAddChangeRequest = async () => {
    const prepareObject = {
      ...addChangeRequest,
      ...{
        projectId,
        descripition: changeRequestDescription,
      },
    }
    const addChangeRequestResultAction = await dispatch(
      reduxServices.projectChangeRequest.addChangeRequest(prepareObject),
    )
    if (
      reduxServices.projectChangeRequest.addChangeRequest.fulfilled.match(
        addChangeRequestResultAction,
      )
    ) {
      setToggle('')
      dispatch(dispatch(reduxServices.app.actions.addToast(toastElement)))
      dispatch(
        reduxServices.projectChangeRequest.getProjectChangeRequestList({
          endIndex: 20,
          firstIndex: 0,
          projectid: projectId as string,
        }),
      )
    }
  }
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info"
            className="btn-ovh me-1"
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
            <span className={showIsRequired(addChangeRequest?.name)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              data-testid="person-name"
              value={addChangeRequest?.name}
              onChange={onChangeHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
            Duration :
            <span
              className={showIsRequired(
                addChangeRequest?.duration?.replace(/^\s*/, ''),
              )}
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              id="duration"
              data-testid="contact-number"
              name="duration"
              placeholder="Hours"
              value={addChangeRequest?.duration}
              onChange={onChangeHandler}
              maxLength={10}
            />
          </CCol>
        </CRow>

        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
            Description :
            <span
              className={showIsRequired(
                changeRequestDescription?.replace(/^\s*/, ''),
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
              value={changeRequestDescription}
              maxLength={150}
              onChange={(e) => setChangeRequestDescription(e.target.value)}
            ></CFormTextarea>
            <p>{changeRequestDescription?.length}/150</p>
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                color="success"
                onClick={handleAddChangeRequest}
                disabled={!isAddButtonEnabled}
              >
                Add
              </CButton>
              <CButton color="warning " className="btn-ovh">
                Clear
              </CButton>
            </>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default AddEditChangeRequest
