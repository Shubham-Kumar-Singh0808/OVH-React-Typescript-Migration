import {
  CTableBody,
  CFormInput,
  CTableDataCell,
  CFormSelect,
  CFormTextarea,
  CButton,
} from '@coreui/react-pro'
import React from 'react'
import DatePicker from 'react-datepicker'
import { ProjectRequestMilestoneDTO } from '../../../../../types/ProjectManagement/ProjectCreationRequests/AddProjectRequest/addProjectRequestTypes'

const ProjectMileStone = ({
  item,
  index,
  setProjectMileStone,
  projectMileStone,
  titleOnChange,
  commentsOnChange,
  effortOnChange,
  onChangeHandleFromDate,
  onChangeHandleToDate,
  billableOnChange,
  percentageOnChange,
}: {
  item: ProjectRequestMilestoneDTO
  index: number
  projectMileStone: ProjectRequestMilestoneDTO[]
  setProjectMileStone: React.Dispatch<
    React.SetStateAction<ProjectRequestMilestoneDTO[]>
  >
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
  billableOnChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => void
  percentageOnChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
}): JSX.Element => {
  const handleClickMileStone = () => {
    setProjectMileStone([
      ...projectMileStone,
      {
        id: Math.floor(Math.random() * 10000),
        billable: '',
        comments: '',
        effort: '',
        fromDate: '',
        milestonePercentage: '',
        title: '',
        toDate: '',
      },
    ])
  }

  return (
    <>
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
            value={item.fromDate}
            onChange={(date: Date) => onChangeHandleToDate(date, index)}
          />
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="billable"
            data-testid="form-select2"
            name="billable"
            value={item.billable}
            onChange={(e) => billableOnChange(e, index)}
          >
            <option value="true">yes</option>
            <option value="false">No</option>
          </CFormSelect>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CFormInput
            onChange={(e) => percentageOnChange(e, index)}
            value={item.title}
            name="title"
            placeholder="Title"
            data-testid="title-test"
          />
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
        <CTableDataCell scope="row">
          <CButton
            data-testid="search-btn1"
            className="cursor-pointer"
            type="button"
            color="info"
            id="button-addon2"
            onClick={handleClickMileStone}
          >
            <i className="fa fa-plus"></i>
          </CButton>
        </CTableDataCell>
      </CTableBody>
    </>
  )
}

export default ProjectMileStone
