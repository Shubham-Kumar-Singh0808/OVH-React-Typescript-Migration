import {
  CRow,
  CCol,
  CFormLabel,
  CFormTextarea,
  CFormInput,
} from '@coreui/react-pro'
import React from 'react'
import DatePicker from 'react-datepicker'
import { ProjectRequestMilestoneDTO } from '../../../../types/ProjectManagement/ProjectCreationRequests/projectCreationRequestsTypes'

const ProjectMileStone = ({
  item,
  index,
  titleOnChange,
  commentsOnChange,
  effortOnChange,
  onChangeHandleFromDate,
  onChangeHandleToDate,
}: {
  item: ProjectRequestMilestoneDTO
  index: number
  titleOnChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
  onChangeHandleFromDate: (date: Date, index: number) => void
  onChangeHandleToDate: (date: Date, index: number) => void
  effortOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
  commentsOnChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => void
}): JSX.Element => {
  console.log(item.title)
  return (
    <CRow className="employeeAllocation-form">
      <CCol sm={2} md={1} className="text-end">
        <CFormLabel className="mt-2">Title</CFormLabel>
      </CCol>
      <CCol sm={2}>
        <CFormInput
          onChange={(e) => titleOnChange(e, index)}
          value={item.title}
          name="title"
          placeholder="Title"
        />
      </CCol>
      <CCol sm={2} md={1} className="text-end">
        <CFormLabel>Effort(Hrs)</CFormLabel>
      </CCol>
      <CCol sm={2}>
        <CFormInput
          onChange={(e) => effortOnChange(e, index)}
          value={item.effort}
          name="effort"
          id="effort"
          placeholder="Title"
        />
      </CCol>
      <CCol sm={2} md={1} className="text-end">
        <CFormLabel>From Date</CFormLabel>
      </CCol>
      <CCol sm={2}>
        <DatePicker
          id="editprojectenddate"
          className="form-control form-control-sm sh-date-picker"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText="dd/mm/yy"
          data-testid="end-date-picker"
          dateFormat="dd/mm/yy"
          name="editprojectenddate"
          value={item.fromDate}
          onChange={(date: Date) => onChangeHandleFromDate(date, index)}
        />
      </CCol>
      <CCol sm={2} md={1} className="text-end">
        <CFormLabel>End Date</CFormLabel>
      </CCol>
      <CCol sm={2}>
        <DatePicker
          id="editprojectenddate"
          className="form-control form-control-sm sh-date-picker"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          placeholderText="dd/mm/yy"
          data-testid="end-date-picker"
          dateFormat="dd/mm/yy"
          name="editprojectenddate"
          value={item.toDate}
          onChange={(date: Date) => onChangeHandleToDate(date, index)}
        />
      </CCol>
      <CCol sm={2} md={1} className="text-end">
        <CFormLabel>Billable</CFormLabel>
      </CCol>
      <CCol sm={2}>{item.billable}</CCol>
      <CCol sm={2} md={1} className="text-end">
        <CFormLabel>Percentage</CFormLabel>
      </CCol>
      <CCol sm={2}>{item.billable}</CCol>
      <CCol sm={2} md={1} className="text-end">
        <CFormLabel>Comments</CFormLabel>
      </CCol>
      <CCol sm={2}>
        <CFormTextarea
          aria-label="textarea"
          id="comments"
          name="comments"
          data-testid="text-area"
          value={item.comments}
          onChange={(e) => commentsOnChange(e, index)}
        ></CFormTextarea>
      </CCol>
    </CRow>
  )
}

export default ProjectMileStone
