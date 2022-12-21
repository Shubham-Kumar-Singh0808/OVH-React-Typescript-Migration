import React, { useEffect, useState } from 'react'
import NomineeListTable from './NomineeListTable'
import NomineeListCycleFilter from './NomineeListCycleFilter'
import NomineeDetails from './NomineeDetails'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { selectCycle } from '../AchievementConstants'

const NomineeList = () => {
  const dispatch = useAppDispatch()
  const [currentCycle, setCurrentCycle] = useState<string>(selectCycle)
  const [isViewNomination, setViewNomination] = useState<boolean>(false)
  const nomineeCycles = useTypedSelector(
    (state) => state.nomineeList.cyclesList,
  )
  const isLoading = useTypedSelector((state) => state.nomineeList.isLoading)

  useEffect(() => {
    dispatch(reduxServices.nomineeList.getAllCyclesThunk())
  }, [])

  useEffect(() => {
    for (const item of nomineeCycles.list) {
      if (item.activateFlag === true) {
        setCurrentCycle(item.cycleName)
        break
      }
    }
  }, [nomineeCycles.list])

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={isViewNomination ? 'Nominee Details' : 'Nominee List'}
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {isViewNomination ? (
        <NomineeDetails setViewNomination={setViewNomination} />
      ) : (
        <>
          <NomineeListCycleFilter
            currentCycle={currentCycle}
            setCurrentCycle={setCurrentCycle}
          />
          <NomineeListTable setViewNomination={setViewNomination} />
        </>
      )}
    </OCard>
  )
}

export default NomineeList
