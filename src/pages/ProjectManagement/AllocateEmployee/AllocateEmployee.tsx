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
import ReactDatePicker from 'react-datepicker'
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
  GetAllProjectNames,
} from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'
import OToast from '../../../components/ReusableComponent/OToast'

const AllocateEmployee = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const formLabel = 'col-sm-3 col-form-label text-end'
  const commonFormatDate = 'L'
  const deviceLocale: string =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language

  const initialGetAllProjectNames = {} as GetAllProjectNames

  const [isBilLable, setIsBilLable] = useState('')
  const [showComment, setShowComment] = useState<boolean>(true)
  const [addEmployeeName, setAddEmployeeName] = useState<
    GetAllEmployeesNames[]
  >([])
  const [addComment, setAddComment] = useState<string>('')
  const [projectsAutoCompleteTarget, setProjectsAutoCompleteTarget] =
    useState<string>('')
  const [selectProject, setSelectProject] = useState<GetAllProjectNames>()
  const [allocationValue, setAllocationValue] = useState<number | string>()
  const [allocationDate, setAllocationDate] = useState<string>()
  const [isEndDate, setIsEndDate] = useState<string>()
  const [dateError, setDateError] = useState<boolean>(false)
  const [isAllocateButtonEnabled, setIsAllocateButtonEnabled] = useState(false)
  const allEmployeeProfiles = useTypedSelector(
    reduxServices.allocateEmployee.selectors.employeeNames,
  )

  const allProjectNames = useTypedSelector(
    reduxServices.allocateEmployee.selectors.projectNames,
  )

  const handleText = (comments: string) => {
    setAddComment(comments)
  }

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

  const handleBillableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsBilLable(e.target.value)
    console.log(e.target.value)
  }

  const handleMultiSelect = (list: GetAllEmployeesNames[]) => {
    setAddEmployeeName(list)
  }

  const handleOnRemoveSelectedOption = (
    selectedList: GetAllEmployeesNames[],
    name: string,
  ) => {
    setAddEmployeeName((prevState) => {
      return { ...prevState, ...{ [name]: selectedList } }
    })
  }

  const onHandleSelectProjectName = (projectName: string) => {
    setProjectsAutoCompleteTarget(projectName)
    const selectedProject = allProjectNames.find(
      (value) => value.projectName === projectName,
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
      let targetValue = value.replace(/\D/g, '')
      if (Number(targetValue) > 100) targetValue = '100'
      setAllocationValue(targetValue)
    }
  }

  useEffect(() => {
    const tempAllocationDate = new Date(
      moment(allocationDate?.toString()).format(commonFormatDate),
    )
    const tempEndDate = new Date(
      moment(isEndDate?.toString()).format(commonFormatDate),
    )
    if (tempEndDate.getTime() < tempAllocationDate.getTime()) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [allocationDate, isEndDate])

  const successToastMessage = (
    <OToast
      toastMessage="Employee Allocated successfully"
      toastColor="success"
    />
  )
  const failureToastMessage = (
    <OToast
      toastMessage="Add an employee within project date limits."
      toastColor="success"
    />
  )
  const history = useHistory()
  const allocateButtonHandler = async () => {
    const finalObject = {
      allocation: allocationValue,
      billable: isBilLable,
      comments: addComment,
      employeeIds: addEmployeeName?.map((currentItem) =>
        currentItem.id.toString(),
      ),
      endDate: isEndDate,
      projectId: selectProject?.id as number,
      projectName: selectProject?.projectName as string,
      startDate: allocationDate,
    }
    const allocateEmployeeResultAction = await dispatch(
      reduxServices.allocateEmployee.AddNewAllocate(finalObject),
    )
    if (
      reduxServices.allocateEmployee.AddNewAllocate.fulfilled.match(
        allocateEmployeeResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
      history.push('/projectreport')
    }
  }
  const clearInputs = () => {
    setIsBilLable('')
    setAllocationValue('')
    setProjectsAutoCompleteTarget('')
    setSelectProject(initialGetAllProjectNames)
    setAddEmployeeName([])
    setIsEndDate('')
    setAllocationDate('')
    setAddComment('')
    setShowComment(false)
    setTimeout(() => {
      setShowComment(true)
    }, 0)
  }
  useEffect(() => {
    if (
      addEmployeeName?.length > 0 &&
      selectProject?.projectName &&
      allocationDate &&
      isEndDate &&
      isBilLable &&
      allocationValue
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
    allocationDate,
    isEndDate,
  ])
  console.log(
    addEmployeeName,
    selectProject,
    isBilLable,
    allocationValue,
    allocationDate,
    isEndDate,
  )
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Allocation"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Employee:
              <span className={addEmployeeName ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <Multiselect
                className="ovh-multiselect"
                options={allEmployeeProfiles?.map((employee) => employee) || []}
                displayValue="fullName"
                placeholder="Employee Name"
                selectedValues={addEmployeeName}
                onSelect={(list: GetAllEmployeesNames[]) =>
                  handleMultiSelect(list)
                }
                onRemove={(selectedList: GetAllEmployeesNames[]) =>
                  handleOnRemoveSelectedOption(selectedList, 'fullName')
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CFormLabel {...formLabelProps} className={formLabel}>
              Project Name:
              {/* <span
                className={selectProject ? TextWhite : TextDanger}
              >
                *
              </span> */}
              <span
                className={projectsAutoCompleteTarget ? TextWhite : TextDanger}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <Autocomplete
                inputProps={{
                  className: 'form-control form-control-sm',
                  placeholder: 'Project Name',
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
                onChange={(e) => setProjectsAutoCompleteTarget(e.target.value)}
                onSelect={(selectedVal) =>
                  onHandleSelectProjectName(selectedVal)
                }
              />
            </CCol>
          </CRow>
          {/* selectProject?.startdate &&*/}
          {projectsAutoCompleteTarget && (
            <>
              <CRow className="mt-3 ">
                <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
                  Project Start Date:
                </CFormLabel>
                <CCol sm={6}>
                  <CFormLabel className="col-sm-15 col-form-label text-end">
                    {selectProject?.startdate}
                  </CFormLabel>
                </CCol>
              </CRow>
              <CRow className="mt-3 ">
                <CFormLabel {...dynamicFormLabelProps('billable', formLabel)}>
                  Project End Date:
                </CFormLabel>
                <CCol sm={6}>
                  <CFormLabel className="col-sm-15 col-form-label text-end">
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
                onChange={handleBillableChange}
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
                name="allocation"
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
                <span className={allocationDate ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                id="allocation-date"
                data-testid="allocateEmployeeAllocationDate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yy"
                name="allocateEmployeeAllocationDate"
                value={
                  allocationDate
                    ? new Date(allocationDate).toLocaleDateString(
                        deviceLocale,
                        {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        },
                      )
                    : ''
                }
                onChange={(date: Date) =>
                  setAllocationDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                End Date:
                <span className={isEndDate ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                id="end-date:"
                data-testid="allocateEmployeeEndDate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="dd/mm/yy"
                name="allocateEmployeeEndDate"
                value={
                  isEndDate
                    ? new Date(isEndDate).toLocaleDateString(deviceLocale, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                    : ''
                }
                onChange={(date: Date) =>
                  setIsEndDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
          </CRow>
          {dateError && (
            <CRow className="mt-2">
              <CCol sm={{ span: 6, offset: 2 }}>
                <span className="text-danger">
                  <b>End date should be greater than Allocation date</b>
                </span>
              </CCol>
            </CRow>
          )}
          <CRow className="mt-4 mb-4">
            <CFormLabel className={TextLabelProps}>Comments: </CFormLabel>
            {showComment ? (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={addComment}
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
                // disabled={!isAllocateButtonEnabled}
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
