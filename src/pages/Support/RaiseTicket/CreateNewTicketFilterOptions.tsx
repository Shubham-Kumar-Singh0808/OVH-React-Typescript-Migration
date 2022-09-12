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
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { CreateNewTicket } from '../../../types/Support/RaiseNewTicket/createNewTicketTypes'
import OToast from '../../../components/ReusableComponent/OToast'

const CreateNewTicketFilterOptions = (): JSX.Element => {
  const initialCreateNewTicket = {} as CreateNewTicket
  const [createTicket, setCreateTicket] = useState(initialCreateNewTicket)
  const [trackerValue, setTrackerValue] = useState<string>()
  const [deptId, setDeptId] = useState<number>()
  const [categoryId, setCategoryId] = useState<number>()
  const [subCategoryIdValue, setSubCategoryIdValue] = useState<number>()
  const [fromDate, setFromDate] = useState<string>()
  const [toDate, setToDate] = useState<string>()
  const [PriorityValue, setPriorityValue] = useState<string>('Normal')
  const [subjectValue, setSubjectValue] = useState<string>()
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [isCreateButtonEnabled, setIsCreateButtonEnabled] = useState(false)
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
  }, [dispatch])
  useEffect(() => {
    if (deptId) {
      dispatch(reduxServices.ticketApprovals.getDepartmentCategoryList(deptId))
      setSubCategoryIdValue(0)
    }
    if (categoryId) {
      dispatch(reduxServices.ticketApprovals.getSubCategoryList(categoryId))
    }
  }, [deptId, categoryId])
  const commonFormatDate = 'l'
  const deviceLocale: string =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language

  const formLabelProps = {
    htmlFor: 'inputCreateTicket',
    className: 'col-form-label createticket-label',
  }
  const handleDescription = (description: string) => {
    setCreateTicket((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const handleApplyTicket = async () => {
    const createNewTicketResultAction = await dispatch(
      reduxServices.raiseNewTicket.createNewTicket({
        id: deptId as number,
        description: createTicket?.description,
        accessEndDate: toDate
          ? new Date(toDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
        accessStartDate: fromDate
          ? new Date(fromDate).toLocaleDateString(deviceLocale, {
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
        watcherIds: [],
      }),
    )
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
      setFromDate('')
      setToDate('')
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
  }

  const clearBtnHandler = () => {
    setTrackerValue('')
    setDeptId(0)
    setCategoryId(0)
    setSubCategoryIdValue(0)
    setFromDate('')
    setToDate('')
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
  return (
    <>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Tracker:
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
          <CCol className="col-sm-3">
            <CButton color="info btn-ovh me-1">
              <i className="fa fa-plus me-1"></i>Add
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Department:
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
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Category:
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
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Sub-Category:
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
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Start Date:
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="fromDate"
              data-testid="leaveApprovalFromDate"
              className="form-control form-control-sm sh-date-picker sh-leave-form-control"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yy"
              name="fromDate"
              value={
                fromDate
                  ? new Date(fromDate).toLocaleDateString(deviceLocale, {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                    })
                  : ''
              }
              onChange={(date: Date) =>
                setFromDate(moment(date).format(commonFormatDate))
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            End Date::
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="toDate"
              data-testid="leaveApprovalFromDate"
              className="form-control form-control-sm sh-date-picker sh-leave-form-control"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yy"
              name="toDate"
              value={
                toDate
                  ? new Date(toDate).toLocaleDateString(deviceLocale, {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                    })
                  : ''
              }
              onChange={(date: Date) =>
                setToDate(moment(date).format(commonFormatDate))
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Subject:
            <span className={subjectValue ? whiteText : dangerText}>*</span>
          </CFormLabel>
          <CCol sm={9}>
            <CFormInput
              type="text"
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
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Description:
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
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Priority:
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
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Files:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              id="uploadedFile"
              className="form-control"
              type="file"
              name="file"
              accept="image/*,"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 2 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                color="success"
                onClick={handleApplyTicket}
                disabled={!isCreateButtonEnabled}
              >
                Create
              </CButton>
              <CButton
                color="warning "
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
