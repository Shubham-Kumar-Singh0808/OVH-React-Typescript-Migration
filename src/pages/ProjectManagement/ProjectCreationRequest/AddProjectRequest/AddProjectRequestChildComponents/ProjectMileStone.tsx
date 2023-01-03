import {
  CTableBody,
  CFormInput,
  CTableDataCell,
  CFormSelect,
  CFormTextarea,
  CButton,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { ProjectRequestMilestoneDTO } from '../../../../../types/ProjectManagement/ProjectCreationRequests/AddProjectRequest/addProjectRequestTypes'

const ProjectMileStone = ({
  item,
  index,
}: {
  item: ProjectRequestMilestoneDTO
  index: number
}): JSX.Element => {
  return (
    <>
      <CTableBody>
        <CTableDataCell scope="row">
          <CFormInput
            // onChange={(e) => titleOnChange(e, index)}
            value={item.title}
            name="title"
            placeholder="Title"
            data-testid="title-test"
          />
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CFormInput
            // onChange={(e) => effortOnChange(e, index)}
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
            onChange={(date: Date) => console.log(date)}
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
            onChange={(date: Date) => console.log(date)}
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
            // onChange={handleEditProjectAllocationHandler}
          >
            <option value="true">yes</option>
            <option value="false">No</option>
          </CFormSelect>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CFormInput
            // onChange={(e) => titleOnChange(e, index)}
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
            //   onChange={(e) => commentsOnChange(e, index)}
          ></CFormTextarea>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <CButton
            data-testid="search-btn1"
            className="cursor-pointer"
            type="button"
            color="info"
            id="button-addon2"
          >
            <i className="fa fa-plus"></i>
          </CButton>
        </CTableDataCell>
      </CTableBody>
    </>
  )
}

export default ProjectMileStone
