import React, { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
  CButton,
  CTooltip,
} from '@coreui/react-pro'
import { TableProps } from '../../../types/Recruitment/CandidateList/CandidateListTypes'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'

const CandidateListTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  searchInput,
}: TableProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deleteLocationId, setDeleteLocationId] = useState(0)
  const [deleteLocationName, setDeleteLocationName] = useState('')

  const getCandidateDetails = useTypedSelector(
    reduxServices.candidateList.selectors.getAllCandidateDetails,
  )

  const CandidateListSize = useTypedSelector(
    reduxServices.candidateList.selectors.listSize,
  )

  const totalNoOfRecords = getCandidateDetails?.length
    ? `Total Records: ${CandidateListSize}`
    : `No Records found...`

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const deleteButtonHandler = (id: number, locationName: string) => {
    setIsDeleteModalVisible(true)
    setDeleteLocationId(id)
    setDeleteLocationName(locationName)
  }

  const deletedToastElement = (
    <OToast
      toastColor="success"
      toastMessage="Candidate Deleted Successfully"
    />
  )
  const deleteFailedToastMessage = (
    <OToast
      toastMessage="You can't delete.Candidate is in progress
      "
      toastColor="danger"
      data-testid="failedToast"
    />
  )

  const confirmDeleteLocation = async () => {
    setIsDeleteModalVisible(false)
    const deleteLocationResult = await dispatch(
      reduxServices.candidateList.deleteCandidate(deleteLocationId),
    )
    if (
      reduxServices.candidateList.deleteCandidate.fulfilled.match(
        deleteLocationResult,
      )
    ) {
      dispatch(
        reduxServices.candidateList.searchScheduledCandidate({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          searchStr: searchInput,
        }),
      )
      dispatch(reduxServices.app.actions.addToast(deletedToastElement))
      dispatch(reduxServices.app.actions.addToast(undefined))
    } else if (
      reduxServices.candidateList.deleteCandidate.rejected.match(
        deleteLocationResult,
      ) &&
      deleteLocationResult.payload === 500
    ) {
      dispatch(reduxServices.app.actions.addToast(deleteFailedToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

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
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Position Applied for
            </CTableHeaderCell>

            <CTableHeaderCell scope="col">Job Code</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
            <CTableHeaderCell scope="col"> Email ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Experience</CTableHeaderCell>
            <CTableHeaderCell scope="col">Skills</CTableHeaderCell>
            <CTableHeaderCell scope="col">Recruiter</CTableHeaderCell>
            <CTableHeaderCell scope="col">Reference</CTableHeaderCell>

            <CTableHeaderCell scope="col">Country</CTableHeaderCell>

            <CTableHeaderCell scope="col">Status</CTableHeaderCell>

            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {getCandidateDetails?.length > 0 &&
            getCandidateDetails?.map((data, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {getItemNumber(index)}
                  </CTableDataCell>
                  <CTableDataCell>{data.fullName}</CTableDataCell>
                  <CTableDataCell>{data.appliedForVacancy}</CTableDataCell>
                  <CTableDataCell>{data.appliedFor.jobCode}</CTableDataCell>
                  <CTableDataCell>{data.mobile}</CTableDataCell>
                  <CTableDataCell>{data.email}</CTableDataCell>
                  <CTableDataCell>{data.experience}</CTableDataCell>
                  <CTableDataCell>{data.skills}</CTableDataCell>
                  <CTableDataCell>{data.recruiter}</CTableDataCell>
                  <CTableDataCell>
                    {data.sourcelookUp.sourceName}
                  </CTableDataCell>
                  <CTableDataCell>{data.country.name}</CTableDataCell>
                  <CTableDataCell>
                    {data.cadidateInterviewStatus}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CTooltip content="Edit">
                      <CButton
                        color="info btn-ovh me-1"
                        className="btn-ovh-employee-list me-1"
                        data-testid={`btn-edit${index}`}
                      >
                        <i className="fa fa-edit" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Timeline">
                      <CButton
                        color="info btn-ovh me-1"
                        className="btn-ovh-employee-list me-1"
                        data-testid={`sc-timeline-btn${index}`}
                      >
                        <i className="fa fa-bar-chart" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Delete">
                      <CButton
                        data-testid={`btn-delete${index}`}
                        size="sm"
                        color="danger btn-ovh me-1"
                        className="btn-ovh-employee-list me-1"
                        onClick={() =>
                          deleteButtonHandler(data.personId, data.fullName)
                        }
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p className="mt-2">
            <strong>{totalNoOfRecords}</strong>
          </p>
        </CCol>
        <CCol xs={3}>
          {CandidateListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSize}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {CandidateListSize > 20 && (
          <CCol
            xs={5}
            className="d-grid gap-1 d-md-flex justify-content-md-end"
          >
            <OPagination
              currentPage={currentPage}
              pageSetter={setCurrentPage}
              paginationRange={paginationRange}
            />
          </CCol>
        )}
      </CRow>
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Candidate"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={confirmDeleteLocation}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this{' '}
          <strong>{deleteLocationName}</strong> Candidate ?
        </>
      </OModal>
    </>
  )
}

export default CandidateListTable
