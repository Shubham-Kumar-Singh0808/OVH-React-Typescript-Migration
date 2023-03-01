import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import KRAFilterOptions from './KRALandingScreenComponents/KRAFilterOptions'
import KRATable from './KRALandingScreenComponents/KRATable'
import AddKRA from './AddEditKRA/AddKRA'
import EditKRA from './AddEditKRA/EditKRA'
import AddNewKPI from './AddKPI/AddNewKPI'
import EditKPi from './EditKPI/EditKPi'
import { selectDepartment, selectDesignation } from './KRAConstants'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'
import {
  KRAPages,
  KRATableDataItem,
} from '../../../types/Performance/KRA/KRATypes'
import { emptyString } from '../../Achievements/AchievementConstants'

const KRALandingScreen = (): JSX.Element => {
  const [selectedDepartment, setSelectedDepartment] =
    useState<string>(selectDepartment)
  const [selectedDesignation, setSelectedDesignation] =
    useState<string>(selectDesignation)
  const [addKPI, setAddKPI] = useState<KRATableDataItem>({} as KRATableDataItem)
  const kraList = useParams<{ kraListPage: string }>()
  const dispatch = useAppDispatch()
  const currentOnScreenPage = useTypedSelector(
    (state) => state.KRA.currentOnScreenPage,
  )

  useEffect(() => {
    dispatch(reduxServices.KRA.getEmpDepartmentThunk())
    dispatch(reduxServices.KRA.getFrequency())
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

  useEffect(() => {
    if (kraList) {
      dispatch(
        reduxServices.KRA.actions.setCurrentOnScreenPage(KRAPages.kraList),
      )
    }
  }, [kraList])

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={String(currentOnScreenPage)}
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      {currentOnScreenPage === KRAPages.kraList && (
        <>
          <KRAFilterOptions
            currentPage={currentPage}
            pageSize={pageSize}
            selectedDepartment={selectedDepartment}
            selectedDesignation={selectedDesignation}
            setSelectedDepartment={setSelectedDepartment}
            setSelectedDesignation={setSelectedDesignation}
          />
          <KRATable
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
            setAddKPI={setAddKPI}
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
      {currentOnScreenPage === KRAPages.addKPI && <AddNewKPI addKPI={addKPI} />}
      {currentOnScreenPage === KRAPages.editKPI && <EditKPi />}
    </OCard>
  )
}

export default KRALandingScreen
