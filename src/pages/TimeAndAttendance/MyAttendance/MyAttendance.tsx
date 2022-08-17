import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import moment from 'moment'
import { CButton } from '@coreui/react-pro'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { GetMyAttendanceProps } from '../../../types/TimeAndAttendance/MyAttendance/myAttendanceTypes'

const MyAttendance = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const calendarRef = useRef<FullCalendar>(null)
  const dateFormat = 'YYYY-MM-DD'

  const [startDate, setStartDate] = useState(
    moment().subtract(1, 'months').startOf('month').format(dateFormat),
  )
  const [endDate, setEndDate] = useState(
    moment().add(1, 'months').startOf('month').format(dateFormat),
  )
  const [currentDate, setCurrentDate] = useState<Date | undefined>(new Date())
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const employeeAttendance = useTypedSelector(
    reduxServices.myAttendance.selectors.employeeAttendance,
  )

  const changeMonth = (currentDate: Date | undefined) => {
    setCurrentDate(currentDate)
    setStartDate(
      moment(currentDate)
        .subtract(1, 'months')
        .startOf('month')
        .format(dateFormat),
    )
    setEndDate(
      moment(currentDate).add(1, 'months').startOf('month').format(dateFormat),
    )
  }

  const handleNext = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi()
    calendarApi?.next()
    const curr = calendarApi?.getDate()
    changeMonth(curr)
  }, [calendarRef])

  const handlePrev = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi()
    calendarApi?.prev()
    const curr = calendarApi?.getDate()
    changeMonth(curr)
  }, [calendarRef])

  const handleToday = useCallback(() => {
    const calendarApi = calendarRef.current?.getApi()
    calendarApi?.today()
    const curr = calendarApi?.getDate()
    setCurrentDate(curr)
    changeMonth(curr)
  }, [calendarRef])

  const getMyAttendanceProps: GetMyAttendanceProps = useMemo(() => {
    return {
      start: startDate,
      end: endDate,
      loggedInEmployeeId: Number(employeeId),
    }
  }, [startDate, endDate, employeeId])

  useEffect(() => {
    dispatch(reduxServices.myAttendance.getMyAttendance(getMyAttendanceProps))
  }, [getMyAttendanceProps])

  const headerToolBarProps = {
    start: '',
    center: '',
    end: '',
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper time-in-office-report-card"
        title="Employee Attendance"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <div className="calendar-box">
          <div className="fc">
            <div className="fc-header-toolbar fc-toolbar calendar-header">
              <div className="fc-toolbar-chunk">
                <button
                  className="fc-today-button fc-button fc-button-primary"
                  title="This month"
                  disabled={
                    moment(currentDate).format('MMMM') ===
                    moment(new Date()).format('MMMM')
                  }
                  onClick={handleToday}
                  data-testid="today-button"
                >
                  Today
                </button>
              </div>
              <div className="fc-toolbar-chunk">
                <h2 className="fc-toolbar-title">
                  {moment(currentDate).format('MMMM YYYY')}
                </h2>
              </div>
              <div className="fc-toolbar-chunk">
                {moment(currentDate).format('MMMM') !==
                  moment(new Date()).subtract(1, 'months').format('MMMM') && (
                  <button
                    className="fc-prev-button fc-button fc-button-primary"
                    title="Previous month"
                    onClick={handlePrev}
                    data-testid="prev-button"
                  >
                    <span className="fc-icon fc-icon-chevron-left"></span>
                  </button>
                )}
                <button
                  className="fc-prev-button fc-button fc-button-primary"
                  title="Next month"
                  onClick={handleNext}
                  data-testid="next-button"
                >
                  <span className="fc-icon fc-icon-chevron-right"></span>
                </button>
              </div>
            </div>
          </div>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={headerToolBarProps}
            contentHeight={427}
            events={employeeAttendance}
            ref={calendarRef}
            firstDay={1}
          />
        </div>
      </OCard>
    </>
  )
}

export default MyAttendance
