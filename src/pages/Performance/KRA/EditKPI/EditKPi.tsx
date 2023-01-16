import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
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
  IncomingKPIDataItem,
  KRAPages,
} from '../../../../types/Performance/KRA/KRATypes'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { showIsRequired } from '../../../../utils/helper'

const EditKPi = ({
  editKPi,
}: {
  editKPi: IncomingKPIDataItem
}): JSX.Element => {
  const initialKPIData = {} as IncomingKPIDataItem
  const formLabelProps = {
    htmlFor: 'inputEditKPI',
    className: 'col-form-label addKpi-label',
  }
  const [editKPICopy, setEditKPiCopy] = useState(initialKPIData)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [selectFrequency, setSelectFrequency] = useState<number | string>()
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const frequency = useTypedSelector(reduxServices.KRA.selectors.frequency)

  const handleDescription = (description: string) => {
    setEditKPiCopy((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const backButtonHandler = () => {
    dispatch(reduxServices.KRA.actions.setCurrentOnScreenPage(KRAPages.kraList))
  }

  useEffect(() => {
    if (editKPi) {
      setEditKPiCopy({
        id: editKPi.id,
        name: editKPi.name,
        description: editKPi.description,
        frequencyId: editKPi.frequencyId,
        frequency: editKPi.frequency,
        target: editKPi.target,
        kraDto: editKPi.kraDto,
      })
    }
    if (editKPi.description) {
      setShowEditor(false)
      setTimeout(() => {
        setShowEditor(true)
      }, 100)
    }
  }, [editKPi])

  useEffect(() => {
    if (editKPICopy.name && editKPICopy.target) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [editKPICopy.name, editKPICopy.target])

  const toastElement = (
    <OToast toastColor="success" toastMessage="KPI updated successfully" />
  )

  const updateKPIHandler = async () => {
    const prepareObject = {
      ...editKPICopy,
      frequencyId: Number(selectFrequency),
    }
    const editKPIResultAction = await dispatch(
      reduxServices.KRA.updateKPI(prepareObject),
    )

    if (reduxServices.KRA.updateKPI.fulfilled.match(editKPIResultAction)) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
      backButtonHandler()
    }
  }

  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info"
            className="btn-ovh me-1"
            data-testid="editkpi-backBtn"
            onClick={backButtonHandler}
          >
            <i className="fa fa-arrow-left  me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            KRA Name:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="edit-kra-name"
              autoComplete="off"
              type="text"
              name="kraName"
              disabled
              value={editKPi?.kraDto.name}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            KPI Name: <span className={showIsRequired(editKPi?.name)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="editkpiName-input"
              autoComplete="off"
              type="text"
              name="kpiName"
              value={editKPICopy?.name}
              // onChange={handleInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Frequency :
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="frequency"
              name="frequency"
              id="frequency"
              data-testid="edit-frequency-input"
              onChange={(e) => {
                setSelectFrequency(e.target.value)
              }}
              value={selectFrequency}
            >
              {frequency?.map((freq) => (
                <option key={freq.id} value={freq.id}>
                  {freq.frequencyname}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Target: <span className={showIsRequired(editKPi?.target)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="edit-target-input"
              autoComplete="off"
              type="text"
              name="target"
              value={editKPICopy.target}
              //   onChange={handleInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className={TextLabelProps}>Description: </CFormLabel>
          {showEditor ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={editKPICopy?.description}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleDescription(editor.getData().trim())
                }}
              />
            </CCol>
          ) : (
            ''
          )}
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="save-btn"
              className="btn-ovh me-1"
              color="success"
              onClick={updateKPIHandler}
              disabled={!isButtonEnabled}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default EditKPi
