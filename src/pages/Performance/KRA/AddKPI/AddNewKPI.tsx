import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextLabelProps } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  KRAPages,
  KRATableDataItem,
  AddKPIData,
} from '../../../../types/Performance/KRA/KRATypes'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { showIsRequired } from '../../../../utils/helper'

const AddNewKPI = ({ addKPI }: { addKPI: KRATableDataItem }): JSX.Element => {
  const initialKPIData = {} as AddKPIData
  const [addNewKPi, setAddNewKPi] = useState(initialKPIData)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [selectFrequency, setSelectFrequency] = useState<number | string>()
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const frequency = useTypedSelector(reduxServices.KRA.selectors.frequency)
  const handleDescription = (description: string) => {
    setAddNewKPi((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const backButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(reduxServices.KRA.actions.setCurrentOnScreenPage(KRAPages.kraList))
  }

  useEffect(() => {
    if (
      selectFrequency &&
      addNewKPi.name &&
      addNewKPi.target &&
      addNewKPi.description
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [selectFrequency, addNewKPi.name, addNewKPi.target, addNewKPi.description])

  const handleClearInputs = () => {
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
    setAddNewKPi({
      frequencyId: 0,
      name: '',
      target: '',
      description: '',
      kraId: 0,
    })
    setSelectFrequency('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'name') {
      const kpiNameVal = value.replace(/^\s*/, '')
      setAddNewKPi((prevState) => {
        return { ...prevState, ...{ [name]: kpiNameVal } }
      })
    } else if (name === 'target') {
      const targetVal = value.replace(/^\s*/, '')
      setAddNewKPi((prevState) => {
        return { ...prevState, ...{ [name]: targetVal } }
      })
    } else {
      setAddNewKPi((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const addKPIHandler = async () => {
    const duplicateKPIResponse = await dispatch(
      reduxServices.KRA.checkIfNewKpiDuplicate({
        id: addKPI.id,
        name: addNewKPi.name,
      }),
    )
    if (duplicateKPIResponse.payload === false) {
      const prepareObject = {
        ...addNewKPi,
        frequencyId: Number(selectFrequency),
        kraId: addKPI.id,
      }
      const successToast = (
        <OToast toastColor="success" toastMessage="KPI added successfully." />
      )
      const addKPIResultAction = await dispatch(
        reduxServices.KRA.addKPI(prepareObject),
      )
      if (reduxServices.KRA.addKPI.fulfilled.match(addKPIResultAction)) {
        dispatch(reduxServices.app.actions.addToast(successToast))
        handleClearInputs()
      }
    } else {
      const errorToast = (
        <OToast toastColor="danger" toastMessage="KPI already exist." />
      )
      dispatch(reduxServices.app.actions.addToast(errorToast))
    }
  }

  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info"
            className="btn-ovh me-1"
            data-testid="kpi-back-btn"
            onClick={backButtonHandler}
          >
            <i className="fa fa-arrow-left  me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
            KRA Name :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="kra-name"
              autoComplete="off"
              type="text"
              name="kraName"
              disabled
              value={addKPI?.name}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
            Department :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="dept-name"
              autoComplete="off"
              type="text"
              name="department"
              disabled
              value={addKPI?.departmentName}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
            Designation :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="designation-name"
              autoComplete="off"
              type="text"
              name="designation"
              disabled
              value={addKPI?.designationName}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            KPI Name :<span className={showIsRequired(addNewKPi?.name)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="kpiName-input"
              autoComplete="off"
              type="text"
              name="name"
              placeholder="KPI Name"
              value={addNewKPi.name}
              maxLength={250}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Frequency :
            <span className={showIsRequired(selectFrequency as string)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="frequency"
              name="frequency"
              id="frequency"
              data-testid="frequency-input"
              onChange={(e) => {
                setSelectFrequency(e.target.value)
              }}
              value={selectFrequency}
            >
              <option value="">Select</option>
              {frequency?.map((freq) => (
                <option key={freq.id} value={freq.id}>
                  {freq.frequencyname}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Target :<span className={showIsRequired(addNewKPi?.target)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="target-input"
              autoComplete="off"
              type="text"
              placeholder="Target"
              name="target"
              value={addNewKPi.target}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className={TextLabelProps}>
            Description :
            <span className={showIsRequired(addNewKPi?.description)}>*</span>
          </CFormLabel>
          {showEditor ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={addNewKPi?.description}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleDescription(editor.getData().trim())
                }}
              />
            </CCol>
          ) : (
            'N/A'
          )}
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="save-btn"
              className="btn-ovh me-1"
              color="success"
              disabled={!isButtonEnabled}
              onClick={addKPIHandler}
            >
              Add
            </CButton>
            <CButton
              data-testid="clear-btn"
              color="warning "
              className="btn-ovh"
              onClick={handleClearInputs}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default AddNewKPI
