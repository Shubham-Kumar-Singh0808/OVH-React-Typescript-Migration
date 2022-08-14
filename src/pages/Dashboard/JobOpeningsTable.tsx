import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CLink,
  CButton,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import { JobOpeningsTableProps } from '../../types/Dashboard/JobOpenings/JobOpeningsTypes'
import OModal from '../../components/ReusableComponent/OModal'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'

const JobOpeningsTable = (props: JobOpeningsTableProps): JSX.Element => {
  const [isJobDescriptionModalVisible, setIsJobDescriptionModalVisible] =
    useState(false)
  const [description, setDescription] = useState<string>('')

  const jobOpeningDetails = useTypedSelector(
    reduxServices.jobOpenings.selectors.jobVacancies,
  )

  const jobVacanciesListSize = useTypedSelector(
    reduxServices.jobOpenings.selectors.listSize,
  )

  const { pageSize } = props

  const handleModal = (jobDescription: string) => {
    setIsJobDescriptionModalVisible(true)
    setDescription(jobDescription)
  }

  const dispatch = useAppDispatch()

  return (
    <>
      <CTable striped align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Job Code</CTableHeaderCell>
            <CTableHeaderCell scope="col">Job Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Experience</CTableHeaderCell>
            <CTableHeaderCell scope="col">Job Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Position Open Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">No.of Vacancies</CTableHeaderCell>
            <CTableHeaderCell scope="col">Positions Closed</CTableHeaderCell>
            <CTableHeaderCell scope="col">Positions Vacant</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {jobOpeningDetails.map((jobVacancy, index) => {
            const jobDescriptionLimit =
              jobVacancy.description && jobVacancy.description.length > 30
                ? `${jobVacancy.description.substring(0, 30)}...`
                : jobVacancy.description
            return (
              <CTableRow key={index}>
                <CTableDataCell scope="row">
                  {jobVacancy.jobCode}
                </CTableDataCell>
                <CTableDataCell>{jobVacancy.positionVacant}</CTableDataCell>
                <CTableDataCell>{jobVacancy.minimumExperience}</CTableDataCell>
                {jobDescriptionLimit ? (
                  <CTableDataCell>
                    <CLink
                      className="cursor-pointer text-decoration-none text-primary"
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
                <CTableDataCell>{jobVacancy.noOfRequirements}</CTableDataCell>
                <CTableDataCell>{jobVacancy.offered}</CTableDataCell>
                <CTableDataCell>{jobVacancy.remaining}</CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        visible={isJobDescriptionModalVisible}
        setVisible={setIsJobDescriptionModalVisible}
      >
        {description}
      </OModal>
    </>
  )
}

export default JobOpeningsTable
