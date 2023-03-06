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
import { KRAPages } from '../../../../types/Performance/KRA/KRATypes'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { showIsRequired } from '../../../../utils/helper'

const EditKPi = (): JSX.Element => {
  const formLabelProps = {
    htmlFor: 'inputEditKPI',
    className: 'col-form-label addKpi-label',
  }
  const editKpi = useTypedSelector(reduxServices.KRA.selectors.editKpi)
  const [editKPICopy, setEditKPiCopy] = useState(editKpi)
  const [selectFrequency, setSelectFrequency] = useState<number | string>(
    editKpi?.frequencyId,
  )
  const [isUpdateBtnEnabled, setIsUpdateBtnEnabled] = useState<boolean>()
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const frequency = useTypedSelector(reduxServices.KRA.selectors.frequency)
  const currentQuery = useTypedSelector((state) => state.KRA.krasQuery)
  const handleDescription = (description: string) => {
    setEditKPiCopy((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const backButtonHandler = () => {
    dispatch(reduxServices.KRA.actions.setCurrentOnScreenPage(KRAPages.kraList))
  }
  useEffect(() => {
    if (editKPICopy?.name && editKPICopy?.target) {
      setIsUpdateBtnEnabled(true)
    } else {
      setIsUpdateBtnEnabled(false)
    }
  }, [editKPICopy])

  useEffect(() => {
    if (editKpi) {
      dispatch(reduxServices.KRA.actions.setEditKpi(editKpi))
    }
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }, [editKpi])

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'name') {
      const kpiNameVal = value.replace(/^\s*/, '')
      setEditKPiCopy((prevState) => {
        return { ...prevState, ...{ [name]: kpiNameVal } }
      })
    } else if (name === 'target') {
      const targetVal = value.replace(/^\s*/, '')
      setEditKPiCopy((prevState) => {
        return { ...prevState, ...{ [name]: targetVal } }
      })
    } else {
      setEditKPiCopy((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const toastElement = (
    <OToast toastColor="success" toastMessage="KPI updated successfully" />
  )

  const updateKPIHandler = async () => {
    const prepareObject = {
      ...editKPICopy,
      frequencyId: selectFrequency,
      frequency: frequency?.filter((freq) => freq.id === selectFrequency)[0]
        ?.frequencyname,
    }
    const editKPIResultAction = await dispatch(
      reduxServices.KRA.updateKPI(prepareObject),
    )

    if (reduxServices.KRA.updateKPI.fulfilled.match(editKPIResultAction)) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
      dispatch(reduxServices.KRA.searchKRADataThunk(currentQuery))
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
              value={editKpi?.kraDto?.name}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            KPI Name:{' '}
            <span className={showIsRequired(editKPICopy?.name)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="editkpiName-input"
              autoComplete="off"
              type="text"
              name="name"
              id="name"
              value={editKPICopy?.name}
              onChange={onChangeInputHandler}
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
            Target:{' '}
            <span className={showIsRequired(editKPICopy?.target)}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="edit-target-input"
              autoComplete="off"
              type="text"
              id="target"
              name="target"
              value={editKPICopy?.target}
              onChange={onChangeInputHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className={TextLabelProps}>Description: </CFormLabel>
          <CCol sm={9}>
            {showEditor && (
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
            )}
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="update-btn"
              className="btn-ovh me-1"
              color="success"
              disabled={!isUpdateBtnEnabled}
              onClick={updateKPIHandler}
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
