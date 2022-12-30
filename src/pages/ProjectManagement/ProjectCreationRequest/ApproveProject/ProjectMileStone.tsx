import {
  CFormTextarea,
  CFormInput,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableBody,
  CTableDataCell,
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
  const projectBillable = item.billable ? 'Yes' : 'No'
  return (
    <>
      <CTable striped responsive align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Effort(Hrs)</CTableHeaderCell>
            <CTableHeaderCell scope="col">From Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Billable</CTableHeaderCell>
            <CTableHeaderCell scope="col">Percentage</CTableHeaderCell>
            <CTableHeaderCell scope="col">Comments</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableDataCell scope="row">
            <CFormInput
              onChange={(e) => titleOnChange(e, index)}
              value={item.title}
              name="title"
              placeholder="Title"
              data-testid="title-test"
            />
          </CTableDataCell>
          <CTableDataCell scope="row">
            <CFormInput
              onChange={(e) => effortOnChange(e, index)}
              value={item.effort}
              name="effort"
              id="effort"
              placeholder="effort"
              data-testid="effort-test"
            />
          </CTableDataCell>
          <CTableDataCell scope="row">
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
          </CTableDataCell>
          <CTableDataCell scope="row">
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
          </CTableDataCell>
          <CTableDataCell scope="row">{projectBillable}</CTableDataCell>
          <CTableDataCell scope="row">
            {item.milestonePercentage}
          </CTableDataCell>
          <CTableDataCell scope="row">
            <CFormTextarea
              aria-label="textarea"
              id="comments"
              name="comments"
              data-testid="text-area"
              value={item.comments}
              onChange={(e) => commentsOnChange(e, index)}
            ></CFormTextarea>
          </CTableDataCell>
        </CTableBody>
      </CTable>
    </>
  )
}

export default ProjectMileStone
