import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormSelect,
  CFormInput,
  CFormCheck,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { ProcessSubHeadsDto } from '../../../../types/Settings/ProcessAreas/processAreaTypes'

const AddProcessArea = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const [selectCategory, setSelectCategory] = useState<string>('')
  const [documentName, setDocumentName] = useState<string>('')
  const [responsible, setResponsible] = useState<string>('')
  const [documentLink, setDocumentLink] = useState<string>('')
  const [selectProcessAreaName, setSelectProcessAreaName] = useState<string>('')
  const [selectActiveStatus, setSelectActiveStatus] = useState<string>('')
  const [selectOrder, setSelectOrder] = useState<string>('')

  const initialEmployeeVisaDetails = {} as ProcessSubHeadsDto
  const [employeeVisaDetails, setEmployeeVisaDetails] = useState(
    initialEmployeeVisaDetails,
  )

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const ProjectTailoringList = useTypedSelector(
    reduxServices.processArea.selectors.ProjectTailoringList,
  )

  const ProcessArea = useTypedSelector(
    reduxServices.processArea.selectors.ProcessArea,
  )
  console.log(employeeVisaDetails.categoryId)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (selectCategory)
      dispatch(
        reduxServices.processArea.getProcessAreas(
          employeeVisaDetails.categoryId,
        ),
      )
  }, [dispatch, selectCategory])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Process Area"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={() => setToggle('')}
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
                // value={employeeVisaDetails.categoryId}
                // onChange={onChangeHandler}
              >
                <option value={''}>-- Select Category --</option>
                {/* {ProjectTailoringList.length > 0 &&
                  ProjectTailoringList?.map((item, index) => (
                    <option key={index} value={item.id as number}>
                      {item.processHeadname}
                    </option>
                  ))} */}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Process Area Name:
              <span className={selectProcessAreaName ? TextWhite : TextDanger}>
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
                // value={selectProcessAreaName}
                // onChange={(e) => setSelectProcessAreaName(e.target.value)}
              >
                <option value={''}>-- Select Process Areas --</option>
                {/* {ProcessArea.length > 0 &&
                  ProcessArea?.map((item, index) => (
                    <option key={index} value={item.id as number}>
                      {item.name}
                    </option>
                  ))} */}
              </CFormSelect>
            </CCol>
            <CCol className="col-sm-3">
              <CButton
                color="info btn-ovh me-1"
                onClick={() => setToggle('addNewProcessArea')}
              >
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Document Name:
              <span className={documentName ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="reviewTitle"
                type="text"
                id="reviewTitle"
                autoComplete="off"
                size="sm"
                name="reviewTitle"
                placeholder="Name"
                value={documentName}
                // onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Responsible:
              <span className={responsible ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="reviewTitle"
                type="text"
                id="reviewTitle"
                autoComplete="off"
                size="sm"
                name="reviewTitle"
                placeholder="Name"
                value={responsible}
                // onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Document Link:
              <span className={documentLink ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="reviewTitle"
                type="text"
                id="reviewTitle"
                autoComplete="off"
                size="sm"
                name="reviewTitle"
                placeholder="Name"
                value={documentLink}
                // onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Status :
            </CFormLabel>
            <CCol sm={3}>
              <CFormCheck
                data-testid="active"
                className="mt-2 sh-hover-handSymbol"
                type="radio"
                name="yes"
                id="yes"
                label="Yes"
                inline
                onChange={(e) => setSelectActiveStatus(e.target.value)}
                value={'true'}
                checked={selectActiveStatus === 'true'}
              />
              <CFormCheck
                className="mt-2 sh-hover-handSymbol"
                type="radio"
                name="no"
                id="no"
                label="No"
                inline
                onChange={(e) => setSelectActiveStatus(e.target.value)}
                value={'false'}
                checked={selectActiveStatus === 'false'}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Order
              <span className={selectOrder ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="reviewTitle"
                type="text"
                id="reviewTitle"
                autoComplete="off"
                size="sm"
                name="reviewTitle"
                placeholder="Name"
                value={selectOrder}
                // onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1 text-white"
                color="success"
              >
                Add
              </CButton>
              <CButton
                data-testid="clear-btn"
                color="warning"
                className="btn-ovh text-white"
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

export default AddProcessArea
