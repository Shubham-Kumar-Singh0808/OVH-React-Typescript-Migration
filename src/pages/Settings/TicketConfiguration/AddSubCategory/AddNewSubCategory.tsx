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
import { TextDanger } from '../../../../constant/ClassName'

const AddNewSubCategory = (): JSX.Element => {
  const initialSubCategoryDetails = {} as AddSubCategoryDetails
  const [addNewSubCategory, setAddNewSubCategory] = useState({
    ...initialSubCategoryDetails,
    workFlow: false,
  })
  const [selectDepartment, setSelectDepartment] = useState<number | string>('')
  const [selectCategory, setSelectCategory] = useState<number | string>()
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [estimatedHours, setEstimatedHours] = useState('')
  const [estimatedMins, setEstimatedMins] = useState('')
  const [subCategoryLevel, setSubCategoryLevel] = useState<string | number>(1)
  const [isSubCategoryNameExist, setIsSubCategoryNameExist] = useState('')
  const dispatch = useAppDispatch()
  const subCategoryList = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.subCategoryList,
  )
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
      addNewSubCategory.subCategoryName &&
      !isSubCategoryNameExist
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [selectDepartment, selectCategory, addNewSubCategory])

  const validateSubCategoryName = (name: string) => {
    return subCategoryList?.list?.find((subCategoryItem) => {
      return (
        subCategoryItem.subCategoryName.trim().toLowerCase() ===
        name.trim().toLowerCase()
      )
    })
  }

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
    } else {
      setAddNewSubCategory((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
    if (validateSubCategoryName(value)) {
      setIsSubCategoryNameExist(value)
    } else {
      setIsSubCategoryNameExist('')
    }
  }

  const handleLevelOfHierarchyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSubCategoryLevel(e.target.value.replace(estimatedTimeRegexReplace, ''))
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
    setIsSubCategoryNameExist('')
    setIsChecked(false)
  }

  useEffect(() => {
    if (addNewSubCategory.workFlow === true) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
  }, [addNewSubCategory.workFlow])

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
      levelOfHierarchy: subCategoryLevel,
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
                  getDepartments
                    ?.slice()
                    .sort((department1, department2) =>
                      department1.name.localeCompare(department2.name),
                    )
                    ?.map((department) => (
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
                  getCategories
                    ?.slice()
                    .sort((catg1, catg2) =>
                      catg1.categoryName.localeCompare(catg2.categoryName),
                    )
                    ?.map((category) => (
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
            <CCol sm={3} className="mt-2 px-0">
              {isSubCategoryNameExist ? (
                <strong className={TextDanger} data-testid="categoryName-exist">
                  Sub-Category Name Already Exist
                </strong>
              ) : (
                <></>
              )}
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
                onChange={() => {
                  setIsChecked(!isChecked)
                  setSubCategoryLevel(1)
                }}
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
                    onChange={handleLevelOfHierarchyChange}
                    value={subCategoryLevel}
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
