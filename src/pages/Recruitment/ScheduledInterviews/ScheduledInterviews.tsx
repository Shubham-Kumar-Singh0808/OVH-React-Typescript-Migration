import React, { useEffect, useState } from 'react'
import {
  CCol,
  CFormCheck,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import ScheduledCandidatesFilterOptions from './ScheduledCandidatesFilterOptions'
import ScheduledInterviewsFilterOptions from './ScheduledInterviewsFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const ScheduledInterviews = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [selectTechnology, setSelectTechnology] = useState<string>('')
  const [filterByTechnology, setFilterByTechnology] = useState<string>('')
  const [filterByInterviewStatus, setFilterByInterviewStatus] =
    useState<string>('pending')
  const [selectInterviewStatus, setSelectInterviewStatus] = useState<string>(
    filterByInterviewStatus,
  )

  const getTechnologies = useTypedSelector(
    (state) => state.employeeCertificates.getAllTechnologies,
  )

  const selectedView = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.selectedView,
  )

  const employeeRole = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeRole,
  )

  useEffect(() => {
    dispatch(reduxServices.employeeCertifications.getTechnologies())
  }, [dispatch])

  const handleSelectView = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      reduxServices.scheduledInterviews.actions.setSelectedView(
        event.target.value,
      ),
    )
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={
          selectedView === 'Me'
            ? 'Scheduled Interviews'
            : 'Scheduled Candidates'
        }
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow>
          {selectedView === 'Me' ? (
            <>
              <CCol sm={2} md={2} className="text-end">
                <CFormLabel className="mt-1">Interview Status:</CFormLabel>
              </CCol>
              <CCol sm={3}>
                <CFormSelect
                  aria-label="Default select example"
                  size="sm"
                  id="interviewStatus"
                  data-testid="interviewStatusSelect"
                  name="interviewStatus"
                  value={selectInterviewStatus}
                  onChange={(e) => {
                    setSelectInterviewStatus(e.target.value)
                  }}
                >
                  <option value={'pending'}>Pending</option>
                  <option value={'completed'}>Completed</option>
                </CFormSelect>
              </CCol>
            </>
          ) : (
            <>
              <CCol sm={2} md={2} className="text-end">
                <CFormLabel className="mt-1">Technology:</CFormLabel>
              </CCol>
              <CCol sm={3}>
                <CFormSelect
                  aria-label="Default select example"
                  size="sm"
                  id="selectTechnology"
                  data-testid="selectTechnology"
                  name="selectTechnology"
                  value={selectTechnology}
                  onChange={(e) => {
                    setSelectTechnology(e.target.value)
                  }}
                >
                  <option value={''}>Select Technology</option>
                  {getTechnologies
                    ?.slice()
                    ?.sort((technology1, technology2) =>
                      technology1.name.localeCompare(technology2.name),
                    )
                    ?.map((certificateItem, index) => (
                      <option key={index} value={certificateItem.name}>
                        {certificateItem.name}
                      </option>
                    ))}
                </CFormSelect>
              </CCol>
            </>
          )}
          {(employeeRole === 'admin' ||
            employeeRole === 'HR' ||
            employeeRole === 'HR Manager') && (
            <CCol sm={6} className="d-md-flex justify-content-md-end ms-5">
              <CFormCheck
                type="radio"
                name="viewOptions"
                value="Me"
                id="Me"
                label="Me"
                inline
                defaultChecked={selectedView === 'Me'}
                onChange={handleSelectView}
              />
              <CFormCheck
                type="radio"
                name="viewOptions"
                value="All"
                id="All"
                label="All"
                inline
                defaultChecked={selectedView === 'All'}
                onChange={handleSelectView}
              />
            </CCol>
          )}
        </CRow>
        <>
          {selectedView === 'Me' && (
            <ScheduledInterviewsFilterOptions
              selectInterviewStatus={selectInterviewStatus}
              filterByInterviewStatus={filterByInterviewStatus}
              setFilterByInterviewStatus={setFilterByInterviewStatus}
              setSelectInterviewStatus={setSelectInterviewStatus}
            />
          )}
          {selectedView === 'All' && (
            <ScheduledCandidatesFilterOptions
              filterByTechnology={filterByTechnology}
              setFilterByTechnology={setFilterByTechnology}
              selectTechnology={selectTechnology}
              setSelectTechnology={setSelectTechnology}
            />
          )}
        </>
      </OCard>
    </>
  )
}

export default ScheduledInterviews
