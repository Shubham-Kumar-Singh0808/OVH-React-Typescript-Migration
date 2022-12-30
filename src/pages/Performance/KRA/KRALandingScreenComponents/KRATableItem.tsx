import { CButton, CLink, CTableDataCell, CTableRow } from '@coreui/react-pro'
import React from 'react'
import parse from 'html-react-parser'
import KPIsTable from './KPIsTable'
import { KRATableItemProps } from '../../../../types/Performance/KRA/KRATypes'
import { useAppDispatch } from '../../../../stateStore'
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
  } = props
  const dispatch = useAppDispatch()
  const rowExpandHandler = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault()
    setSelectedKRAId(id as number)
    dispatch(reduxServices.KRA.kpisForIndividualKraThunk(id))
    setIsIconVisible(true)
  }

  const descriptionClickHandler = (
    e: React.MouseEvent<HTMLElement>,
    content: string | null,
  ) => {
    if (content === null) {
      return
    }
    setModalDescription(content)
    setModalVisible(true)
  }

  return (
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
        <CTableDataCell scope="row">
          {selectedKRA.departmentName}
        </CTableDataCell>
        <CTableDataCell scope="row">
          {selectedKRA.designationName}
        </CTableDataCell>
        <CTableDataCell scope="row">
          {selectedKRA.designationKraPercentage}%
        </CTableDataCell>
        <CTableDataCell scope="row">{selectedKRA.count}</CTableDataCell>
        <CTableDataCell scope="row">
          <div className="d-flex flex-row align-items-center justify-content-end">
            <div className="button-events">
              <CButton
                size="sm"
                color="info"
                className="btn-ovh me-1"
                title="Edit"
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </CButton>
              <CButton
                size="sm"
                color="danger"
                className="btn-ovh me-1"
                title="Delete"
              >
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </CButton>
              <CButton
                size="sm"
                color="info"
                className="btn-ovh"
                title="Add KPI"
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </CButton>
            </div>
          </div>
        </CTableDataCell>
      </CTableRow>
      {selectedKRAId === selectedKRA.id && isIconVisible ? (
        <CTableRow>
          <CTableDataCell colSpan={10}>
            <KPIsTable />
          </CTableDataCell>
        </CTableRow>
      ) : (
        <></>
      )}
    </>
  )
}

export default KRATableItem
