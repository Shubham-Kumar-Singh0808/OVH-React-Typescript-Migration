import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormCheck,
} from '@coreui/react-pro'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { TicketConfigurationList } from '../../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'
import { showIsRequired } from '../../../../utils/helper'
import OToast from '../../../../components/ReusableComponent/OToast'
import { TextDanger } from '../../../../constant/ClassName'

const EditSubCategory = ({
  editSubCategory,
}: {
  editSubCategory: TicketConfigurationList
}): JSX.Element => {
  const [editSubCategoryCopy, setEditSubCategoryCopy] =
    useState<TicketConfigurationList>({
      subCategoryId: 0,
      subCategoryName: '',
      estimatedTime: '',
      workFlow: false,
      categoryId: 0,
      categoryName: '',
      departmentName: '',
      departmentId: 0,
      levelOfHierarchy: 0,
    })
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] =
    useState<boolean>(false)
  const [isWorkFlowChecked, setIsWorkFlowChecked] = useState<boolean>(false)
  const [estimatedTimeHours, setEstimateTimeHours] = useState('')
  const [estimatedTimeMinutes, setEstimatedTimeMinutes] = useState('')
  const [subCategoryNameExist, setSubCategoryNameExist] = useState('')
  const [level, setLevel] = useState<string | number>(
    editSubCategory.levelOfHierarchy,
  )
  const dispatch = useAppDispatch()
  const subCategoryList = useTypedSelector(
    reduxServices.ticketConfiguration.selectors.subCategoryList,
  )
  const backButtonHandler = () => {
    dispatch(reduxServices.ticketConfiguration.actions.setToggle(''))
  }
  const validateSubCategoryName = (name: string) => {
    return subCategoryList.list?.find((subCategory) => {
      return (
        subCategory.subCategoryName.trim().toLowerCase() ===
        name.trim().toLowerCase()
      )
    })
  }
  const estimatedTimeRegexReplace = /\D/g
  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'subCategoryName') {
      const subCategoryName = value
        .replace(/^\s*/, '')
        .replace(/[^a-z\s]/gi, '')
      setEditSubCategoryCopy((prevState) => {
        return { ...prevState, ...{ [name]: subCategoryName } }
      })
    } else {
      setEditSubCategoryCopy((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
    if (validateSubCategoryName(value)) {
      setSubCategoryNameExist(value)
    } else {
      setSubCategoryNameExist('')
    }
  }
  const handleOnChangeEstimatedTime = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'estimatedTimeHours') {
      const timeHours = value.replace(estimatedTimeRegexReplace, '')
      setEstimateTimeHours(timeHours)
    } else if (name === 'estimatedTimeMins') {
      const timeMins = value.replace(estimatedTimeRegexReplace, '')
      setEstimatedTimeMinutes(timeMins)
    }
  }

  const handleLevelOfHierarchyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLevel(e.target.value.replace(estimatedTimeRegexReplace, ''))
  }

  const updateToastMessage = (
    <OToast
      toastMessage="Sub-Category updated successfully"
      toastColor="success"
    />
  )

  useEffect(() => {
    if (editSubCategory) {
      setEditSubCategoryCopy({
        subCategoryId: editSubCategory.subCategoryId,
        subCategoryName: editSubCategory.subCategoryName,
        estimatedTime: editSubCategory.estimatedTime,
        workFlow: editSubCategory.workFlow,
        categoryId: editSubCategory.categoryId,
        categoryName: editSubCategory.categoryName,
        departmentName: editSubCategory.departmentName,
        departmentId: editSubCategory.departmentId,
        levelOfHierarchy: level,
      })
      setEstimateTimeHours(editSubCategory.estimatedTime.split('.')[0])
      setEstimatedTimeMinutes(editSubCategory.estimatedTime.split('.')[1])
    }
  }, [editSubCategory])

  useEffect(() => {
    if (editSubCategoryCopy.workFlow === true) {
      setIsWorkFlowChecked(true)
    } else {
      setIsWorkFlowChecked(false)
    }
  }, [editSubCategoryCopy.workFlow])

  useEffect(() => {
    if (editSubCategoryCopy.subCategoryName && !subCategoryNameExist) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [editSubCategoryCopy.subCategoryName])

  const updateSubCategory = async () => {
    const prepareObject = {
      ...editSubCategoryCopy,
      estimatedTime: `${estimatedTimeHours || '0'}.${
        estimatedTimeMinutes || '00'
      }`,
      workFlow: isWorkFlowChecked,
      levelOfHierarchy: level,
    }
    const updateSubCategoryResultAction = await dispatch(
      reduxServices.ticketConfiguration.updateSubCategory(prepareObject),
    )

    if (
      reduxServices.ticketConfiguration.updateSubCategory.fulfilled.match(
        updateSubCategoryResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(updateToastMessage))
      backButtonHandler()
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Sub-Category"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="toggle-back-button"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
              Department Name :
            </CFormLabel>
            <CCol sm={3} className="mt-2" data-testid="esc-departmentName">
              {editSubCategoryCopy.departmentName}
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end pe-18">
              Category Name :
            </CFormLabel>
            <CCol sm={3} className="mt-2" data-testid="esc-categoryName">
              {editSubCategoryCopy.categoryName}
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Sub-Category Name :
              <span
                className={showIsRequired(editSubCategoryCopy.subCategoryName)}
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
                data-testid="esc-subCategoryName"
                placeholder="Enter Sub-Category Name"
                maxLength={50}
                autoComplete="off"
                value={editSubCategoryCopy.subCategoryName}
                onChange={onChangeInputHandler}
              />
            </CCol>
            <CCol sm={3} className="mt-2">
              {subCategoryNameExist && (
                <p className={TextDanger} data-testid="categoryName-exist">
                  Sub-Category Name Already Exist
                </p>
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
                data-testid="esc-estimatedTimeHrs"
                placeholder="Hours"
                maxLength={3}
                autoComplete="off"
                value={estimatedTimeHours}
                onChange={handleOnChangeEstimatedTime}
              />
            </CCol>
            <CCol sm={1}>
              <CFormInput
                id="estimatedTimeMins"
                size="sm"
                type="text"
                name="estimatedTimeMins"
                data-testid="esc-estimatedTimeMts"
                placeholder="Min"
                autoComplete="off"
                maxLength={2}
                value={estimatedTimeMinutes}
                onChange={handleOnChangeEstimatedTime}
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
                data-testid="chk-workFlow"
                onChange={() => {
                  setIsWorkFlowChecked(!isWorkFlowChecked)
                  setLevel(1)
                }}
                checked={isWorkFlowChecked}
              />
            </CCol>
            {isWorkFlowChecked && (
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
                    data-testid="esc-levelOfHierarchy"
                    autoComplete="off"
                    defaultValue={1}
                    maxLength={2}
                    onChange={handleLevelOfHierarchyChange}
                    value={level}
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
                data-testid="update-subCategory-btn"
                size="sm"
                disabled={!isUpdateButtonEnabled}
                onClick={updateSubCategory}
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
export default EditSubCategory
