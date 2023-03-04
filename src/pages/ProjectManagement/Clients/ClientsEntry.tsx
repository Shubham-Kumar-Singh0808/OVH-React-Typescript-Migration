import { CTableRow, CTableDataCell, CButton, CTooltip } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import ClientDetailsTable from './ClientDetailsTable'
import { Client } from '../../../types/ProjectManagement/Clients/clientsTypes'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
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

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToClients = userAccessToFeatures?.find(
    (feature) => feature.name === 'Clients',
  )

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
          <Link
            to={`/clientInfo/${props.client.id}`}
            className="cursor-pointer"
          >
            {props.client.organization}
          </Link>
        </CTableDataCell>
        <CTableDataCell scope="row">{props.client.name}</CTableDataCell>
        <CTableDataCell scope="row">{props.client.personName}</CTableDataCell>
        <CTableDataCell scope="row">{props.client.email}</CTableDataCell>
        <CTableDataCell scope="row">{props.client.country}</CTableDataCell>
        {props.client.totalFixedBids > 0 ? (
          <CTableDataCell scope="row">
            <Link to={`/projectreport`} className="employee-name">
              {props.client.totalFixedBids}
            </Link>
          </CTableDataCell>
        ) : (
          <CTableDataCell>{props.client.totalFixedBids}</CTableDataCell>
        )}
        {props.client.totalRetainers > 0 ? (
          <CTableDataCell scope="row">
            <Link to={`/projectreport`} className="employee-name">
              {props.client.totalRetainers}
            </Link>
          </CTableDataCell>
        ) : (
          <CTableDataCell>{props.client.totalFixedBids}</CTableDataCell>
        )}
        <CTableDataCell scope="row">
          <div className="buttons-clients">
            <Link to={`/clientInfo/${props.client.id}`}>
              <CTooltip content="View">
                <CButton className="btn-ovh btn-ovh-employee-list me-1 sh-eye-btn-color">
                  <i className="fa fa-eye" aria-hidden="true"></i>
                </CButton>
              </CTooltip>
            </Link>
            <Link to={`/editClient/${props.client.id}`}>
              {userAccessToClients?.updateaccess && (
                <CTooltip content="Edit">
                  <CButton
                    color="info btn-ovh me-1"
                    className="btn-ovh-employee-list"
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </CButton>
                </CTooltip>
              )}
            </Link>
            {userAccessToClients?.deleteaccess && (
              <CTooltip content="Delete">
                <CButton
                  color="danger btn-ovh me-1"
                  className="btn-ovh-employee-list"
                  data-testid={`client-delete-btn${props.id}`}
                  onClick={() => {
                    props.onDeleteBtnClick(props.id, props.client.name)
                  }}
                >
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </CButton>
              </CTooltip>
            )}
          </div>
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
