import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { emptyString } from '../../../../constant/constantData'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { KRADataQueryBody } from '../../../../types/Performance/KRA/KRATypes'
import {
  getDepartmentId,
  getDesignationId,
  selectDepartment,
  selectDesignation,
} from '../KRAConstants'

const KRAFilterOptions = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isViewButtonEnabled, setViewButtonEnabled] = useState<boolean>(false)
  const [isSearchButtonEnabled, setSearchButtonEnabled] =
    useState<boolean>(false)
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>(selectDepartment)
  const [selectedDesignation, setSelectedDesignation] =
    useState<string>(selectDesignation)
  const [multiSearchInput, setMultiSearchInput] = useState<string>(emptyString)

  const empDepartmentsList = useTypedSelector(
    (state) => state.KRA.empDepartments,
  )
  const designationList = useTypedSelector((state) => state.KRA.designations)

  useEffect(() => {
    if (selectedDepartment !== selectDepartment) {
      dispatch(
        reduxServices.KRA.getDesignationThunk(
          getDepartmentId(empDepartmentsList, selectedDepartment),
        ),
      )
    }
    setSelectedDesignation(selectDesignation)
  }, [selectedDepartment])

  useEffect(() => {
    if (multiSearchInput.trim().length === 0) {
      setSearchButtonEnabled(false)
    } else {
      setSearchButtonEnabled(true)
    }
  }, [multiSearchInput])

  useEffect(() => {
    if (
      selectedDepartment === selectDepartment &&
      selectedDesignation === selectDesignation
    ) {
      setViewButtonEnabled(false)
    } else {
      setViewButtonEnabled(true)
    }
  }, [selectedDepartment, selectedDesignation])

  const departmentChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value)
  }

  const designationChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDesignation(e.target.value)
  }

  const searchContentChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMultiSearchInput(e.target.value)
  }

  const submitFormHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const finalBody: KRADataQueryBody = {
      designationId: getDesignationId(
        designationList,
        selectedDesignation,
      ).toString(),
      departmentId: getDepartmentId(empDepartmentsList, selectedDepartment),
      startIndex: 0,
      endIndex: 20,
      multipleSearch: multiSearchInput,
    }
    dispatch(reduxServices.KRA.searchKRADataThunk(finalBody))
  }

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSelectedDepartment(selectDepartment)
    setSelectedDesignation(selectDesignation)
    setMultiSearchInput(emptyString)
    dispatch(reduxServices.KRA.actions.clearKRAList())
  }

  return (
    <CForm className="mb-4">
      <CContainer className="mt-4 ms-0 ps-0">
        <CRow className="align-items-center">
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel>Department:</CFormLabel>
          </CCol>
          <CCol sm={3}>
            <CFormSelect
              size="sm"
              value={selectedDepartment}
              onChange={departmentChangeHandler}
            >
              <option>{selectDepartment}</option>
              {empDepartmentsList.map((item, index) => (
                <option key={index} value={item.departmentName}>
                  {item.departmentName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol sm={5}>
            <CRow className="align-items-center">
              <CCol sm={3} className="text-end">
                <CFormLabel>Designation:</CFormLabel>
              </CCol>
              <CCol sm={7}>
                <CFormSelect
                  size="sm"
                  value={selectedDesignation}
                  onChange={designationChangeHandler}
                >
                  <option value={selectDesignation}>{selectDesignation}</option>
                  {designationList.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
          </CCol>
          <CCol sm={3} className="px-0 text-end">
            <CButton color="info" className="btn-ovh">
              +Add KRA
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
      <CContainer>
        <CRow className="mt-4">
          <CFormLabel className="col-form-label category-label col-sm-3 col-form-label text-end"></CFormLabel>
          <CCol sm={4}>
            <CButton
              data-testid="view-btn-id"
              type="submit"
              className="btn-ovh me-1"
              color="success"
              disabled={!isViewButtonEnabled}
              onClick={submitFormHandler}
            >
              View
            </CButton>
            <CButton
              data-testid="clear-btn-id"
              color="warning "
              className="btn-ovh me-1"
              onClick={clearButtonHandler}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
      <CContainer className="pe-0">
        <CRow className="gap-2 d-md-flex justify-content-md-end">
          <CCol sm={6} md={4} lg={2} xl={4} xxl={3}>
            <CInputGroup className="global-search me-0">
              <CFormInput
                placeholder="Multiple Search"
                aria-label="Multiple Search"
                aria-describedby="button-addon2"
                value={multiSearchInput}
                onChange={searchContentChangeHandler}
              />
              <CButton
                data-testid="multi-search-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="button-addon2"
                disabled={!isSearchButtonEnabled}
                onClick={submitFormHandler}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CContainer>
    </CForm>
  )
}

export default KRAFilterOptions
