import {
  CButton,
  CLink,
  CTableDataCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React from 'react'
import parse from 'html-react-parser'
import KPIsTable from './KPIsTable'
import {
  KRAPages,
  KRATableDataItem,
  KRATableItemProps,
} from '../../../../types/Performance/KRA/KRATypes'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { dottedContent } from '../KRAConstants'

const KRATableItem = (props: KRATableItemProps): JSX.Element => {
  const {
    isIconVisible,
    setIsIconVisible,
    selectedKRA,
    selectedKRAId,
    setSelectedKRAId,
    setModalDescription,
    setModalVisible,
    setIsDeleteModalVisible,
    setDeleteThisKRA,
    setDeleteThisKRAName,
    setAddKPI,
  } = props

  const dispatch = useAppDispatch()
  type ModalContent = string | JSX.Element | JSX.Element[]
  const rowExpandHandler = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault()
    setSelectedKRAId(id)
    dispatch(reduxServices.KRA.kpisForIndividualKraThunk(id))
    setIsIconVisible(true)
  }

  const descriptionHandler = (
    e: React.MouseEvent<HTMLElement>,
    content: ModalContent,
  ) => {
    e.preventDefault()
    setModalDescription(content)
    setModalVisible(true)
  }

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToKRA = userAccessToFeatures?.find(
    (feature) => feature.name === 'KRA',
  )

  const deleteKRAButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsDeleteModalVisible(true)
    setDeleteThisKRA(selectedKRA.id)
    setDeleteThisKRAName(selectedKRA.name)
  }

  const editKRAButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(reduxServices.KRA.getDesignationThunk(selectedKRA.departmentId))
    dispatch(reduxServices.KRA.editThisKraThunk(selectedKRA.id))
    dispatch(reduxServices.KRA.actions.setCurrentOnScreenPage(KRAPages.editKra))
  }

  const addKPIButtonHandler = (addNewKPI: KRATableDataItem) => {
    dispatch(reduxServices.KRA.actions.setCurrentOnScreenPage(KRAPages.addKPI))
    setAddKPI(addNewKPI)
  }

  return (
    <>
      <>
        <CTableRow>
          <CTableDataCell scope="row">
            {isIconVisible && selectedKRAId === selectedKRA.id ? (
              <i
                data-testid="ic-expandIcon"
                className="fa fa-minus-circle cursor-pointer"
                onClick={() => setIsIconVisible(false)}
              />
            ) : (
              <i
                data-testid="ic-collapseIcon"
                className="fa fa-plus-circle cursor-pointer"
                onClick={(e) => rowExpandHandler(e, selectedKRA.id)}
              />
            )}
          </CTableDataCell>
          <CTableDataCell scope="row" className="commentWidth">
            <CLink
              className="cursor-pointer text-primary centerAlignment-text"
              data-testid="kra-Name"
              onClick={(e) => descriptionHandler(e, selectedKRA.name)}
            >
              {selectedKRA.name}
            </CLink>
          </CTableDataCell>
          <CTableDataCell scope="row">
            {selectedKRA.description !== null ? (
              <CLink
                className="cursor-pointer text-primary centerAlignment-text"
                data-testid="kra-description"
                onClick={(e) =>
                  descriptionHandler(e, selectedKRA.description as string)
                }
              >
                {parse(dottedContent(selectedKRA.description))}
              </CLink>
            ) : (
              'N/A'
            )}
          </CTableDataCell>
          <CTableDataCell scope="row" data-testid="dept-name">
            {selectedKRA.departmentName}
          </CTableDataCell>
          <CTableDataCell scope="row" data-testid="desig-name">
            {selectedKRA.designationName}
          </CTableDataCell>
          <CTableDataCell scope="row" data-testid="kra-percent">
            {selectedKRA.designationKraPercentage}%
          </CTableDataCell>
          <CTableDataCell scope="row" data-testid="kpi-cnt">
            {selectedKRA.count}
          </CTableDataCell>
          <CTableDataCell scope="row">
            <div className="d-flex flex-row align-items-center justify-content-end">
              <div className="button-events">
                {userAccessToKRA?.updateaccess && (
                  <>
                    <CTooltip content="Edit">
                      <CButton
                        size="sm"
                        color="info"
                        className="btn-ovh me-1 btn-ovh-employee-list"
                        data-testid={`edit-btn-kra-screen-${selectedKRA.id}`}
                        onClick={editKRAButtonHandler}
                      >
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                    </CTooltip>
                  </>
                )}
                {userAccessToKRA?.deleteaccess && (
                  <>
                    <CTooltip content="Delete">
                      <CButton
                        size="sm"
                        color="danger"
                        className="btn-ovh me-1 btn-ovh-employee-list"
                        data-testid={`del-btn-kra-${selectedKRA.id}`}
                        onClick={deleteKRAButtonHandler}
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                  </>
                )}
                {userAccessToKRA?.createaccess && (
                  <>
                    <CTooltip content="Add KPI">
                      <CButton
                        size="sm"
                        color="info"
                        className="btn-ovh btn-ovh-employee-list"
                        onClick={() => addKPIButtonHandler(selectedKRA)}
                      >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                  </>
                )}
              </div>
            </div>
          </CTableDataCell>
        </CTableRow>
        {selectedKRAId === selectedKRA.id && isIconVisible ? (
          <CTableRow style={{ backgroundColor: '#fff' }}>
            <CTableDataCell
              colSpan={8}
              data-testid="inner-table"
              style={{ backgroundColor: '#fff' }}
            >
              <KPIsTable kraId={selectedKRA.id} />
            </CTableDataCell>
          </CTableRow>
        ) : (
          <></>
        )}
      </>
    </>
  )
}

export default KRATableItem
