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
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToUpcomingTrainings = userAccessToFeatures?.find(
    (feature) => feature.name === 'Upcoming Trainings',
  )
  const userAccessToUpcomingEvents = userAccessToFeatures?.find(
    (feature) => feature.name === 'Upcoming Events',
  )
  const userAccessToAchievements = userAccessToFeatures?.find(
    (feature) => feature.name === 'Upcoming Achievements',
  )
  const userAccessToUpcomingBirthdays = userAccessToFeatures?.find(
    (feature) => feature.name === 'Dashboard-Birthdays',
  )
  const userAccessToUpcomingHolidays = userAccessToFeatures?.find(
    (feature) => feature.name === 'Dashboard-Holidays',
  )
  const userAccessToJobOpenings = userAccessToFeatures?.find(
    (feature) => feature.name === 'Dashboard-Job Openings',
  )
  const userAccessToProbationaryEndDates = userAccessToFeatures?.find(
    (feature) => feature.name === 'ProbationaryEndDates',
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
    dispatch(reduxServices.earnedLeaves.getLeaveSummary())
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
    dispatch(reduxServices.employeeAchievements.imageFix())
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
                  {userAccessToJobOpenings?.viewaccess && (
                    <OCard
                      className="mb-4 myprofile-wrapper"
                      title="Job Openings"
                      CBodyClassName="ps-0 pe-0"
                      CFooterClassName="d-none"
                      // footerPath="/jobvacancies"
                    >
                      <JobVacanciesTable />
                    </OCard>
                  )}
                </CCol>
                <CCol sm={12}>
                  {userAccessToAchievements?.viewaccess && (
                    <OCard
                      className="mb-4 myprofile-wrapper"
                      CBodyClassName="ps-0 pe-0"
                      CHeaderClassName="d-none"
                      CFooterClassName="d-none"
                    >
                      <Achievements />
                    </OCard>
                  )}
                </CCol>
              </CRow>
            </CCol>
            <CCol md={3}>
              <CCol sm={12}>
                {userAccessToUpcomingTrainings?.viewaccess && (
                  <OCard
                    className="mb-4 myprofile-wrapper"
                    title="Upcoming Trainings"
                    CBodyClassName="ps-0 pe-0"
                    CFooterClassName="d-none"
                  >
                    <UpcomingTrainings />
                  </OCard>
                )}
              </CCol>
              <CCol sm={12}>
                {userAccessToUpcomingEvents?.viewaccess && (
                  <OCard
                    className="mb-4 myprofile-wrapper"
                    title="Upcoming Events"
                    CBodyClassName="ps-0 pe-0"
                    CFooterClassName="d-none"
                  >
                    <UpcomingEvents />
                  </OCard>
                )}
              </CCol>
              <CCol sm={12}>
                {userAccessToUpcomingBirthdays?.viewaccess && (
                  <OCard
                    className="mb-4 myprofile-wrapper"
                    title="Upcoming Birthdays"
                    CBodyClassName="ps-0 pe-0"
                    CFooterClassName="d-none"
                  >
                    <UpcomingBirthdays />
                  </OCard>
                )}
              </CCol>
              <CCol sm={12}>
                {userAccessToUpcomingHolidays?.viewaccess && (
                  <OCard
                    className="mb-4 myprofile-wrapper"
                    title="Upcoming Holidays"
                    CBodyClassName="ps-0 pe-0"
                    CFooterClassName="d-none"
                  >
                    <UpcomingHolidays />
                  </OCard>
                )}
              </CCol>
              <CCol sm={12}>
                {userAccessToProbationaryEndDates?.viewaccess && (
                  <OCard
                    className="mb-4 myprofile-wrapper"
                    title="Upcoming Probationary End Dates"
                    CBodyClassName="ps-0 pe-0"
                    CFooterClassName="d-none"
                  >
                    <UpcomingProbationaryEndDates />
                  </OCard>
                )}
              </CCol>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
