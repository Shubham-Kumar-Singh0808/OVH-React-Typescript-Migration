import { CButton, CLink, CTableDataCell, CTableRow } from '@coreui/react-pro'
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

const KRATableItem = (props: KRATableItemProps): JSX.Element => {
  const {
    isIconVisible,
    setIsIconVisible,
    selectedKRA,
    selectedKRAId,
    setSelectedKRAId,
    setModalDescription,
    setModalVisible,
    setDeleteThisKRA,
    setAddKPI,
  } = props

  const dispatch = useAppDispatch()

  const rowExpandHandler = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault()
    setSelectedKRAId(id)
    dispatch(reduxServices.KRA.kpisForIndividualKraThunk(id))
    setIsIconVisible(true)
  }

  const descriptionClickHandler = (
    e: React.MouseEvent<HTMLElement>,
    content: string | null,
  ) => {
    e.preventDefault()
    if (content === null) {
      return
    }
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
    setModalDescription('Do you want to delete this ' + selectedKRA.name + '?')
    setModalVisible(true)

    setDeleteThisKRA(selectedKRA.id)
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
    console.log(addNewKPI)
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
              onClick={(e) => descriptionClickHandler(e, selectedKRA.name)}
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
                  descriptionClickHandler(e, selectedKRA.description)
                }
              >
                {parse(selectedKRA.description)}
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
                  <CButton
                    size="sm"
                    color="info"
                    className="btn-ovh me-1 btn-ovh-employee-list"
                    data-testid={`edit-btn-kra-screen-${selectedKRA.id}`}
                    title="Edit"
                    onClick={editKRAButtonHandler}
                  >
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </CButton>
                )}
                {userAccessToKRA?.deleteaccess && (
                  <CButton
                    size="sm"
                    color="danger"
                    className="btn-ovh me-1 btn-ovh-employee-list"
                    title="Delete"
                    data-testid={`del-btn-kra-${selectedKRA.id}`}
                    onClick={deleteKRAButtonHandler}
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </CButton>
                )}
                {userAccessToKRA?.createaccess && (
                  <CButton
                    size="sm"
                    color="info"
                    className="btn-ovh btn-ovh-employee-list"
                    title="Add KPI"
                    onClick={() => addKPIButtonHandler(selectedKRA)}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </CButton>
                )}
              </div>
            </div>
          </CTableDataCell>
        </CTableRow>
        {selectedKRAId === selectedKRA.id && isIconVisible ? (
          <CTableRow>
            <CTableDataCell colSpan={10} data-testid="inner-table">
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
