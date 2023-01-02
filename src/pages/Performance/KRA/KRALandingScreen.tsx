import React, { useEffect } from 'react'
import KRAFilterOptions from './KRALandingScreenComponents/KRAFilterOptions'
import KRATable from './KRALandingScreenComponents/KRATable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const KRALandingScreen = (): JSX.Element => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.KRA.getEmpDepartmentThunk())
  }, [])

  const kraTableSize = useTypedSelector((state) => state.KRA.kraData.size)
  const pageSizeFromState = useTypedSelector((state) => state.KRA.pageSize)
  const pageFromState = useTypedSelector((state) => state.KRA.currentPage)

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
      title={'KRA List'}
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <KRAFilterOptions currentPage={currentPage} pageSize={pageSize} />
      <KRATable
        paginationRange={paginationRange}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </OCard>
  )
}

export default KRALandingScreen
