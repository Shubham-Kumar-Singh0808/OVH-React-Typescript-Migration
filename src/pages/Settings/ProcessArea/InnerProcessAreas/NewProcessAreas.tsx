import {
  CRow,
  CCol,
  CButton,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CForm,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const NewProcessAreas = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const ProcessArea = useTypedSelector(
    reduxServices.processArea.selectors.ProcessArea,
  )
  const [selectCategoryName, setSelectCategoryName] = useState<string>('')
  const [processArea, setProcessArea] = useState<string>('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [processNameExists, setProcessNameExists] = useState<string>('')

  const ProjectTailoringData = useTypedSelector(
    reduxServices.processArea.selectors.ProjectTailoringList,
  )

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  useEffect(() => {
    if (selectCategoryName && processArea.replace(/^\s*/, '')) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [selectCategoryName, processArea])

  const clearData = () => {
    setSelectCategoryName('')
    setProcessArea('')
  }

  const processNameAlreadyExists = (name: string) => {
    return ProcessArea?.find((processName) => {
      return processName.name.toLowerCase() === name.toLowerCase()
    })
  }

  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'processArea') {
      const newValue = value.replace(/^\s*/, '').replace(/[^a-z\s]/gi, '')
      setProcessArea(newValue)
    }
    if (processNameAlreadyExists(value.trim())) {
      setProcessNameExists(value.trim())
    } else {
      setProcessNameExists('')
    }
  }

  const addedToastMessage = (
    <OToast
      toastMessage="Process Area saved successfully.
    "
      toastColor="success"
    />
  )

  const addedErrorToastMessage = (
    <OToast
      toastMessage="Process Area already exists.
    "
      toastColor="danger"
    />
  )

  const addBtnHandler = async () => {
    const addProcessNameResultAction = await dispatch(
      reduxServices.processArea.createProcessArea({
        categoryId: Number(selectCategoryName),
        name: processArea,
      }),
    )

    if (
      reduxServices.processArea.createProcessArea.fulfilled.match(
        addProcessNameResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(addedToastMessage))
      setSelectCategoryName('')
      setProcessArea('')
      dispatch(reduxServices.app.actions.addToast(undefined))
    } else if (
      reduxServices.processArea.createProcessArea.rejected.match(
        addProcessNameResultAction,
      ) &&
      addProcessNameResultAction.payload === 409
    ) {
      dispatch(reduxServices.app.actions.addToast(addedErrorToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
      setProcessArea('')
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Process Areas"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CForm>
          <CRow className="mt-2 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Category:
              <span className={selectCategoryName ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="location"
                data-testid="form-select1"
                name="location"
                value={selectCategoryName}
                onChange={(e) => {
                  setSelectCategoryName(e.target.value)
                }}
              >
                <option value={''}>-- Select Category --</option>
                {ProjectTailoringData.length > 0 &&
                  ProjectTailoringData?.map((item, index) => (
                    <option key={index} value={item.processHeadId}>
                      {item.processHeadname}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
            <CCol className="text-end" md={6}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-button"
                onClick={() => setToggle('addProcessArea')}
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Process Area Name:
              <span
                className={
                  processArea.replace(/^\s*/, '') ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="processArea"
                type="text"
                id="processArea"
                autoComplete="off"
                size="sm"
                name="processArea"
                placeholder="Process Area Name"
                value={processArea}
                onChange={handledInputChange}
                required
              />
            </CCol>
            <CCol sm={3}>
              {processNameExists && (
                <p className={TextDanger} data-testid="nameAlreadyExist">
                  Process Name Already Exists
                </p>
              )}
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                disabled={
                  isAddButtonEnabled
                    ? isAddButtonEnabled && processNameExists?.length > 0
                    : !isAddButtonEnabled
                }
                onClick={addBtnHandler}
              >
                Add
              </CButton>
              <CButton
                data-testid="clear-btn"
                color="warning"
                className="btn-ovh text-white"
                onClick={clearData}
                type="submit"
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default NewProcessAreas
