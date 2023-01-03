import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CFormInput,
  CTableDataCell,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react-pro'
import React from 'react'
import DatePicker from 'react-datepicker'

const ProjectMileStone = (): JSX.Element => {
  return (
    <>
      <CTable striped>
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
              // onChange={(e) => titleOnChange(e, index)}
              // value={item.title}
              name="title"
              placeholder="Title"
              data-testid="title-test"
            />
          </CTableDataCell>
          <CTableDataCell scope="row">
            <CFormInput
              // onChange={(e) => effortOnChange(e, index)}
              // value={item.effort}
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
              // value={item.fromDate}
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
              // value={item.fromDate}
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
              // value={editEmployeeAllocation.billable as unknown as string}
              // onChange={handleEditProjectAllocationHandler}
            >
              <option value="true">yes</option>
              <option value="false">No</option>
            </CFormSelect>
          </CTableDataCell>
          <CTableDataCell scope="row">
            <CFormInput
              // onChange={(e) => titleOnChange(e, index)}
              // value={item.title}
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
              //   value={item.comments}
              //   onChange={(e) => commentsOnChange(e, index)}
            ></CFormTextarea>
          </CTableDataCell>
        </CTableBody>
      </CTable>
    </>
  )
}

export default ProjectMileStone
