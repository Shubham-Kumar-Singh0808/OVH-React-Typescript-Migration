import React from 'react'
import parse from 'html-react-parser'
import {
  CButton,
  CLink,
  CTableDataCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import { AllAssetsList } from '../../../types/Assets/AssetList/AssetListTypes'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'

const ModalLink = ({
  text,
  index,
  handleAgendaModal,
  dataTestId,
}: {
  text: string | undefined
  index: number
  handleAgendaModal: (data: string) => void
  dataTestId: string
}) => {
  if (!text) {
    return <>N/A</>
  }

  return (
    <CLink
      className="cursor-pointer text-decoration-none"
      data-testid={dataTestId}
      key={index}
      onClick={() => handleAgendaModal(text)}
    >
      {parse(text)}
    </CLink>
  )
}

const ActionIcons = ({
  setToggle,
  historyItem,
}: {
  setToggle: React.Dispatch<React.SetStateAction<string>>
  historyItem: AllAssetsList
}) => {
  const dispatch = useAppDispatch()

  const timelineButtonHandler = (id: number) => {
    setToggle('assetTimeline')
    dispatch(
      reduxServices.assetList.getAllAssetHistoryData({
        assetId: id,
        searchAssetReference: '',
      }),
    )
  }
  return (
    <CTableDataCell data-testid="action-cell">
      <div className="sh-btn-group">
        <CTooltip content="Edit">
          <CButton color="info" size="sm" className="mb-1">
            <i className="text-white fa fa-pencil-square-o"></i>
          </CButton>
        </CTooltip>
        <br />
        <CTooltip content="Change-Status">
          <CButton color="info" size="sm" className="mb-1">
            <i className="text-white fa fa-wrench"></i>
          </CButton>
        </CTooltip>
        <br />
        <CTooltip content="Asset Timeline">
          <CButton
            color="info"
            size="sm"
            className="mb-1"
            onClick={() => timelineButtonHandler(historyItem.id)}
          >
            <i className="fa fa-bar-chart text-white"></i>
          </CButton>
        </CTooltip>
      </div>
    </CTableDataCell>
  )
}

const AssetListTableBody = ({
  item,
  index,
  setToggle,
  handleAgendaModal,
  getItemNumber,
}: {
  item: AllAssetsList
  index: number
  getItemNumber: (index: number) => number
  handleAgendaModal: (appraisalCycleSpecification: string) => void
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const specificationModel = (
    <ModalLink
      text={item.pSpecification}
      index={index}
      handleAgendaModal={handleAgendaModal}
      dataTestId={`specification-modal-link1${index}`}
    />
  )

  const otherAssetNumberModel = (
    <ModalLink
      text={item.otherAssetNumber}
      index={index}
      handleAgendaModal={handleAgendaModal}
      dataTestId={`description-modal-link2${index}`}
    />
  )

  const locationPopUpModel = (
    <ModalLink
      text={item.location}
      index={index}
      handleAgendaModal={handleAgendaModal}
      dataTestId={`specification-modal-link${index}`}
    />
  )

  return (
    <>
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
        <ActionIcons setToggle={setToggle} historyItem={item} />
      </CTableRow>
    </>
  )
}

export default AssetListTableBody
