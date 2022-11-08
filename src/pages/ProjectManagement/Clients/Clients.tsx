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
  const selectClientCurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  useEffect(() => {
    if (selectClientCurrentPage) {
      setCurrentPage(selectClientCurrentPage)
    }
  }, [selectClientCurrentPage])
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
        startIndex: pageSize * (selectClientCurrentPage - 1),
        endIndex: pageSize * selectClientCurrentPage,
        selectionStatus: selectedClientStatus,
      }),
    )
  }, [selectClientCurrentPage, dispatch, pageSize, selectedClientStatus])

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={'Clients'}
      CFooterClassName="d-none"
    >
      <ClientFilterOptions currentPage={currentPage} pageSize={pageSize} />
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
