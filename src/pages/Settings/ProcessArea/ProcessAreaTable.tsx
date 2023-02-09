import React from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const ProcessAreaTable = ({
  selectCategory,
}: {
  selectCategory: string
}): JSX.Element => {
  const ProjectTailoringList = useTypedSelector(
    reduxServices.processArea.selectors.ProjectTailoringList,
  )

  const result = ProjectTailoringList?.filter(
    (value) => value.processHeadname === selectCategory,
  )

  return (
    <>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Process Area</CTableHeaderCell>
            <CTableHeaderCell scope="col">Document</CTableHeaderCell>
            <CTableHeaderCell scope="col">Responsible</CTableHeaderCell>
            <CTableHeaderCell scope="col">Document Link</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status </CTableHeaderCell>
            <CTableHeaderCell scope="col">Order </CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {result?.length > 0 &&
            result?.map((cycle) => {
              return (
                <>
                  {cycle.processSubHeadsDto.length > 0 &&
                    cycle.processSubHeadsDto?.map((count, index) => {
                      return (
                        <>
                          <CTableRow key={index}>
                            <CTableDataCell scope="row">
                              {index + 1}
                            </CTableDataCell>
                            <CTableDataCell>
                              {count.processSubHeadName || 'N/A'}
                            </CTableDataCell>
                            <CTableDataCell>
                              {count?.documentName || 'N/A'}
                            </CTableDataCell>
                            <CTableDataCell>
                              {count?.responsible || 'N/A'}
                            </CTableDataCell>
                            <CTableDataCell>
                              {count?.link || 'N/A'}
                            </CTableDataCell>
                            <CTableDataCell>
                              {count.status === 'true'
                                ? 'Active'
                                : 'Inactive' || 'N/A'}
                            </CTableDataCell>
                            <CTableDataCell>
                              {count?.order || 'N/A'}
                            </CTableDataCell>
                            <CTableDataCell>
                              <CTooltip content="Edit">
                                <CButton
                                  size="sm"
                                  className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                                  color="info btn-ovh me-1"
                                >
                                  <i
                                    className="fa fa-edit"
                                    aria-hidden="true"
                                  ></i>
                                </CButton>
                              </CTooltip>
                            </CTableDataCell>
                          </CTableRow>
                        </>
                      )
                    })}
                </>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}
export default ProcessAreaTable