import { CTableRow, CTableDataCell, CButton, CLink } from '@coreui/react-pro'
import React, { useState } from 'react'
import ClientDetailsTable from './ClientDetailsTable'
import { Client } from '../../../types/ProjectManagement/Clients/clientsTypes'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const ClientsEntry = (props: {
  id: number
  client: Client
  key: number
  selectedClientId: number
  setSelectedClientId: (value: number) => void
  onDeleteBtnClick: (id: number, name: string) => void
}) => {
  const dispatch = useAppDispatch()

  const [isIconVisible, setIsIconVisible] = useState(false)

  const handleExpandRow = (
    id: number | React.MouseEvent<HTMLButtonElement>,
  ) => {
    props.setSelectedClientId(id as number)
    dispatch(reduxServices.clients.getProjectsUnderClient(id as number))
    setIsIconVisible(true)
  }

  return (
    <>
      <CTableRow key={props.id}>
        <CTableDataCell scope="row">
          {isIconVisible && props.selectedClientId === props.id ? (
            <i
              className="fa fa-minus-circle cursor-pointer"
              onClick={() => setIsIconVisible(false)}
            />
          ) : (
            <i
              className="fa fa-plus-circle cursor-pointer"
              onClick={() => handleExpandRow(props.id)}
            />
          )}
        </CTableDataCell>
        <CTableDataCell scope="row">{props.client.clientCode}</CTableDataCell>
        <CTableDataCell scope="row" className="sh-organization-link">
          <CLink className="cursor-pointer">{props.client.organization}</CLink>
        </CTableDataCell>
        <CTableDataCell scope="row">{props.client.name}</CTableDataCell>
        <CTableDataCell scope="row">{props.client.personName}</CTableDataCell>
        <CTableDataCell scope="row">{props.client.email}</CTableDataCell>
        <CTableDataCell scope="row">{props.client.country}</CTableDataCell>
        <CTableDataCell scope="row" className="sh-organization-link">
          <CLink className="cursor-pointer">
            {props.client.totalFixedBids}
          </CLink>
        </CTableDataCell>
        <CTableDataCell scope="row" className="sh-organization-link">
          <CLink className="cursor-pointer">
            {props.client.totalRetainers}
          </CLink>
        </CTableDataCell>
        <CTableDataCell scope="row">
          <>
            <CButton className="btn-ovh me-2 sh-eye-btn-color">
              <i className="fa fa-eye" aria-hidden="true"></i>
            </CButton>
            <CButton color="info" className="btn-ovh me-2">
              <i className="fa fa-edit" aria-hidden="true"></i>
            </CButton>
            <CButton
              color="danger"
              className="btn-ovh me-2"
              onClick={() => {
                props.onDeleteBtnClick(props.id, props.client.name)
              }}
            >
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </CButton>
          </>
        </CTableDataCell>
      </CTableRow>
      {isIconVisible && props.selectedClientId === props.id ? (
        <CTableDataCell colSpan={10}>
          <ClientDetailsTable />
        </CTableDataCell>
      ) : (
        <></>
      )}
    </>
  )
}

export default ClientsEntry
