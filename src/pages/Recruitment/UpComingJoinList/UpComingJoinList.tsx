import React, { useEffect, useState } from 'react'
import UpComingJoinListTable from './UpComingJoinListTable'
import EditUpComingJoinee from '../EditUpComingJoinee/feature/EditUpComingJoinee'
import { reduxServices } from '../../../reducers/reduxServices'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { UpComingJoineeList } from '../../../types/Recruitment/UpComingJoinList/UpComingJoinListTypes'

const UpComingJoinList = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>()
  const [toggle, setToggle] = useState<string>('')
  const initialCycle = {} as UpComingJoineeList
  const [editNewJoineeInfo, setEditNewJoineeInfo] = useState(initialCycle)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.KRA.getEmpDepartmentThunk())
  }, [dispatch])

  const joinListSize = useTypedSelector(
    reduxServices.upComingJoinList.selectors.listSize,
  )

  const CurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  useEffect(() => {
    if (CurrentPage) {
      setCurrentPage(CurrentPage)
    }
  }, [CurrentPage])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(joinListSize, 20)

  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="Upcoming Joinees"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <UpComingJoinListTable
            searchInput={searchInput as string}
            setSearchInput={setSearchInput}
            paginationRange={paginationRange}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setToggle={setToggle}
            setEditNewJoineeInfo={setEditNewJoineeInfo}
          />
        </OCard>
      )}
      {toggle === 'upcomingjoinlist' && (
        <EditUpComingJoinee
          setToggle={setToggle}
          editNewJoineeInfo={editNewJoineeInfo}
          setEditNewJoineeInfo={setEditNewJoineeInfo}
          searchInput={searchInput}
        />
      )}
    </>
  )
}

export default UpComingJoinList
