/* eslint-disable sonarjs/cognitive-complexity */
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import ReactDatePicker from 'react-datepicker'
import Multiselect from 'multiselect-react-dropdown'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { CreateNewTicket } from '../../../types/Support/RaiseNewTicket/createNewTicketTypes'
import OToast from '../../../components/ReusableComponent/OToast'
import { deviceLocale } from '../../../utils/dateFormatUtils'
import { GetAllEmployeesNames } from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { dateFormat } from '../../../constant/DateFormat'

const CreateNewTicketFilterOptions = ({
  setToggle,
  userViewAccess,
}: {
  setToggle: (value: string) => void
  userViewAccess: boolean
  // eslint-disable-next-line sonarjs/cognitive-complexity
}): JSX.Element => {
  const initialCreateNewTicket = {} as CreateNewTicket
  const [createTicket, setCreateTicket] = useState(initialCreateNewTicket)
  const [trackerValue, setTrackerValue] = useState<string>()
  const [dateError, setDateError] = useState<boolean>(false)
  const [deptId, setDeptId] = useState<number>()
  const [categoryId, setCategoryId] = useState<number>()
  const [subCategoryIdValue, setSubCategoryIdValue] = useState<number>()
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [PriorityValue, setPriorityValue] = useState<string>('Normal')
  const [subjectValue, setSubjectValue] = useState<string>()
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [isCreateButtonEnabled, setIsCreateButtonEnabled] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | undefined>(undefined)
  const [addEmployeeName, setAddEmployeeName] = useState<
    GetAllEmployeesNames[]
  >([])
  const [selectMealDate, setSelectMealDate] = useState<string>()
  const dispatch = useAppDispatch()
  const trackerList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.trackerList,
  )
  const subCategoryList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.subCategoryList,
  )

  const departmentList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.departmentNameList,
  )

  const departmentCategoryList = useTypedSelector(
    reduxServices.ticketApprovals.selectors.departmentCategoryList,
  )

  useEffect(() => {
    dispatch(reduxServices.ticketApprovals.getDepartmentNameList())
    dispatch(reduxServices.ticketApprovals.getTrackerList())
    dispatch(
      reduxServices.ticketApprovals.getDepartmentCategoryList(Number(deptId)),
    )
  }, [dispatch])

  useEffect(() => {
    if (deptId) {
      dispatch(reduxServices.ticketApprovals.getDepartmentCategoryList(deptId))
    }
    if (categoryId) {
      dispatch(reduxServices.ticketApprovals.getSubCategoryList(categoryId))
    }
  }, [deptId, categoryId])
  const commonFormatDate = 'l'

  const handleDescription = (description: string) => {
    setCreateTicket((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const allEmployeeProfiles = useTypedSelector(
    reduxServices.allocateEmployee.selectors.employeeNames,
  )

  const handleMultiSelect = (list: GetAllEmployeesNames[]) => {
    setAddEmployeeName(list)
  }
  useEffect(() => {
    dispatch(reduxServices.allocateEmployee.getAllEmployeesProfileData())
  }, [dispatch])

  const handleOnRemoveSelectedOption = (
    selectedList: GetAllEmployeesNames[],
  ) => {
    setAddEmployeeName(selectedList)
  }
  useEffect(() => {
    const newFromDate = new Date(
      moment(startDate?.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(endDate?.toString()).format(commonFormatDate),
    )
    if (startDate && endDate && newToDate.getTime() < newFromDate.getTime()) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [startDate, endDate])

  const clearBtnHandler = () => {
    setTrackerValue('')
    setAddEmployeeName([])
    setDeptId(0)
    setCategoryId(0)
    setSubCategoryIdValue(0)
    setStartDate('')
    setSelectMealDate('')
    setEndDate('')
    setSubjectValue('')
    setPriorityValue('Normal')
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
    setCreateTicket({
      description: '',
    })
  }

  useEffect(() => {
    if (
      trackerValue &&
      deptId &&
      categoryId &&
      subCategoryIdValue &&
      subjectValue
    ) {
      setIsCreateButtonEnabled(true)
    } else {
      setIsCreateButtonEnabled(false)
    }
  }, [trackerValue, deptId, categoryId, subCategoryIdValue, subjectValue])
  const whiteText = 'text-white'
  const dangerText = 'text-danger'

  const onChangeFileEventHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (!file) return
    setUploadFile(file[0])
  }
  useEffect(() => {
    if (categoryId === 0) {
      dispatch(reduxServices.ticketApprovals.actions.clearSubCategory())
    }
  }, [dispatch, categoryId])

  useEffect(() => {
    if (!deptId) {
      dispatch(reduxServices.ticketApprovals.actions.clearCategory())
      dispatch(reduxServices.ticketApprovals.actions.clearSubCategory())
      setSubCategoryIdValue(0)
    }
  }, [dispatch, deptId])

  useEffect(() => {
    if (!deptId) {
      setCategoryId(undefined)
      setSubCategoryIdValue(undefined)
    }
  }, [deptId])

  useEffect(() => {
    if (!categoryId) {
      setSubCategoryIdValue(undefined)
    }
  }, [categoryId])

  const onHandleStartDatePicker = (value: Date) => {
    setSelectMealDate(moment(value).format(dateFormat))
  }
  const disableAfterDate = new Date()
  disableAfterDate.setFullYear(disableAfterDate.getFullYear() + 1)

  const Result1 = departmentCategoryList?.filter(
    (item) => item?.categoryId === categoryId,
  )

  const handleApplyTicket = async () => {
    const payload =
      Result1[0]?.mealType === true
        ? {
            categoryId,
            id: deptId as number,
            description: createTicket?.description,
            startDate: selectMealDate,
            priority: PriorityValue,
            subCategoryId: subCategoryIdValue,
            subject: subjectValue as string,
            tracker: trackerValue,
            watcherIds: addEmployeeName?.map((currentItem) => currentItem.id),
          }
        : {
            id: deptId as number,
            description: createTicket?.description,
            accessEndDate: endDate
              ? new Date(endDate).toLocaleDateString(deviceLocale, {
                  year: 'numeric',
                  month: 'numeric',
                  day: '2-digit',
                })
              : '',
            accessStartDate: startDate
              ? new Date(startDate).toLocaleDateString(deviceLocale, {
                  year: 'numeric',
                  month: 'numeric',
                  day: '2-digit',
                })
              : '',
            categoryId,
            startDate: '',
            priority: PriorityValue,
            subCategoryId: subCategoryIdValue,
            subject: subjectValue as string,
            tracker: trackerValue,
            watcherIds: [] as number[],
          }
    const createNewTicketResultAction = await dispatch(
      reduxServices.raiseNewTicket.createNewTicket(payload),
    )
    if (uploadFile) {
      const formData = new FormData()
      formData.append('file', uploadFile, uploadFile.name)
      const ticketIdParams = createNewTicketResultAction.payload as {
        ticketId: number
      }
      const uploadPrepareObject = {
        ticketId: ticketIdParams.ticketId,
        file: formData,
      }
      dispatch(
        reduxServices.raiseNewTicket.uploadSupportTicketsDocuments(
          uploadPrepareObject,
        ),
      )
    }
    if (
      reduxServices.raiseNewTicket.createNewTicket.fulfilled.match(
        createNewTicketResultAction,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Ticket created successfully"
          />,
        ),
      )
      setTrackerValue('')
      setDeptId(0)
      setCategoryId(0)
      setSubCategoryIdValue(0)
      setStartDate('')
      setEndDate('')
      setSubjectValue('')
      setPriorityValue('Normal')
      setShowEditor(false)
      setSelectMealDate('')
      setAddEmployeeName([])
      setTimeout(() => {
        setShowEditor(true)
      }, 100)
      setCreateTicket({
        description: '',
      })
    }
  }

  return (
    <>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Tracker :
            <span className={trackerValue ? whiteText : dangerText}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="tracker"
              id="tracker"
              data-testid="trackerSelect"
              name="tracker"
              value={trackerValue}
              onChange={(e) => {
                setTrackerValue(e.target.value)
              }}
            >
              <option value="">Select Tracker</option>
              {trackerList?.map((trackerItem, trackerItemIndex) => (
                <option key={trackerItemIndex} value={trackerItem.id}>
                  {trackerItem.name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          {userViewAccess && (
            <CCol className="col-sm-3">
              <CButton
                color="info btn-ovh me-1"
                onClick={() => setToggle('addTrackerList')}
              >
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            </CCol>
          )}
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Department :
            <span className={deptId ? whiteText : dangerText}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="department"
              id="departmentName"
              data-testid="departmentName"
              name="departmentName"
              value={deptId}
              onChange={(e) => {
                setDeptId(Number(e.target.value))
                setSubCategoryIdValue(0)
              }}
            >
              <option value="">Select Department</option>
              {departmentList
                .slice()
                .sort((department1, department2) =>
                  department1.name.localeCompare(department2.name),
                )
                ?.map((dept, index) => (
                  <option key={index} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Category :
            <span className={categoryId ? whiteText : dangerText}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="category"
              id="categoryName"
              data-testid="categoryNameSelect"
              name="categoryName"
              value={categoryId}
              onChange={(e) => {
                setCategoryId(Number(e.target.value))
              }}
            >
              <option value="">Select Category</option>
              {departmentCategoryList
                .slice()
                .sort((category1, category2) =>
                  category1.categoryName.localeCompare(category2.categoryName),
                )
                ?.map((category, categoryIndex) => (
                  <option key={categoryIndex} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Sub-Category :
            <span className={subCategoryIdValue ? whiteText : dangerText}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="sub-category"
              id="subCategoryName"
              data-testid="subCategoryNameSelect"
              name="subCategoryName"
              value={subCategoryIdValue}
              onChange={(e) => {
                setSubCategoryIdValue(Number(e.target.value))
              }}
            >
              <option value="">Select Sub-Category</option>
              {subCategoryList
                .slice()
                .sort((subCategory1, subCategory2) =>
                  subCategory1.subCategoryName.localeCompare(
                    subCategory2.subCategoryName,
                  ),
                )
                ?.map((subCategory, subCategoryIndex) => (
                  <option
                    key={subCategoryIndex}
                    value={subCategory.subCategoryId}
                  >
                    {subCategory.subCategoryName}
                  </option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        {Result1[0]?.mealType === true ? (
          ''
        ) : (
          <>
            <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
              <CFormLabel className="col-sm-2 col-form-label text-end">
                Start Date :
              </CFormLabel>
              <CCol sm={3}>
                <ReactDatePicker
                  id="fromDate"
                  data-testid="dateOptionSelect"
                  className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                  showMonthDropdown
                  showYearDropdown
                  minDate={new Date()}
                  dropdownMode="select"
                  dateFormat="dd/mm/yy"
                  autoComplete="off"
                  placeholderText="dd/mm/yy"
                  name="fromDate"
                  value={
                    startDate
                      ? new Date(startDate).toLocaleDateString(deviceLocale, {
                          year: 'numeric',
                          month: 'numeric',
                          day: '2-digit',
                        })
                      : ''
                  }
                  onChange={(date: Date) =>
                    setStartDate(moment(date).format(commonFormatDate))
                  }
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
              <CFormLabel className="col-sm-2 col-form-label text-end">
                End Date :
              </CFormLabel>
              <CCol sm={3}>
                <ReactDatePicker
                  id="toDate"
                  data-testid="dateOptionSelect"
                  className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                  showMonthDropdown
                  showYearDropdown
                  minDate={new Date()}
                  dropdownMode="select"
                  autoComplete="off"
                  dateFormat="dd/mm/yy"
                  placeholderText="dd/mm/yy"
                  name="toDate"
                  value={
                    endDate
                      ? new Date(endDate).toLocaleDateString(deviceLocale, {
                          year: 'numeric',
                          month: 'numeric',
                          day: '2-digit',
                        })
                      : ''
                  }
                  onChange={(date: Date) =>
                    setEndDate(moment(date).format(commonFormatDate))
                  }
                />
                {dateError && (
                  <CCol>
                    <span className="text-danger" data-testid="errorMessage">
                      Access end date should be greater than access start date
                    </span>
                  </CCol>
                )}
              </CCol>
            </CRow>
          </>
        )}
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Subject :
            <span
              className={
                subjectValue?.replace(/^\s*/, '') ? whiteText : dangerText
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={9}>
            <CFormInput
              type="text"
              data-testid="selectSubject"
              id="subjectValue"
              name="subjectValue"
              value={subjectValue}
              onChange={(e) => {
                setSubjectValue(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            className="col-sm-2 col-form-label text-end"
            data-testid="ckEditor-component"
          >
            Description :
          </CFormLabel>
          {showEditor ? (
            <CCol sm={8}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={createTicket?.description}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleDescription(editor.getData().trim())
                }}
              />
            </CCol>
          ) : (
            ''
          )}
        </CRow>
        {Result1[0]?.mealType === true ? (
          <CRow className="mt-3">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Date :
              <span className={selectMealDate ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <ReactDatePicker
                id="selectMealDate"
                className="form-control form-control-sm sh-date-picker"
                showMonthDropdown
                showYearDropdown
                autoComplete="off"
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="dd/mm/yyyy"
                name="selectMealDate"
                value={selectMealDate}
                minDate={new Date()}
                maxDate={disableAfterDate}
                onChange={(date: Date) => onHandleStartDatePicker(date)}
              />
            </CCol>
          </CRow>
        ) : (
          ''
        )}
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Priority :
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="category"
              id="subCategoryName"
              data-testid="priority"
              name="priority"
              value={PriorityValue}
              onChange={(e) => {
                setPriorityValue(e.target.value)
              }}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
              <option value="Immediate">Immediate</option>
            </CFormSelect>
          </CCol>
        </CRow>
        {Result1[0]?.mealType === true ? (
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Add Members:
            </CFormLabel>
            <CCol sm={3}>
              <Multiselect
                className="ovh-multiselect"
                data-testid="employee-option"
                options={allEmployeeProfiles?.map((employee) => employee) || []}
                displayValue="fullName"
                placeholder={addEmployeeName?.length ? '' : 'Employees Name'}
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
        ) : (
          ''
        )}
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Files :
          </CFormLabel>
          <CCol sm={3}>
            <input
              className="sh-updateTicket-file"
              type="file"
              data-testid="file-upload"
              id="fileUpload"
              onChange={(element: React.SyntheticEvent) =>
                onChangeFileEventHandler(
                  element.currentTarget as HTMLInputElement,
                )
              }
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 2 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                data-testid="create-btn"
                color="success"
                onClick={handleApplyTicket}
                disabled={!isCreateButtonEnabled || dateError}
              >
                Create
              </CButton>
              <CButton
                color="warning "
                data-testid="clear-btn"
                className="btn-ovh"
                onClick={clearBtnHandler}
              >
                Clear
              </CButton>
            </>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default CreateNewTicketFilterOptions
