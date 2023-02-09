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
import { useTypedSelector } from '../../../../stateStore'
import { GetProcessAreaDetails } from '../../../../types/Settings/ProcessAreas/processAreaTypes'

const EditProcessArea = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const initialProcessAreaDetails = {} as GetProcessAreaDetails
  const [processArea, setProcessArea] = useState(initialProcessAreaDetails)
  const [isUpdateBtnEnabled, setIsUpdateBtnEnabled] = useState<boolean>(false)

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const processAreaDetails = useTypedSelector(
    reduxServices.processArea.selectors.processAreaDetails,
  )

  useEffect(() => {
    if (processAreaDetails != null) {
      setProcessArea(processAreaDetails)
    }
  }, [processAreaDetails])

  const onChangeInputHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setProcessArea((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  useEffect(() => {
    if (
      processArea.documentName &&
      processArea.responsible &&
      processArea.link &&
      processArea.order
    ) {
      setIsUpdateBtnEnabled(true)
    } else {
      setIsUpdateBtnEnabled(false)
    }
  }, [processArea])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Process Area"
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
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="selectCategory"
                data-testid="form-select1"
                name="selectCategory"
                value={processArea.categoryId}
              ></CFormSelect>
            </CCol>
            <CCol className="text-end" md={6}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-btn-handler"
                onClick={() => setToggle('')}
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
                  processArea.processSubHeadName ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="selectProcessAreaName"
                data-testid="form-select2"
                name="selectProcessAreaName"
                value={processArea.processSubHeadName}
              ></CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Document Name:
              <span
                className={processArea.documentName ? TextWhite : TextDanger}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="documentName"
                type="text"
                id="documentName"
                autoComplete="off"
                size="sm"
                name="documentName"
                placeholder="Document Name"
                value={processArea.documentName}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Responsible:
              <span
                className={processArea.responsible ? TextWhite : TextDanger}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="responsible"
                type="text"
                id="responsible"
                autoComplete="off"
                size="sm"
                name="responsible"
                placeholder="Responsible"
                value={processArea.responsible}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Project Document Link:
              <span className={processArea.link ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="documentLink"
                type="text"
                id="documentLink"
                autoComplete="off"
                size="sm"
                name="documentLink"
                placeholder="Link"
                value={processArea.link}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Status:
            </CFormLabel>
            <CCol sm={3}>
              <CFormCheck
                data-testid="active"
                className="mt-2 sh-hover-handSymbol"
                type="radio"
                name="activeState"
                id="Active"
                label="Active"
                value="true"
                inline
              />
              <CFormCheck
                className="mt-2 sh-hover-handSymbol"
                type="radio"
                name="activeState"
                id="Inactive"
                label="Inactive"
                value="false"
                inline
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Order
              <span className={processArea.order ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="selectOrder"
                type="text"
                id="selectOrder"
                autoComplete="off"
                size="sm"
                maxLength={2}
                min={1}
                max={99}
                name="selectOrder"
                value={processArea.order}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="updateBtn"
                className="btn-ovh me-1 text-white"
                color="success"
                disabled={!isUpdateBtnEnabled}
              >
                Update
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default EditProcessArea
