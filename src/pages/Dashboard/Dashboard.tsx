import { CCol, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import JobVacanciesTable from './JobVacanciesTable'
import UpcomingBirthdays from './Birthdays/UpcomingBirthdays'
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
    dispatch(
      reduxServices.upcomingBirthdays.getUpcomingBirthdayAnniversaries({
        startIndex: 0,
        endIndex: 3,
      }),
    )
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
                  <JobVacanciesTable />
                </OCard>
              </CCol>
              <CCol sm={3}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Birthdays"
                  CBodyClassName="ps-0 pe-0"
                  footerPath="/birthdaylist"
                >
                  <UpcomingBirthdays />
                </OCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={9}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Service Award"
                  CBodyClassName="ps-0 pe-0"
                  CFooterClassName="d-none"
                ></OCard>
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
