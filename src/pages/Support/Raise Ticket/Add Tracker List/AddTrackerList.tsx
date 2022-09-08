import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import OCard from '../../../../components/ReusableComponent/OCard'

const AddTrackerList = (): JSX.Element => {
  const [textName, setTextName] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }
  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name } = event.target
    if (name === 'name') {
      setTextName(
        event.target.value.replace(/[^a-zA-Z0-9\s]/gi, '').replace(/^\s*/, ''),
      )
    }
  }
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setIsChecked(e.target.checked)
  }
  const addButtonHandler = () => {
    'super'
  }
  const clearData = () => {
    setTextName('')
    setIsChecked(false)
  }
  useEffect(() => {
    if (textName) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [textName])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Tracker List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/createTicket`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                //onClick={}
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-3 mb-3">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Name:
              <span className={textName ? 'text-white' : 'text-danger'}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="Name"
                size="sm"
                name="name"
                maxLength={32}
                value={textName}
                onChange={handledInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Work Flow:
            </CFormLabel>
            <CCol sm={3}>
              <CFormCheck
                data-testid="ch-All"
                id="workflow"
                name="workflow"
                checked={isChecked}
                onChange={handleChecked}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                onClick={addButtonHandler}
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
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Approval</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
          </CTable>
        </CForm>
      </OCard>
    </>
  )
}
export default AddTrackerList
