import React, { useEffect, useState } from 'react'
import EnrollmentTable from './EnrollmentTable'
import LeadershipEnrollmentListFilterOptions from './LeadershipEnrollmentListFilterOptions'
import LeadershipDetails from './LeadershipDetails'
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

const LeadershipEnrollmentList = () => {
  const dispatch = useAppDispatch()
  const [showLeadershipDetails, setShowLeadershipDetails] =
    useState<boolean>(false)

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
        />
      ) : (
        <>
          <LeadershipEnrollmentListFilterOptions />
          <EnrollmentTable
            setShowLeadershipDetails={setShowLeadershipDetails}
          />
        </>
      )}
    </OCard>
  )
}

export default LeadershipEnrollmentList
