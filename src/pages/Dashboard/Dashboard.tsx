import { CCol, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import JobOpeningsTable from './JobOpeningsTable'
import ServiceAwards from './Achievements/ServiceAwards'
import OCard from '../../components/ReusableComponent/OCard'
import { useAppDispatch } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'

const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      reduxServices.jobOpenings.getAllJobVacancies({
        startIndex: 0,
        endIndex: 20,
      }),
    )
    dispatch(reduxServices.serviceAwards.getAllAchievements())
  }, [dispatch])

  return (
    <>
      <CRow>
        <CCol sm={12}>
          <CRow>
            <CRow>
              <CCol sm={3}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Earned Leaves"
                  CBodyClassName="ps-0 pe-0"
                  CFooterClassName="d-none"
                ></OCard>
              </CCol>
              <CCol sm={6}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Time In Office"
                  CBodyClassName="ps-0 pe-0"
                  CFooterClassName="d-none"
                ></OCard>
              </CCol>
              <CCol sm={3}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Trainings"
                  CBodyClassName="ps-0 pe-0"
                  CFooterClassName="d-none"
                ></OCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={9}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Job Openings"
                  CBodyClassName="ps-0 pe-0"
                  footerPath="/jobvacancies"
                >
                  <JobOpeningsTable />
                </OCard>
              </CCol>
              <CCol sm={3}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Birthdays"
                  CBodyClassName="ps-0 pe-0"
                  CFooterClassName="d-none"
                ></OCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={9}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Service Award"
                  CBodyClassName="ps-0 pe-0"
                  CFooterClassName="d-none"
                >
                  <ServiceAwards />
                </OCard>
              </CCol>
              <CCol sm={3}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Holidays"
                  CBodyClassName="ps-0 pe-0"
                  CFooterClassName="d-none"
                ></OCard>
              </CCol>
            </CRow>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
