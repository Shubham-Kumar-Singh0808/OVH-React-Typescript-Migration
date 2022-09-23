import { CCol, CRow } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import JobVacanciesTable from './JobVacanciesTable'
import UpcomingBirthdays from './Birthdays/UpcomingBirthdays'
import UpcomingHolidays from './Holidays/UpcomingHolidays'
import EmployeeEarnedLeaves from './EarnedLeaves/EmployeeEarnedLeaves'
import TimeInOffice from './TimeInOffice/TimeInOffice'
import UpcomingTrainings from './Trainings/UpcomingTrainings'
import UpcomingEvents from './Events/UpcomingEvents'
import UpcomingProbationaryEndDates from './ProbationaryList/UpcomingProbationaryEndDates'
import Achievements from './Achievements/Achievements'
import OCard from '../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'

const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const employeeID = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

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
    dispatch(reduxServices.earnedLeaves.getFinancialYear())
    dispatch(reduxServices.employeeLeaveSummary.getEmployeeLeaveSummary())
    dispatch(reduxServices.weeklyTimeInOffice.getEmployeeTimeInOffice())
    dispatch(reduxServices.trainingsAndEvents.getUpcomingTrainings())
    dispatch(reduxServices.trainingsAndEvents.getUpcomingEvents())
    dispatch(
      reduxServices.employeeProbationPeriod.getEmployeesUnderProbationPeriod({
        employeeId: Number(employeeID),
        startIndex: 0,
        endIndex: 3,
      }),
    )
    dispatch(reduxServices.employeeAchievements.getAllAchievements())
  }, [dispatch])

  return (
    <>
      <CRow>
        <CCol sm={12}>
          <CRow>
            <CCol md={9}>
              <CRow>
                <CCol sm={4}>
                  <EmployeeEarnedLeaves />
                </CCol>
                <CCol sm={8}>
                  <TimeInOffice />
                </CCol>
                <CCol sm={12}>
                  <OCard
                    className="mb-4 myprofile-wrapper"
                    title="Job Openings"
                    CBodyClassName="ps-0 pe-0"
                    footerPath="/jobvacancies"
                  >
                    <JobVacanciesTable />
                  </OCard>
                </CCol>
                <CCol sm={12}>
                  <OCard
                    className="mb-4 myprofile-wrapper"
                    CBodyClassName="ps-0 pe-0"
                    CHeaderClassName="d-none"
                    CFooterClassName="d-none"
                  >
                    <Achievements />
                  </OCard>
                </CCol>
              </CRow>
            </CCol>
            <CCol md={3}>
              <CCol sm={12}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Upcoming Trainings"
                  CBodyClassName="ps-0 pe-0"
                  footerPath="/eventList"
                >
                  <UpcomingTrainings />
                </OCard>
              </CCol>
              <CCol sm={12}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Upcoming Events"
                  CBodyClassName="ps-0 pe-0"
                  footerPath="/eventList"
                >
                  <UpcomingEvents />
                </OCard>
              </CCol>
              <CCol sm={12}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Upcoming Birthdays"
                  CBodyClassName="ps-0 pe-0"
                  footerPath="/birthdaylist"
                >
                  <UpcomingBirthdays />
                </OCard>
              </CCol>
              <CCol sm={12}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Upcoming Holidays"
                  CBodyClassName="ps-0 pe-0"
                  footerPath="/holidaylist"
                >
                  <UpcomingHolidays />
                </OCard>
              </CCol>
              <CCol sm={12}>
                <OCard
                  className="mb-4 myprofile-wrapper"
                  title="Upcoming Probationary End Dates"
                  CBodyClassName="ps-0 pe-0"
                  footerPath="/probationaryList"
                >
                  <UpcomingProbationaryEndDates />
                </OCard>
              </CCol>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
