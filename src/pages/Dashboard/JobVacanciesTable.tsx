import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CLink,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import OModal from '../../components/ReusableComponent/OModal'
import { useTypedSelector } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'

const JobVacanciesTable = (): JSX.Element => {
  const [isJobDescriptionModalVisible, setIsJobDescriptionModalVisible] =
    useState(false)
  const [description, setDescription] = useState<string>('')

  const jobOpeningDetails = useTypedSelector(
    reduxServices.jobOpenings.selectors.jobVacancies,
  )

  const handleModal = (jobDescription: string) => {
    const jobDescriptionLength = jobDescription?.length > 20
    setIsJobDescriptionModalVisible(jobDescriptionLength)
    setDescription(jobDescription)
  }
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccessToJobOpenings = userAccessToFeatures?.find(
    (feature) => feature.name === 'Job Openings',
  )

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
          {jobOpeningDetails?.slice(0, 5).map((jobVacancy, index) => {
            const jobDescriptionLimit =
              jobVacancy.description && jobVacancy.description.length > 25
                ? `${jobVacancy.description.substring(0, 25)}`
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
                <CTableDataCell>{jobVacancy.noOfRequirements}</CTableDataCell>
                <CTableDataCell>{jobVacancy.offered}</CTableDataCell>
                <CTableDataCell>{jobVacancy.remaining}</CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <div className="panel-footer mbtrl0">
        {userAccessToJobOpenings?.viewaccess && (
          <p className="text-right mb0">
            <a href="/jobvacancies">
              More {''}
              <i className="fa fa-angle-double-right fa-lg"></i>
            </a>
          </p>
        )}
      </div>
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
    </>
  )
}

export default JobVacanciesTable
