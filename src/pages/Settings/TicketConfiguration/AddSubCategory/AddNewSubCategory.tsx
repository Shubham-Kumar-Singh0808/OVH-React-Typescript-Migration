import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CButton,
  CFormSelect,
  CForm,
  CFormLabel,
  CFormInput,
  CFormCheck,
} from '@coreui/react-pro'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { AddSubCategoryDetails } from '../../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'
import { showIsRequired } from '../../../../utils/helper'
import OToast from '../../../../components/ReusableComponent/OToast'

const AddNewSubCategory = (): JSX.Element => {
  const initialSubCategoryDetails = {} as AddSubCategoryDetails
  const [addNewSubCategory, setAddNewSubCategory] = useState({
    ...initialSubCategoryDetails,
    workFlow: false,
  })
  const [selectDepartment, setSelectDepartment] = useState<number | string>()
  const [selectCategory, setSelectCategory] = useState<number | string>()
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [estimatedHours, setEstimatedHours] = useState('')
  const [estimatedMins, setEstimatedMins] = useState('')
  const dispatch = useAppDispatch()

  const backButtonHandler = () => {
    dispatch(reduxServices.ticketConfiguration.actions.setToggle(''))
  }
  const getDepartments = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.departments,
  )
  const getCategories = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.categories,
  )
  useEffect(() => {
    if (!getDepartments)
      dispatch(
        reduxServices.ticketConfiguration.getTicketConfigurationDepartments(),
      )
    if (selectDepartment) {
      dispatch(
        reduxServices.ticketConfiguration.getTicketConfigurationCategories(
          selectDepartment as number,
        ),
      )
    }
    if (selectCategory) {
      dispatch(
        reduxServices.ticketConfiguration.getTicketConfigurationSubCategories(
          selectCategory as number,
        ),
      )
    }
  }, [dispatch, selectDepartment, selectCategory, getDepartments])

  useEffect(() => {
    if (
      selectDepartment &&
      selectCategory &&
      addNewSubCategory.subCategoryName
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [selectDepartment, selectCategory, addNewSubCategory])

  const estimatedTimeRegexReplace = /\D/g
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'subCategoryName') {
      const subCategoryName = value
        .replace(/^\s*/, '')
        .replace(/[^a-z\s]/gi, '')
      setAddNewSubCategory((prevState) => {
        return { ...prevState, ...{ [name]: subCategoryName } }
      })
    } else if (name === 'levelOfHierarchy') {
      const level = value.replace(estimatedTimeRegexReplace, '')
      setAddNewSubCategory((prevState) => {
        return { ...prevState, ...{ [name]: level } }
      })
    } else {
      setAddNewSubCategory((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }
  const handleEstimatedTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'estimatedTimeHours') {
      const hours = value.replace(estimatedTimeRegexReplace, '')
      setEstimatedHours(hours)
    } else if (name === 'estimatedTimeMins') {
      const mins = value.replace(estimatedTimeRegexReplace, '')
      setEstimatedMins(mins)
    }
  }
  const handleClearInputs = () => {
    setSelectDepartment('')
    setSelectCategory('')
    setAddNewSubCategory({
      subCategoryName: '',
      levelOfHierarchy: '',
      workFlow: false,
    })
    setEstimatedHours('')
    setEstimatedMins('')
    setIsChecked(false)
  }
  const successToastMessage = (
    <OToast
      toastMessage="Sub-Category added successfully"
      toastColor="success"
    />
  )
  const handleAddNewSubCategory = async () => {
    const prepareObject = {
      ...addNewSubCategory,
      departmentId: selectDepartment as string,
      categoryId: selectCategory as string,
      estimatedTime: `${estimatedHours || '0'}.${estimatedMins || '00'}`,
      workFlow: isChecked,
    }
    const addSubCategoryResultAction = await dispatch(
      reduxServices.ticketConfiguration.addSubCategory(prepareObject),
    )
    if (
      reduxServices.ticketConfiguration.addSubCategory.fulfilled.match(
        addSubCategoryResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
      backButtonHandler()
    }
  }

  const addCategoryButtonHandler = () => {
    dispatch(reduxServices.ticketConfiguration.actions.setToggle('addCategory'))
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Sub-Category"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
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
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Department Name :
              <span className={showIsRequired(selectDepartment as string)}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="deptName"
                name="deptName"
                id="deptName"
                data-testid="department-name"
                onChange={(e) => {
                  setSelectDepartment(e.target.value)
                  setSelectCategory('')
                }}
                value={selectDepartment}
              >
                <option value="">Select Department</option>
                {getDepartments &&
                  getDepartments?.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Category Name :
              <span className={showIsRequired(selectCategory as string)}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="category"
                name="category"
                id="category"
                data-testid="category-name"
                defaultValue={selectCategory}
                disabled={!selectDepartment}
                onChange={(e) => setSelectCategory(e.target.value)}
                value={selectCategory}
              >
                <option value="">Select Category</option>
                {getCategories &&
                  getCategories?.map((category) => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryName}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
            <CCol className="col-sm-3">
              <CButton
                color="info"
                className="btn-ovh"
                data-testid="addCategory-btn"
                onClick={addCategoryButtonHandler}
              >
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Sub-Category Name :
              <span
                className={showIsRequired(
                  addNewSubCategory.subCategoryName as string,
                )}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                id="subCategory"
                size="sm"
                type="text"
                name="subCategoryName"
                data-testid="sub-category-input"
                placeholder="Enter Sub-Category Name"
                maxLength={50}
                autoComplete="off"
                value={addNewSubCategory.subCategoryName}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
              Estimated Time :
            </CFormLabel>
            <CCol sm={1}>
              <CFormInput
                id="estimatedTimeHours"
                size="sm"
                type="text"
                name="estimatedTimeHours"
                data-testid="tc-estimatedTimeHours"
                placeholder="Hours"
                maxLength={3}
                autoComplete="off"
                value={estimatedHours}
                onChange={handleEstimatedTime}
              />
            </CCol>
            <CCol sm={1}>
              <CFormInput
                id="estimatedTimeMins"
                size="sm"
                type="text"
                name="estimatedTimeMins"
                data-testid="tc-estimatedTimeMins"
                placeholder="Min"
                autoComplete="off"
                maxLength={2}
                value={estimatedMins}
                onChange={handleEstimatedTime}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
              Work Flow :
            </CFormLabel>
            <CCol sm={1} className="mt-2">
              <CFormCheck
                name="workFlow"
                data-testid="ch-workFlow"
                onChange={() => setIsChecked(!isChecked)}
                checked={isChecked}
              />
            </CCol>
            {isChecked && (
              <>
                <CFormLabel className="col-sm-1 col-form-label text-end pe-18">
                  Level :
                </CFormLabel>
                <CCol sm={1}>
                  <CFormInput
                    id="level"
                    size="sm"
                    type="text"
                    name="levelOfHierarchy"
                    data-testid="tc-levelOfHierarchy"
                    autoComplete="off"
                    defaultValue={1}
                    maxLength={2}
                    onChange={handleInputChange}
                    value={addNewSubCategory.levelOfHierarchy}
                  />
                </CCol>
              </>
            )}
          </CRow>
          <CRow className="mt-2 mb-2">
            <CCol className="col-md-3 offset-md-3">
              <CButton
                color="success"
                className="btn-ovh me-1"
                data-testid="save-subCategory-btn"
                size="sm"
                disabled={!isButtonEnabled}
                onClick={handleAddNewSubCategory}
              >
                Add
              </CButton>
              <CButton
                color="warning "
                className="btn-ovh"
                data-testid="clear-subCategory-btn"
                onClick={handleClearInputs}
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
export default AddNewSubCategory
