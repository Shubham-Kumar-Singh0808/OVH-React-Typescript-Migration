import {
  CFormLabel,
  CRow,
  CCol,
  CFormInput,
  CButton,
  CForm,
  CFormSelect,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Autocomplete from 'react-autocomplete'
import DatePicker from 'react-datepicker'
import Multiselect from 'multiselect-react-dropdown'
import { useHistory } from 'react-router-dom'
import OCard from '../../../components/ReusableComponent/OCard'
import {
  TextLabelProps,
  TextDanger,
  TextWhite,
} from '../../../constant/ClassName'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  GetAllEmployeesNames,
  GetAllProjects,
} from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'
import OToast from '../../../components/ReusableComponent/OToast'
import { showIsRequired } from '../../../utils/helper'
import { deviceLocale } from '../../../utils/dateFormatUtils'
import { dateFormat } from '../../../constant/DateFormat'

const AllocateEmployee = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  const formLabel = 'col-sm-3 col-form-label text-end'
  const commonFormatDate = 'L'
  const initialGetAllProjectNames = {} as GetAllProjects

  const [isBilLable, setIsBilLable] = useState('')
  const [isShowComment, setIsShowComment] = useState<boolean>(true)
  const [addEmployeeName, setAddEmployeeName] = useState<
    GetAllEmployeesNames[]
  >([])
  const [addComment, setAddComment] = useState<string>('')
  const [projectsAutoCompleteTarget, setProjectsAutoCompleteTarget] =
    useState<string>('')
  const [selectProject, setSelectProject] = useState<GetAllProjects>()
  const [allocationValue, setAllocationValue] = useState<number | string>()
  const [isDateError, setIsDateError] = useState<boolean>(false)
  const [isAllocateButtonEnabled, setIsAllocateButtonEnabled] = useState(false)
  const [errorMessageCount, setErrorMessageCount] = useState<number>(0)
  const [isEnable, setIsEnable] = useState(false)
  console.log(errorMessageCount)
  const [fromDate, setFromDate] = useState<string | Date>('')
  const [toDate, setToDate] = useState<string | Date>('')

  const allEmployeeProfiles = useTypedSelector(
    reduxServices.allocateEmployee.selectors.employeeNames,
  )

  const allProjectNames = useTypedSelector(
    reduxServices.allocateEmployee.selectors.allProjects,
  )

  useEffect(() => {
    dispatch(reduxServices.allocateEmployee.getAllEmployeesProfileData())
  }, [dispatch])

  useEffect(() => {
    if (projectsAutoCompleteTarget) {
      dispatch(
        reduxServices.allocateEmployee.getAllProjectSearchData(
          projectsAutoCompleteTarget,
        ),
      )
    }
  }, [projectsAutoCompleteTarget])

  const fromDateValue = fromDate
    ? new Date(fromDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : ''

  const toDateValue = toDate
    ? new Date(toDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : ''

  const handleText = (comments: string) => {
    setAddComment(comments)
  }

  const handleMultiSelect = (list: GetAllEmployeesNames[]) => {
    setAddEmployeeName(list)
  }

  const handleOnRemoveSelectedOption = (
    selectedList: GetAllEmployeesNames[],
  ) => {
    setAddEmployeeName(selectedList)
  }

  const autoCompleteOnChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProjectsAutoCompleteTarget(e.target.value)
    setSelectProject(undefined)
  }

  const onHandleSelectProjectName = (projectName: string) => {
    setProjectsAutoCompleteTarget(projectName)
    setIsEnable(true)
  }

  const onFocusOut = () => {
    const selectedProject = allProjectNames.find(
      (value) => value.projectName === projectsAutoCompleteTarget,
    )
    setSelectProject(selectedProject)
  }

  const allocateHandleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'allocation') {
      let targetValue = value.replace(/\D/g, '').replace(/^0+/, '')
      if (Number(targetValue) > 100) targetValue = '100'
      setAllocationValue(targetValue)
    }
  }

  useEffect(() => {
    const tempAllocationDate = new Date(
      moment(fromDateValue?.toString()).format(commonFormatDate),
    )
    const tempEndDate = new Date(
      moment(toDateValue?.toString()).format(commonFormatDate),
    )
    if (tempEndDate.getTime() < tempAllocationDate.getTime()) {
      setIsDateError(true)
    } else {
      setIsDateError(false)
    }
  }, [fromDateValue, toDateValue])

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(fromDateValue, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(toDateValue, dateFormat).format(newDateFormatForIsBefore)

    setIsDateError(moment(end).isBefore(start))
  }, [fromDateValue, toDateValue])

  useEffect(() => {
    if (
      addEmployeeName?.length > 0 &&
      selectProject?.projectName &&
      fromDate &&
      toDate &&
      isBilLable &&
      allocationValue &&
      isEnable
    ) {
      setIsAllocateButtonEnabled(true)
    } else {
      setIsAllocateButtonEnabled(false)
    }
  }, [
    addEmployeeName,
    selectProject,
    isBilLable,
    allocationValue,
    fromDate,
    toDate,
  ])

  const successToastMessage = (
    <OToast
      toastMessage="Employee Allocated successfully"
      toastColor="success"
    />
  )
  const failureToastMessage = (
    <OToast
      toastMessage="Add an employee within project date limits."
      toastColor="danger"
    />
  )

  const postAllocateEmployee = () => {
    const finalObject = {
      allocation: allocationValue,
      billable: isBilLable,
      comments: addComment,
      employeeIds: addEmployeeName?.map((currentItem) =>
        currentItem.id.toString(),
      ),
      endDate: toDateValue,
      projectId: selectProject?.id as number,
      projectName: selectProject?.projectName as string,
      startDate: fromDateValue,
    }
    dispatch(reduxServices.allocateEmployee.AddNewAllocate(finalObject))

    dispatch(reduxServices.app.actions.addToast(successToastMessage))
    history.push('/projectreport')
  }
  const allocateButtonHandler = () => {
    const tempAllocationDate = new Date(
      moment(fromDate).format(commonFormatDate),
    )
    const startDateParts = selectProject?.startdate
      ? selectProject.startdate.split('/')
      : ''
    const tempProjectStartDate = new Date(
      Number(startDateParts[2]),
      Number(startDateParts[1]) - 1,
      Number(startDateParts[0]),
    )

    const tempEndDate = new Date(moment(toDate).format(commonFormatDate))
    const endDateParts = selectProject?.enddate
      ? selectProject.enddate.split('/')
      : ''
    const tempProjectEndDate = new Date(
      Number(endDateParts[2]),
      Number(endDateParts[1]) - 1,
      Number(endDateParts[0]),
    )
    console.log(tempAllocationDate + 'tempAllocationDate')
    console.log(tempEndDate + 'tempEndDate')
    console.log(tempProjectStartDate + 'tempProjectStartDate')
    console.log(tempProjectEndDate + 'tempProjectEndDate')

    if (
      tempAllocationDate <= tempEndDate &&
      tempAllocationDate >= tempProjectStartDate &&
      tempAllocationDate <= tempProjectEndDate &&
      tempEndDate <= tempProjectEndDate &&
      tempEndDate >= tempProjectStartDate
    ) {
      postAllocateEmployee()
    } else {
      setErrorMessageCount((errorCount) => errorCount + 1)
      dispatch(reduxServices.app.actions.addToast(failureToastMessage))
    }
  }

  const clearInputs = () => {
    setIsBilLable('')
    setAllocationValue('')
    setProjectsAutoCompleteTarget('')
    setSelectProject(initialGetAllProjectNames)
    setAddEmployeeName([])
    setToDate('')
    setFromDate('')
    setAddComment('')
    setIsShowComment(false)
    setIsEnable(false)
    setTimeout(() => {
      setIsShowComment(true)
    }, 0)
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Allocation"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CForm>
          <CRow className="mt-3 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Employee:
              <span
                className={addEmployeeName?.length ? TextWhite : TextDanger}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <Multiselect
                className="ovh-multiselect"
                data-testid="employee-option"
                options={allEmployeeProfiles?.map((employee) => employee) || []}
                displayValue="fullName"
                placeholder={addEmployeeName?.length ? '' : 'Employee Name'}
                selectedValues={addEmployeeName}
                onSelect={(list: GetAllEmployeesNames[]) =>
                  handleMultiSelect(list)
                }
                onRemove={(selectedList: GetAllEmployeesNames[]) =>
                  handleOnRemoveSelectedOption(selectedList)
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CFormLabel {...formLabelProps} className={formLabel}>
              Project Name:
              <span className={isEnable ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <Autocomplete
                inputProps={{
                  className: 'form-control form-control-sm',
                  placeholder: 'Project Name',
                  onBlur: onFocusOut,
                }}
                getItemValue={(item) => item.projectName}
                items={allProjectNames ? allProjectNames : []}
                wrapperStyle={{ position: 'relative' }}
                renderMenu={(children) => (
                  <div
                    className={
                      projectsAutoCompleteTarget &&
                      projectsAutoCompleteTarget.length > 0
                        ? 'autocomplete-dropdown-wrap'
                        : 'autocomplete-dropdown-wrap hide'
                    }
                  >
                    {children}
                  </div>
                )}
                renderItem={(item, isHighlighted) => (
                  <div
                    data-testid="project-option"
                    className={
                      isHighlighted
                        ? 'autocomplete-dropdown-item active'
                        : 'autocomplete-dropdown-item '
                    }
                    key={item.id}
                  >
                    {item.projectName}
                  </div>
                )}
                value={projectsAutoCompleteTarget}
                shouldItemRender={(item, itemValue) =>
                  item?.projectName
                    ?.toLowerCase()
                    .indexOf(itemValue.toLowerCase()) > -1
                }
                onChange={(e) => autoCompleteOnChangeHandler(e)}
                onSelect={(selectedVal) =>
                  onHandleSelectProjectName(selectedVal)
                }
              />
            </CCol>
          </CRow>
          {selectProject?.startdate && (
            <>
              <CRow className="mt-3 ">
                <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
                  Project Start Date:
                </CFormLabel>
                <CCol sm={6}>
                  <CFormLabel
                    className="col-sm-15 col-form-label text-end"
                    data-testid="projectStartDate"
                  >
                    {selectProject?.startdate}
                  </CFormLabel>
                </CCol>
              </CRow>
              <CRow className="mt-3 ">
                <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
                  Project End Date:
                </CFormLabel>
                <CCol sm={6}>
                  <CFormLabel
                    className="col-sm-15 col-form-label text-end"
                    data-testid="projectEndDate"
                  >
                    {selectProject?.enddate}
                  </CFormLabel>
                </CCol>
              </CRow>
            </>
          )}
          <CRow className="mt-3 ">
            <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
              Billable:
              <span className={isBilLable ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                id="billable"
                data-testid="form-select1"
                size="sm"
                aria-label="billable"
                name="billable"
                value={isBilLable}
                onChange={(e) => {
                  setIsBilLable(e.target.value)
                }}
              >
                <option value={''}>Select </option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...dynamicFormLabelProps('allocation', formLabel)}>
              Allocation:
              <span className={allocationValue ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="allocation"
                data-testid="allocation-value"
                name="allocation"
                autoComplete="off"
                max={100}
                value={allocationValue}
                placeholder="100"
                onChange={allocateHandleInputChange}
                maxLength={3}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                Allocation Date:
                <span className={showIsRequired(fromDate as string)}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <DatePicker
                className="form-control form-control-sm sh-date-picker"
                data-testid="date-picker"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/mm/yyyy"
                name="fromDate"
                id="fromDate"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={fromDateValue}
                onChange={(date: Date) => {
                  setFromDate(date)
                }}
                selected={fromDate as Date}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                End Date:
                <span className={showIsRequired(toDate as string)}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <DatePicker
                className="form-control form-control-sm sh-date-picker"
                data-testid="date-picker"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/mm/yyyy"
                name="toDate"
                id="toDate"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={toDateValue}
                onChange={(date: Date) => {
                  setToDate(date)
                }}
                selected={toDate as Date}
              />
            </CCol>
            {isDateError && (
              <CCol sm={6}>
                <span className="text-danger">
                  <b>End date should be greater than Allocation date</b>
                </span>
              </CCol>
            )}
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className={TextLabelProps}>Comments: </CFormLabel>
            {isShowComment ? (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={addComment}
                  data-testid="allocateEmployeeComment"
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    handleText(editor.getData().trim())
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
                className="btn-ovh me-1 text-white"
                color="success"
                onClick={allocateButtonHandler}
                disabled={!isAllocateButtonEnabled}
              >
                Allocate
              </CButton>
              <CButton
                data-testid="clear-btn"
                color="warning"
                className="btn-ovh text-white"
                onClick={clearInputs}
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
export default AllocateEmployee
