import React, { useEffect, useState } from 'react'
import KRAFilterOptions from './KRALandingScreenComponents/KRAFilterOptions'
import KRATable from './KRALandingScreenComponents/KRATable'
import AddKRA from './AddEditKRA/AddKRA'
import EditKRA from './AddEditKRA/EditKRA'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { KRAPages } from '../../../types/Performance/KRA/KRATypes'
import { emptyString } from '../../Achievements/AchievementConstants'

const KRALandingScreen = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const currentOnScreenPage = useTypedSelector(
    (state) => state.KRA.currentOnScreenPage,
  )

  useEffect(() => {
    dispatch(reduxServices.KRA.getEmpDepartmentThunk())
  }, [])

  const kraTableSize = useTypedSelector((state) => state.KRA.kraData.size)
  const pageSizeFromState = useTypedSelector((state) => state.KRA.pageSize)
  const pageFromState = useTypedSelector((state) => state.KRA.currentPage)

  const [enteredDescription, setEnteredDescription] =
    useState<string>(emptyString)

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(kraTableSize, pageSizeFromState, pageFromState)

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={String(currentOnScreenPage)}
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {currentOnScreenPage === KRAPages.kraList && (
        <>
          <KRAFilterOptions currentPage={currentPage} pageSize={pageSize} />
          <KRATable
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </>
      )}
      {currentOnScreenPage === KRAPages.addKra && (
        <AddKRA
          enteredDescription={enteredDescription}
          setEnteredDescription={setEnteredDescription}
        />
      )}
      {currentOnScreenPage === KRAPages.editKra && <EditKRA />}
    </OCard>
  )
}

export default KRALandingScreen
