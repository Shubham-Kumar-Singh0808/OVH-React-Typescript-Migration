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
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

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

const AssetListTableBody = ({
  item,
  index,
  handleAgendaModal,
  getItemNumber,
  setToggle,
  setEditAddAssetList,
}: {
  item: AllAssetsList
  index: number
  getItemNumber: (index: number) => number
  handleAgendaModal: (appraisalCycleSpecification: string) => void
  setToggle: React.Dispatch<React.SetStateAction<string>>
  setEditAddAssetList: React.Dispatch<React.SetStateAction<AllAssetsList>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
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
  const ActionIcons = () => {
    return (
      <CTableDataCell data-testid="action-cell">
        <div className="sh-btn-group">
          <CTooltip content="Edit">
            <CButton
              color="info"
              size="sm"
              className="mb-1"
              onClick={onClickHandler}
            >
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
  }

  const onClickHandler = () => {
    setToggle('EditAssetList')
    setEditAddAssetList(item)
    dispatch(reduxServices.addNewProduct.getProductTypeList(item.productId))
    dispatch(reduxServices.addNewProduct.getAssetTypeList(item.assetTypeId))
  }

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
        <ActionIcons />
      </CTableRow>
    </>
  )
}

export default AssetListTableBody
