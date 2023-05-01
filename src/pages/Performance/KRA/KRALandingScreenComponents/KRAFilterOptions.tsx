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
import {
  KRADataQueryBody,
  KRAFilterOptionsProps,
  KRAPages,
} from '../../../../types/Performance/KRA/KRATypes'
import {
  getDepartmentId,
  getDesignationId,
  selectDepartment,
  selectDesignation,
} from '../KRAConstants'

const KRAFilterOptions = (props: KRAFilterOptionsProps): JSX.Element => {
  const {
    currentPage,
    pageSize,
    selectedDepartment,
    selectedDesignation,
    setSelectedDepartment,
    setSelectedDesignation,
  } = props
  const dispatch = useAppDispatch()
  const [isViewButtonEnabled, setViewButtonEnabled] = useState<boolean>(false)
  const [isSearchButtonEnabled, setSearchButtonEnabled] =
    useState<boolean>(false)
  const [multiSearchInput, setMultiSearchInput] = useState<string>(emptyString)

  const empDepartmentsList = useTypedSelector(
    (state) => state.KRA.empDepartments,
  )
  const designationList = useTypedSelector((state) => state.KRA.designations)
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToAddKRA = userAccessToFeatures?.find(
    (feature) => feature.name === 'KRA',
  )

  useEffect(() => {
    if (selectedDepartment !== selectDepartment) {
      dispatch(
        reduxServices.KRA.getDesignationThunk(
          getDepartmentId(empDepartmentsList, selectedDepartment),
        ),
      )
    }
    setSelectedDesignation(selectedDesignation)
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

  const startIndex = (): number => {
    return (currentPage - 1) * pageSize
  }

  const endIndex = (): number => {
    return currentPage * pageSize
  }

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

  const addKRAButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // dispatch(reduxServices.KRA.actions.clearDesignationList())
    dispatch(reduxServices.KRA.actions.setCurrentOnScreenPage(KRAPages.addKra))
  }

  const getFinalBody = (startInd: number, endInd: number): KRADataQueryBody => {
    const finalBody: KRADataQueryBody = {
      designationId: getDesignationId(
        designationList,
        selectedDesignation,
      ).toString(),
      departmentId: getDepartmentId(empDepartmentsList, selectedDepartment),
      startIndex: startInd,
      endIndex: endInd,
      multipleSearch: multiSearchInput,
    }
    dispatch(reduxServices.KRA.actions.setKRAQuery(finalBody))
    return finalBody
  }

  useEffect(() => {
    const start = startIndex()
    const end = endIndex()
    dispatch(reduxServices.KRA.searchKRADataThunk(getFinalBody(start, end)))
  }, [currentPage, pageSize])

  useEffect(() => {
    if (designationList) {
      dispatch(
        reduxServices.KRA.getDesignationThunk(
          getDepartmentId(empDepartmentsList, selectedDepartment),
        ),
      )
    }
  }, [designationList, selectedDepartment])

  const submitFormHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(reduxServices.KRA.searchKRADataThunk(getFinalBody(0, 20)))
  }

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSelectedDepartment(selectDepartment)
    setSelectedDesignation(selectDesignation)
    setMultiSearchInput(emptyString)
    dispatch(reduxServices.KRA.actions.clearKRAList())
    dispatch(reduxServices.KRA.actions.clearKRAQuery())
  }

  return (
    <CForm className="mb-4">
      <CContainer className="mt-4 ms-0 ps-0">
        <CRow className="align-items-center">
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel data-testid="dept-label">Department:</CFormLabel>
          </CCol>
          <CCol sm={3}>
            <CFormSelect
              size="sm"
              value={selectedDepartment}
              data-testid="dept-sel"
              onChange={departmentChangeHandler}
            >
              <option data-testid="dept-opt">{selectDepartment}</option>
              {empDepartmentsList?.map((item, index) => (
                <option
                  key={index}
                  value={item.departmentName}
                  data-testid="dept-opt"
                >
                  {item.departmentName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol sm={5}>
            <CRow className="align-items-center">
              <CCol sm={3} className="text-end">
                <CFormLabel data-testid="desig-label">Designation:</CFormLabel>
              </CCol>
              <CCol sm={7}>
                <CFormSelect
                  size="sm"
                  data-testid="desig-sel"
                  value={selectedDesignation}
                  onChange={designationChangeHandler}
                >
                  <option data-testid="desig-opt" value={selectDesignation}>
                    {selectDesignation}
                  </option>
                  {designationList?.map((item, index) => (
                    <option
                      key={index}
                      value={item.name}
                      data-testid="desig-opt"
                    >
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
          </CCol>
          {userAccessToAddKRA?.createaccess && (
            <CCol sm={3} className="px-0 text-end">
              <CButton
                color="info"
                className="btn-ovh"
                data-testid="add-kra-screen-btn"
                onClick={addKRAButtonHandler}
              >
                +Add KRA
              </CButton>
            </CCol>
          )}
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
                data-testid="search-inp"
                value={multiSearchInput}
                onChange={searchContentChangeHandler}
              />
              <CButton
                data-testid="search-btn-id"
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
