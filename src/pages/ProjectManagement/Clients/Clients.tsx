import React, { useEffect } from 'react'
import ClientFilterOptions from './ClientFilterOptions'
import ClientsTable from './ClientsTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const Clients = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const clientsListSize = useTypedSelector(
    reduxServices.clients.selectors.clientsListSize,
  )

  const selectedClientStatus = useTypedSelector(
    reduxServices.clients.selectors.selectedClientStatus,
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
  } = usePagination(clientsListSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.clients.getClients({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        selectionStatus: selectedClientStatus,
      }),
    )
  }, [currentPage, dispatch, pageSize, selectedClientStatus])

  return (
    <OCard
      className="mb-4 myprofile-wrapper client-Alignment"
      title={'Clients'}
      CFooterClassName="d-none"
    >
      <ClientFilterOptions
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
      <ClientsTable
        paginationRange={paginationRange}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageSize={pageSize}
        selectedClientStatus={selectedClientStatus}
      />
    </OCard>
  )
}

export default Clients
