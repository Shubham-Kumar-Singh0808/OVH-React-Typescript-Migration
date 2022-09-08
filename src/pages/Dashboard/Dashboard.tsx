import { CCol, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import JobVacanciesTable from './JobVacanciesTable'
import UpcomingBirthdays from './Birthdays/UpcomingBirthdays'
import UpcomingHolidays from './Holidays/UpcomingHolidays'
import UpcomingTrainings from './Trainings/UpcomingTrainings'
import UpcomingEvents from './Events/UpcomingEvents'
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
    dispatch(reduxServices.holidays.getUpcomingHolidays())
    dispatch(reduxServices.trainingsAndEvents.getUpcomingTrainings())
    dispatch(reduxServices.trainingsAndEvents.getUpcomingEvents())
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
                  footerPath="/employeeLeaveSummary"
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
                  footerPath="/eventList"
                >
                  <UpcomingTrainings />
                </OCard>
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
                  title="Upcoming Events"
                  CBodyClassName="ps-0 pe-0"
                  footerPath="/eventList"
                >
                  <UpcomingEvents />
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
                  title="Birthdays"
                  CBodyClassName="ps-0 pe-0"
                  footerPath="/birthdaylist"
                >
                  <UpcomingBirthdays />
                </OCard>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={9}></CCol>
              <CCol sm={3}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Holidays"
                  CBodyClassName="ps-0 pe-0"
                  footerPath="/holidaylist"
                >
                  <UpcomingHolidays />
                </OCard>
              </CCol>
            </CRow>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
