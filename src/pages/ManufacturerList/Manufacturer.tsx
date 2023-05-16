import React, { useEffect } from 'react'
import ManufacturerListTable from './ManufacturerListTable'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { reduxServices } from '../../reducers/reduxServices'
import OCard from '../../components/ReusableComponent/OCard'
import { usePagination } from '../../middleware/hooks/usePagination'

const Manufacturer = (): JSX.Element => {
  const employees = useTypedSelector(
    reduxServices.ManufacturerList.selectors.manufacturerList,
  )
  const dispatch = useAppDispatch()
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(20, 20)

  useEffect(() => {
    dispatch(
      reduxServices.ManufacturerList.getManufacturerList({
        startIndex: 0,
        endIndex: 20,
        manufacturerName: '',
      }),
    )
  }, [dispatch])
  console.log(employees)

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Manufacturer List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ManufacturerListTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      </OCard>
    </>
  )
}

export default Manufacturer
