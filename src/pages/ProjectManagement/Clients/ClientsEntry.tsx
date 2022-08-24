import { CTableRow, CTableDataCell, CButton, CLink } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import ClientDetailsTable from './ClientDetailsTable'
import { Client } from '../../../types/ProjectManagement/Clients/clientsTypes'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const ClientsEntry = (props: {
  id: number
  client: Client
  selectedClientId: number
  setSelectedClientId: (value: number) => void
  onDeleteBtnClick: (id: number, name: string) => void
  isIconVisible: boolean
  setIsIconVisible: (value: boolean) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const handleExpandRow = (
    id: number | React.MouseEvent<HTMLButtonElement>,
  ) => {
    props.setSelectedClientId(id as number)
    dispatch(reduxServices.clients.getProjectsUnderClient(id as number))
    props.setIsIconVisible(true)
  }

  return (
    <>
      <CTableRow>
        <CTableDataCell scope="row">
          {props.isIconVisible && props.selectedClientId === props.id ? (
            <i
              data-testid="expandIcon"
              className="fa fa-minus-circle cursor-pointer"
              onClick={() => props.setIsIconVisible(false)}
            />
          ) : (
            <i
              data-testid="collapseIcon"
              className="fa fa-plus-circle cursor-pointer"
              onClick={() => handleExpandRow(props.id)}
            />
          )}
        </CTableDataCell>
        <CTableDataCell scope="row">{props.client.clientCode}</CTableDataCell>
        <CTableDataCell
          scope="row"
          className="sh-organization-link"
          title={props.client.address}
        >
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
            <Link to={`/editClient/${props.client.id}`}>
              <CButton color="info" className="btn-ovh me-2">
                <i className="fa fa-edit" aria-hidden="true"></i>
              </CButton>
            </Link>
            <CButton
              color="danger"
              className="btn-ovh me-2"
              data-testid={`client-delete-btn${props.id}`}
              onClick={() => {
                props.onDeleteBtnClick(props.id, props.client.name)
              }}
            >
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </CButton>
          </>
        </CTableDataCell>
      </CTableRow>
      {props.isIconVisible && props.selectedClientId === props.id ? (
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
