import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CCol,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import ClientsEntry from './ClientsEntry'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'

const ClientsTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  selectedClientStatus,
}: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  selectedClientStatus: string
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isIconVisible, setIsIconVisible] = useState(false)
  const [selectedClientId, setSelectedClientId] = useState(0)
  const [deleteClientModalVisibility, setDeleteClientModalVisibility] =
    useState(false)
  const [clientName, setClientName] = useState<string>('')
  const isLoading = useTypedSelector(reduxServices.clients.selectors.isLoading)
  const clientsListSize = useTypedSelector(
    reduxServices.clients.selectors.clientsListSize,
  )

  const allClients = useTypedSelector(
    reduxServices.clients.selectors.allClients,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const onDeleteBtnClick = (clientId: number, name: string) => {
    setDeleteClientModalVisibility(true)
    setClientName(name)
    setSelectedClientId(clientId)
  }

  const deleteFailedToastElement = (
    <OToast
      toastColor="danger"
      toastMessage="Client is already added to a project, so can't be deleted."
    />
  )

  const deleteSuccessToastElement = (
    <OToast toastColor="success" toastMessage="Client deleted Successfully!" />
  )

  const handleConfirmDeleteClient = async () => {
    setDeleteClientModalVisibility(false)
    const deleteClientResultAction = await dispatch(
      reduxServices.clients.deleteClient(selectedClientId),
    )
    if (
      reduxServices.clients.deleteClient.fulfilled.match(
        deleteClientResultAction,
      )
    ) {
      dispatch(
        reduxServices.clients.getClients({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          selectionStatus: selectedClientStatus,
        }),
      )
      dispatch(reduxServices.app.actions.addToast(deleteSuccessToastElement))
    } else if (deleteClientResultAction.payload === 500) {
      dispatch(reduxServices.app.actions.addToast(deleteFailedToastElement))
    }
  }

  const tableHeaderCellPropsOrganization = {
    width: '24%',
    scope: 'col',
  }

  const tableHeaderCellPropsAction = {
    width: '10%',
    scope: 'col',
  }

  const tableHeaderCellPropsClient = {
    width: '22%',
    scope: 'col',
  }

  const tableHeaderCellPropsContactPerson = {
    width: '16%',
    scope: 'col',
  }

  return (
    <>
      <CTable striped className="text-start mt-5 align-middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">Code</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsOrganization}>
              Organization
            </CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsClient}>
              Client
            </CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsContactPerson}>
              Contact Person
            </CTableHeaderCell>
            <CTableHeaderCell scope="col">Email ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Country</CTableHeaderCell>
            <CTableHeaderCell scope="col">F.P</CTableHeaderCell>
            <CTableHeaderCell scope="col">R.P</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsAction}>
              Actions
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            allClients &&
            allClients?.map((client, index) => (
              <ClientsEntry
                id={client.id}
                client={client}
                key={index}
                selectedClientId={selectedClientId}
                setSelectedClientId={setSelectedClientId}
                onDeleteBtnClick={onDeleteBtnClick}
                isIconVisible={isIconVisible}
                setIsIconVisible={setIsIconVisible}
              />
            ))
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      {allClients?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {clientsListSize}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {clientsListSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {clientsListSize > 20 && (
            <CCol
              xs={5}
              className="gap-1 d-grid d-md-flex justify-content-md-end"
            >
              <OPagination
                currentPage={currentPage}
                pageSetter={setCurrentPage}
                paginationRange={paginationRange}
              />
            </CCol>
          )}
        </CRow>
      ) : (
        <CCol>
          <CRow className="mt-3 ms-3">
            <h5>No Records Found... </h5>
          </CRow>
        </CCol>
      )}
      <OModal
        alignment="center"
        modalTitle="Delete Client"
        visible={deleteClientModalVisibility}
        setVisible={setDeleteClientModalVisibility}
        closeButtonClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalBodyClass="mt-0"
        confirmButtonAction={handleConfirmDeleteClient}
      >
        <>
          Do you really want to delete this <strong>{clientName}</strong> client
          ?
        </>
      </OModal>
    </>
  )
}

export default ClientsTable
