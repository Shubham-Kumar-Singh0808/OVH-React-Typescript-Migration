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
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const NewProcessAreas = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const ProjectTailoringList = useTypedSelector(
    reduxServices.processArea.selectors.ProjectTailoringList,
  )
  const [selectCategory, setSelectCategory] = useState<string>('')
  const [processArea, setProcessArea] = useState<string>('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  useEffect(() => {
    if (selectCategory && processArea.replace(/^\s*/, '')) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [selectCategory, processArea])

  const clearData = () => {
    setSelectCategory('')
    setProcessArea('')
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Process Areas"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
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
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Category:
              <span className={selectCategory ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="location"
                data-testid="form-select1"
                name="location"
                value={selectCategory}
                onChange={(e) => {
                  setSelectCategory(e.target.value)
                }}
              >
                <option value={''}>-- Select Category --</option>
                {ProjectTailoringList.length > 0 &&
                  ProjectTailoringList?.map((item, index) => (
                    <option key={index}>{item.processHeadname}</option>
                  ))}
              </CFormSelect>
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
                data-testid="reviewTitle"
                type="text"
                id="reviewTitle"
                autoComplete="off"
                size="sm"
                name="reviewTitle"
                placeholder="Process Area Name"
                value={processArea}
                onChange={(e) => setProcessArea(e.target.value)}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                disabled={!isAddButtonEnabled}
              >
                Add
              </CButton>
              <CButton
                data-testid="clear-btn"
                color="warning"
                className="btn-ovh text-white"
                onClick={clearData}
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
