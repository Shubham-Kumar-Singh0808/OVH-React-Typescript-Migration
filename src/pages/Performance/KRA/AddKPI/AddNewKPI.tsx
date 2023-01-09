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
import React, { useState } from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import {
  TextWhite,
  TextDanger,
  TextLabelProps,
} from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { AddKPIData } from '../../../../types/Performance/KRA/AddKPI/addKPITypes'
import { KRAPages } from '../../../../types/Performance/KRA/KRATypes'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { showIsRequired } from '../../../../utils/helper'

const AddNewKPI = (): JSX.Element => {
  const initialKPIData = {} as AddKPIData
  const formLabelProps = {
    htmlFor: 'inputNewKPI',
    className: 'col-form-label addKpi-label',
  }

  const [addKPI, setAddKPI] = useState(initialKPIData)
  const [selectFrequency, setSelectFrequency] = useState<number | string>()
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const frequency = useTypedSelector(reduxServices.KRA.selectors.frequency)
  const handleDescription = (description: string) => {
    setAddKPI((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const backButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(reduxServices.KRA.actions.setCurrentOnScreenPage(KRAPages.kraList))
  }

  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info"
            className="btn-ovh me-1"
            data-testid="toggle-back-btn"
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
              data-testid="kra-name"
              autoComplete="off"
              type="text"
              name="kraName"
              disabled
              // value={addNewPage.title}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Department:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="dept-name"
              autoComplete="off"
              type="text"
              name="department"
              disabled
              // value={addNewPage.title}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Designation:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="designation-name"
              autoComplete="off"
              type="text"
              name="designation"
              disabled
              // value={addNewPage.title}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            KPI Name:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="title-input"
              autoComplete="off"
              type="text"
              name="title"
              // value={addNewPage.title}
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
              aria-label="deptName"
              name="deptName"
              id="deptName"
              data-testid="department-name"
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
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Target:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="title-input"
              autoComplete="off"
              type="text"
              name="title"
              // value={addNewPage.title}
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
                //   initData={addNewPage?.description}
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
            >
              Add
            </CButton>
            <CButton
              data-testid="clear-btn"
              color="warning "
              className="btn-ovh"
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
