import {
  CBadge,
  CFormLabel,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import parse from 'html-react-parser'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../../stateStore'

const MileStoneTimeLine = (): JSX.Element => {
  const projectMileStoneHistoryDetails = useTypedSelector(
    reduxServices.projectMileStone.selectors.projectMileStoneTimeLine,
  )

  const isProjectPersistValue = (persistType: string) => {
    if (persistType === 'UPDATED') {
      return (
        <CBadge className="rounded-pill" color="info" data-testid="update-btn">
          Updated
        </CBadge>
      )
    } else if (persistType === 'CREATED') {
      return (
        <CBadge
          className="rounded-pill"
          color="success"
          data-testid="created-btn"
        >
          Created
        </CBadge>
      )
    } else if (persistType === 'CLOSED') {
      return (
        <CBadge className="rounded-pill" color="danger">
          CLOSED
        </CBadge>
      )
    } else if (persistType === 'REJECTED') {
      return (
        <CBadge className="rounded-pill" color="danger">
          Rejected
        </CBadge>
      )
    } else {
      return ''
    }
  }
  return (
    <>
      <div className="sh-timeline-container">
        {projectMileStoneHistoryDetails?.map((item, index) => {
          const billable = item.billable ? 'Yes' : 'No'
          return (
            <div key={index} className="sh-timeline-card">
              <div
                className="sh-timeline-timestamp"
                data-testid="sh-time-stamp"
              >
                {item.modifiedDate}
              </div>
              <div className="sh-timeline-content">
                <div
                  className="sh-timeline-header mb-4 clearfix"
                  data-testid="sh-modifiedBy"
                >
                  <h4 className="sh-timeline-title">{item.modifiedBy} -</h4>
                  <span className="sh-timeline-status">
                    {isProjectPersistValue(item.persistType)}
                  </span>
                </div>
                <div className="sh-timeline-body">
                  <div className="sh-timeline-item mb-1">
                    <div className="mb-1 milestone-timeline">
                      <CFormLabel className="col-form-label p-0">
                        Title:
                      </CFormLabel>
                      &nbsp;
                      {item.title}
                    </div>
                    <div className="mb-1 milestone-timeline">
                      <CFormLabel className="col-form-label p-0">
                        Planned Date:
                      </CFormLabel>
                      &nbsp;
                      {item.planedDate}
                    </div>
                    <div className="mb-1 milestone-timeline">
                      <CFormLabel className="col-form-label p-0">
                        Actual Date:
                      </CFormLabel>
                      &nbsp;
                      {item.actualDate}
                    </div>
                    <div className="mb-1 milestone-timeline">
                      <CFormLabel className="col-form-label p-0">
                        Billable:
                      </CFormLabel>
                      &nbsp;
                      {billable}
                    </div>
                    <div className="mb-1 milestone-timeline">
                      <CFormLabel className="col-form-label p-0">
                        Percentage:
                      </CFormLabel>
                      &nbsp;
                      {item.milestonePercentage}
                    </div>
                    <div className="mb-1 milestone-timeline">
                      <CFormLabel className="col-form-label p-0">
                        Comments:
                      </CFormLabel>
                      &nbsp;
                      {parse(item?.comments)}
                    </div>
                    {item.peopleDTOs.length > 0 ? (
                      <CTable striped responsive align="middle">
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Id:</CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              Name:
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              From Date:
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              To Date:
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              Working Days:
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              Holidays:
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              Leaves
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              Total Days:
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              Hours:
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              Total Hours:
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">
                              Billable:
                            </CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {item.peopleDTOs.map((data) => {
                            const projectBillable = data.isBillable
                              ? 'Yes'
                              : 'No'
                            return (
                              <>
                                <CTableRow>
                                  <CTableDataCell scope="row">
                                    {data.employeeId}
                                  </CTableDataCell>
                                  <CTableDataCell scope="row">
                                    {data.employeeName}
                                  </CTableDataCell>
                                  <CTableDataCell scope="row">
                                    {data.fromDate}
                                  </CTableDataCell>
                                  <CTableDataCell scope="row">
                                    {data.endDate}
                                  </CTableDataCell>
                                  <CTableDataCell scope="row">
                                    {data.monthWorkingDays}
                                  </CTableDataCell>
                                  <CTableDataCell scope="row">
                                    {data.holidays}
                                  </CTableDataCell>
                                  <CTableDataCell scope="row">
                                    {data.leaves}
                                  </CTableDataCell>
                                  <CTableDataCell scope="row">
                                    {data.totalDays}
                                  </CTableDataCell>
                                  <CTableDataCell scope="row">
                                    {data.hours}
                                  </CTableDataCell>
                                  <CTableDataCell scope="row">
                                    {data.totalValue}
                                  </CTableDataCell>
                                  <CTableDataCell scope="row">
                                    {projectBillable}
                                  </CTableDataCell>
                                </CTableRow>
                              </>
                            )
                          })}
                        </CTableBody>
                      </CTable>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MileStoneTimeLine
