import React from 'react'
import parse from 'html-react-parser'
import {
  CButton,
  CLink,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import { AllAssetsList } from '../../../types/Assets/AssetList/AssetListTypes'

const AssetListTableBody = ({
  item,
  index,
  handleAgendaModal,
  getItemNumber,
}: {
  item: AllAssetsList
  index: number
  getItemNumber: (index: number) => number
  handleAgendaModal: (appraisalCycleSpecification: string) => void
}) => {
  const removeSpaces1 = item.otherAssetNumber
    ?.replace(/\s+/g, ' ')
    .trim()
    .replace(/&nbsp;/g, '')
  const agendaLimit1 =
    removeSpaces1 && removeSpaces1.length > 15
      ? `${removeSpaces1.substring(0, 15)}...`
      : removeSpaces1

  const removeSpaces = item.pSpecification
    ?.replace(/\s+/g, ' ')
    .trim()
    .replace(/&nbsp;/g, '')
  const agendaLimit =
    removeSpaces && removeSpaces.length > 15
      ? `${removeSpaces.substring(0, 15)}...`
      : removeSpaces

  const removeSpaces2 = item.location
    ?.replace(/\s+/g, ' ')
    .trim()
    .replace(/&nbsp;/g, '')
  const locationModel =
    removeSpaces2 && removeSpaces2.length > 15
      ? `${removeSpaces2.substring(0, 15)}...`
      : removeSpaces2

  const specificationModel = item.pSpecification ? (
    <CLink
      className="cursor-pointer text-decoration-none"
      data-testid={`specification-modal-link1${index}`}
      onClick={() => handleAgendaModal(item.pSpecification)}
    >
      {parse(agendaLimit)}
    </CLink>
  ) : (
    'N/A'
  )
  const otherAssetNumberModel = item.otherAssetNumber ? (
    <CLink
      className="cursor-pointer text-decoration-none"
      data-testid={`description-modal-link2${index}`}
      onClick={() => handleAgendaModal(item.otherAssetNumber)}
    >
      {parse(agendaLimit1)}
    </CLink>
  ) : (
    'N/A'
  )
  const locationPopUpModel = item.location ? (
    <CLink
      className="cursor-pointer text-decoration-none"
      data-testid={`specification-modal-link${index}`}
      onClick={() => handleAgendaModal(item.location)}
    >
      {parse(locationModel)}
    </CLink>
  ) : (
    'N/A'
  )

  const actionIcons = (
    <CTableDataCell data-testid="action-cell">
      <div className="sh-btn-group">
        <CTooltip content="Edit">
          <CButton color="info" size="sm" className="mb-1">
            <i className="text-white fa fa-pencil-square-o"></i>
          </CButton>
        </CTooltip>
        <br />
        <CTooltip content="History">
          <CButton color="info" size="sm" className="mb-1">
            <i className=" fa fa-wrench"></i>
          </CButton>
        </CTooltip>
        <br />
        <CTooltip content="Change-Status">
          <CButton color="info" size="sm" className="mb-1">
            <i className="fa fa-bar-chart text-white"></i>
          </CButton>
        </CTooltip>
      </div>
    </CTableDataCell>
  )

  return (
    <>
      <CTableBody>
        <CTableRow key={index}>
          <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
          <CTableDataCell>{item.assetNumber || 'N/A'}</CTableDataCell>
          <CTableDataCell>{item.assetType || 'N/A'}</CTableDataCell>
          <CTableDataCell className="text-center">
            {item.productName || 'N/A'}
          </CTableDataCell>
          <CTableDataCell scope="row" className="sh-organization-link">
            {specificationModel}
          </CTableDataCell>
          <CTableDataCell scope="row" className="sh-organization-link">
            {otherAssetNumberModel}
          </CTableDataCell>
          <CTableDataCell scope="row" className="sh-organization-link">
            {locationPopUpModel}
          </CTableDataCell>

          <CTableDataCell>{item.referenceNumber || 'N/A'}</CTableDataCell>
          <CTableDataCell>{item.status || 'N/A'}</CTableDataCell>
          <CTableDataCell>{item.invoiceNumber || 'N/A'}</CTableDataCell>
          <CTableDataCell>{item.amount || 'N/A'}</CTableDataCell>
          <CTableDataCell>{item.employeeName || 'N/A'}</CTableDataCell>
          {actionIcons}
        </CTableRow>
      </CTableBody>
    </>
  )
}

export default AssetListTableBody
