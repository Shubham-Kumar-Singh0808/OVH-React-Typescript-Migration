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
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const ProcessAreaTable = ({
  selectCategory,
  setToggle,
}: {
  selectCategory: string
  setToggle: (value: string) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const ProjectTailoringList = useTypedSelector(
    reduxServices.processArea.selectors.ProjectTailoringList,
  )

  const result = ProjectTailoringList?.filter(
    (value) => value.processHeadname === selectCategory,
  )

  const editButtonHandler = (categoryId: number, processSubHeadId: number) => {
    setToggle('editProcessArea')
    dispatch(reduxServices.processArea.getProcessAreas(categoryId))
    dispatch(reduxServices.processArea.getProcessAreaDetails(processSubHeadId))
  }

  const sorting = result?.map((results) => {
    const arrayForSort = [...results.processSubHeadsDto]
    return arrayForSort?.sort((a, b) => {
      if (a.order === null) {
        return 1
      } else if (b.order === null) {
        return -1
      } else {
        return Number(a?.order) - Number(b?.order)
      }
    })
  })

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
          {sorting?.length > 0 &&
            sorting[0]?.map((count, index) => {
              return (
                <>
                  <>
                    <CTableRow key={index}>
                      <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                      <CTableDataCell>
                        {count.processSubHeadName || 'N/A'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {count?.documentName || 'N/A'}
                      </CTableDataCell>
                      <CTableDataCell>
                        {count?.responsible || 'N/A'}
                      </CTableDataCell>
                      <CTableDataCell>{count?.link || 'N/A'}</CTableDataCell>
                      <CTableDataCell>
                        {count.status === 'true'
                          ? 'Active'
                          : 'Inactive' || 'N/A'}
                      </CTableDataCell>
                      <CTableDataCell>{count?.order || 'N/A'}</CTableDataCell>
                      <CTableDataCell>
                        <CTooltip content="Edit">
                          <CButton
                            size="sm"
                            className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                            color="info btn-ovh me-1"
                            onClick={() =>
                              editButtonHandler(
                                count.categoryId,
                                count.processSubHeadId,
                              )
                            }
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      </CTableDataCell>
                    </CTableRow>
                  </>
                </>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}
export default ProcessAreaTable
