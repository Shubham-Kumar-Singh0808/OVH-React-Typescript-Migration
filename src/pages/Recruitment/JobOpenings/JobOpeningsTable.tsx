import React, { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CLink,
  CCol,
  CRow,
  CButton,
  CTooltip,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { JobOpeningsTableProps } from '../../../types/Dashboard/JobOpenings/JobOpeningsTypes'
import OToast from '../../../components/ReusableComponent/OToast'

const JobOpeningsTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  searchInput,
  selectRadioAction,
  setToggle,
}: JobOpeningsTableProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isJobDescriptionModalVisible, setIsJobDescriptionModalVisible] =
    useState(false)
  const [description, setDescription] = useState<string>('')
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deleteJobTitleId, setDeleteJobTitleId] = useState(0)
  const [deleteJobName, setDeleteJobName] = useState('')

  const getJobVacancies = useTypedSelector(
    reduxServices.jobVacancies.selectors.getJobVacancies,
  )
  const listSize = useTypedSelector(
    reduxServices.jobVacancies.selectors.listSize,
  )
  const handleModal = (jobDescription: string) => {
    const jobDescriptionLength = jobDescription?.length > 20
    setIsJobDescriptionModalVisible(jobDescriptionLength)
    setDescription(jobDescription)
  }

  const totalNoOfRecords = getJobVacancies?.length
    ? `Total Records: ${listSize}`
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
    setDeleteJobTitleId(id)
    setDeleteJobName(locationName)
  }

  const viewButtonHandler = (id: number) => {
    setToggle('jobInfo')
    dispatch(reduxServices.jobVacancies.getJobOpeningById(id))
  }

  const deletedToastElement = (
    <OToast toastColor="success" toastMessage="Job Deleted Successfully" />
  )
  const confirmDeleteLocation = async () => {
    setIsDeleteModalVisible(false)
    const deleteLocationResult = await dispatch(
      reduxServices.jobVacancies.deleteJobVacancy(deleteJobTitleId),
    )
    if (
      reduxServices.jobVacancies.deleteJobVacancy.fulfilled.match(
        deleteLocationResult,
      )
    ) {
      dispatch(
        reduxServices.jobVacancies.getAllJobVacancies({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          searchJobTitle: searchInput,
          status: selectRadioAction,
        }),
      )
      dispatch(reduxServices.app.actions.addToast(deletedToastElement))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  return (
    <>
      <CTable className="align-middle alignment">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Job Code</CTableHeaderCell>
            <CTableHeaderCell scope="col">Job Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Experience</CTableHeaderCell>
            <CTableHeaderCell scope="col">Job Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Position Open Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Position expiry date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">No.of Vacancies</CTableHeaderCell>
            <CTableHeaderCell scope="col">Positions Closed</CTableHeaderCell>
            <CTableHeaderCell scope="col">Positions Vacant</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {getJobVacancies.map((jobVacancy, index) => {
            const jobDescriptionLimit =
              jobVacancy.description && jobVacancy.description.length > 25
                ? `${jobVacancy.description.substring(0, 25)}`
                : jobVacancy.description
            return (
              <CTableRow key={index}>
                <CTableDataCell scope="row">
                  {getItemNumber(index)}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {jobVacancy.jobCode}
                </CTableDataCell>
                <CTableDataCell>{jobVacancy.positionVacant}</CTableDataCell>
                <CTableDataCell>{jobVacancy.minimumExperience}</CTableDataCell>
                {jobDescriptionLimit ? (
                  <CTableDataCell>
                    <CLink
                      className="cursor-pointer text-decoration-none text-primary description-link"
                      data-testid={`job-description${index}`}
                      onClick={() => handleModal(jobVacancy.description)}
                    >
                      {parse(jobDescriptionLimit)}
                    </CLink>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell>{`N/A`}</CTableDataCell>
                )}
                <CTableDataCell>{jobVacancy.opendDate}</CTableDataCell>
                <CTableDataCell>{jobVacancy.expiryDate}</CTableDataCell>
                <CTableDataCell>{jobVacancy.noOfRequirements}</CTableDataCell>
                <CTableDataCell>{jobVacancy.offered}</CTableDataCell>
                <CTableDataCell>{jobVacancy.remaining}</CTableDataCell>
                <CTableDataCell>
                  <CTooltip content="View">
                    <CButton
                      color="info"
                      className="btn-ovh-employee-list me-1"
                      data-testid="edit-btn"
                      onClick={() => viewButtonHandler(jobVacancy.id)}
                    >
                      <i
                        className="fa fa-eye  text-white"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                  </CTooltip>
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
                        deleteButtonHandler(
                          jobVacancy.id,
                          jobVacancy.positionVacant,
                        )
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
          {listSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSize}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {listSize > 20 && (
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
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        visible={isJobDescriptionModalVisible}
        setVisible={setIsJobDescriptionModalVisible}
      >
        <span className="descriptionField">
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </span>
      </OModal>
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Location"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={confirmDeleteLocation}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this <strong>{deleteJobName}</strong> Job
          ?
        </>
      </OModal>
    </>
  )
}

export default JobOpeningsTable
