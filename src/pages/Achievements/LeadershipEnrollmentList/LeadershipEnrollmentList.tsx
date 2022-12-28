import React, { useEffect, useState } from 'react'
import EnrollmentTable from './LeaderEnrollmentListComponents/EnrollmentTable'
import LeadershipEnrollmentListFilterOptions from './LeaderEnrollmentListComponents/LeadershipEnrollmentListFilterOptions'
import LeadershipDetails from './LeaderEnrollmentListComponents/LeadershipDetails'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import {
  LeadershipListDateFiltersEnums,
  LeadershipListQueryParameters,
  LeadershipListStatusFiltersEnums,
} from '../../../types/Achievements/LeadershipEnrollmentList/LeadershipEnrollmentListTypes'
import { emptyString } from '../AchievementConstants'

const initialQueries: LeadershipListQueryParameters = {
  dateSelection: String(LeadershipListDateFiltersEnums.currentMonth),
  from: emptyString,
  to: emptyString,
  statusSelection: String(LeadershipListStatusFiltersEnums.new),
}

const LeadershipEnrollmentList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [showLeadershipDetails, setShowLeadershipDetails] =
    useState<boolean>(false)

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    dispatch(
      reduxServices.leadershipEnrollmentList.getLeadershipListThunk(
        initialQueries,
      ),
    )
  }, [])

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={
        showLeadershipDetails
          ? 'Leadership Registration Details'
          : 'Leadership List'
      }
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {showLeadershipDetails ? (
        <LeadershipDetails
          setShowLeadershipDetails={setShowLeadershipDetails}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
        />
      ) : (
        <>
          <LeadershipEnrollmentListFilterOptions />
          <EnrollmentTable
            setShowLeadershipDetails={setShowLeadershipDetails}
            setCurrentIndex={setCurrentIndex}
          />
        </>
      )}
    </OCard>
  )
}

export default LeadershipEnrollmentList
