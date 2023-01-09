import React, { useEffect, useState } from 'react'
import KRAFilterOptions from './KRALandingScreenComponents/KRAFilterOptions'
import KRATable from './KRALandingScreenComponents/KRATable'
import AddKRA from './AddEditKRA/AddKRA'
import EditKRA from './AddEditKRA/EditKRA'
import AddNewKPI from './AddKPI/AddNewKPI'
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
  const [selectedKPI, setSelectedKPI] = useState<KRATableDataItem[]>([
    {
      id: 0,
      name: '',
      description: '',
      kpiLookps: null,
      count: 0,
      checkType: null,
      designationName: '',
      designationId: 0,
      departmentName: '',
      departmentId: 0,
      designationKraPercentage: 0,
    },
  ])
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

  const viewKPIButtonHandler = (kraItem: KRATableDataItem[]): void => {
    dispatch(reduxServices.KRA.actions.setCurrentOnScreenPage(KRAPages.addKPI))
    console.log(kraItem)
    setSelectedKPI([
      {
        id: kraItem[0].id,
        name: kraItem[0].name,
        description: kraItem[0].description,
        kpiLookps: kraItem[0].kpiLookps,
        count: kraItem[0].count,
        checkType: kraItem[0].checkType,
        designationName: kraItem[0].designationName,
        designationId: kraItem[0].designationId,
        departmentName: kraItem[0].departmentName,
        departmentId: kraItem[0].departmentId,
        designationKraPercentage: kraItem[0].designationKraPercentage,
      },
    ])
  }

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
            viewKPIButtonHandler={viewKPIButtonHandler}
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
      {currentOnScreenPage === KRAPages.addKPI && <AddNewKPI />}
    </OCard>
  )
}

export default KRALandingScreen
