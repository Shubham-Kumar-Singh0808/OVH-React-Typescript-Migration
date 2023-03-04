import {
  CButton,
  CCol,
  CLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import OModal from '../../../../components/ReusableComponent/OModal'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { emptyString } from '../../../Achievements/AchievementConstants'
import { dottedContent } from '../KRAConstants'
import {
  DeleteKPIParams,
  IncomingKPIDataItem,
  KPIsTableProps,
  KRAPages,
} from '../../../../types/Performance/KRA/KRATypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'

type ModalContent = string | JSX.Element | JSX.Element[]

const KPIsTable = (props: KPIsTableProps): JSX.Element => {
  const { kraId } = props
  const dispatch = useAppDispatch()
  const kpiList = useTypedSelector(
    (state) => state.KRA.kpisForIndividualKRAList,
  )
  const currentQuery = useTypedSelector((state) => state.KRA.krasQuery)
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false)
  const [modalDescription, setModalDescription] =
    useState<ModalContent>(emptyString)

  const [deleteThisKPI, setDeleteThisKPI] = useState<number>()
  const [deleteKPIName, setDeleteKPIName] = useState('')
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToKPI = userAccessToFeatures?.find(
    (feature) => feature.name === 'KRA',
  )

  const descriptionHandler = (
    e: React.MouseEvent<HTMLElement>,
    content: ModalContent,
  ) => {
    e.preventDefault()
    setModalDescription(content)
    setModalVisible(true)
  }

  const modalContentCheck = (value: string | null) => {
    return value !== null ? value : 'N/A'
  }

  const deleteButtonHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    name: string,
  ) => {
    e.preventDefault()
    setIsDeleteModalVisible(true)
    setDeleteThisKPI(id)
    setDeleteKPIName(name)
  }

  const modalDeleteButtonHandler = async () => {
    if (deleteThisKPI) {
      const finalQ: DeleteKPIParams = {
        kraId,
        kpiId: deleteThisKPI,
      }
      const result = await dispatch(reduxServices.KRA.deleteKPIThunk(finalQ))
      const successMessage = (
        <OToast toastColor="success" toastMessage="KPI Deleted Successfully" />
      )
      if (reduxServices.KRA.deleteKPIThunk.fulfilled.match(result)) {
        setIsDeleteModalVisible(false)
        dispatch(reduxServices.app.actions.addToast(successMessage))
        dispatch(reduxServices.KRA.searchKRADataThunk(currentQuery))
        dispatch(reduxServices.KRA.kpisForIndividualKraThunk(kraId))
        setDeleteThisKPI(undefined)
      }
    }
  }

  const editKPIButtonHandler = (editKPI: IncomingKPIDataItem) => {
    console.log(editKPI)
    dispatch(reduxServices.KRA.actions.setCurrentOnScreenPage(KRAPages.editKPI))
    dispatch(reduxServices.KRA.actions.setEditKpi(editKPI))
  }

  return (
    <>
      <CTable
        responsive
        striped
        align="middle"
        className="mt-0 text-start profile-tab-table-size w-100 table-layout-fixed"
      >
        <CTableHead className="profile-tab-header">
          <CTableHeaderCell scope="col" className="profile-tab-content">
            #
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            KPI Name
          </CTableHeaderCell>
          <CTableHeaderCell
            colSpan={3}
            scope="col"
            className="profile-tab-content"
          >
            Description
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            Frequency
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            Target
          </CTableHeaderCell>
          <CTableHeaderCell
            scope="col"
            className="profile-tab-content text-center"
          >
            Actions
          </CTableHeaderCell>
        </CTableHead>
        <CTableBody>
          {kpiList &&
            kpiList?.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell scope="row" className="commentWidth">
                  <CLink
                    className="cursor-pointer text-primary centerAlignment-text"
                    data-testid={`kpi-Name-${index}`}
                    onClick={(e) => descriptionHandler(e, item.name)}
                  >
                    {dottedContent(item.name)}
                  </CLink>
                </CTableDataCell>
                {item.description !== null ? (
                  <CTableDataCell
                    colSpan={3}
                    scope="row"
                    className="commentWidth"
                  >
                    <CLink
                      className="cursor-pointer text-primary centerAlignment-text text-decoration-hover"
                      data-testid={`kpi-description-${index}`}
                      onClick={(e) =>
                        descriptionHandler(
                          e,
                          parse(modalContentCheck(item.description)),
                        )
                      }
                    >
                      {parse(dottedContent(item.description))}
                    </CLink>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell>N/A</CTableDataCell>
                )}
                {item.frequency !== null ? (
                  <CTableDataCell scope="row" className="commentWidth">
                    <CLink
                      className="cursor-pointer text-primary centerAlignment-text"
                      data-testid="kpi-Name"
                      onClick={(e) =>
                        descriptionHandler(e, modalContentCheck(item.frequency))
                      }
                    >
                      {item.frequency}
                    </CLink>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell>N/A</CTableDataCell>
                )}
                {item.target !== null ? (
                  <CTableDataCell scope="row" className="commentWidth">
                    <CLink
                      className="cursor-pointer text-primary centerAlignment-text"
                      data-testid="kpi-Name"
                      onClick={(e) =>
                        descriptionHandler(
                          e,
                          parse(modalContentCheck(item.target)),
                        )
                      }
                    >
                      {dottedContent(item.target)}
                    </CLink>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell>N/A</CTableDataCell>
                )}
                <CTableDataCell>
                  <div className="d-flex flex-row align-items-center justify-content-end">
                    <div className="button-events">
                      {userAccessToKPI?.updateaccess && (
                        <>
                          <CTooltip content="Edit">
                            <CButton
                              size="sm"
                              color="info"
                              className="btn-ovh me-1 btn-ovh-employee-list"
                              onClick={() => editKPIButtonHandler(item)}
                            >
                              <i
                                className="fa fa-pencil-square-o"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                          </CTooltip>
                        </>
                      )}
                      {userAccessToKPI?.deleteaccess && (
                        <>
                          <CTooltip content="Delete">
                            <CButton
                              size="sm"
                              color="danger"
                              className="btn-ovh me-1 btn-ovh-employee-list"
                              data-testid={`del-btn-${index}`}
                              onClick={(e) => {
                                deleteButtonHandler(e, item.id, item.name)
                              }}
                            >
                              <i
                                className="fa fa-trash-o"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                          </CTooltip>
                        </>
                      )}
                    </div>
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
      {!kpiList?.length && (
        <CCol className="text-start ms-4">
          <CRow>
            <h5>No Records Found... </h5>
          </CRow>
        </CCol>
      )}
      <OModal
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete KPI"
        modalBodyClass="mt-0"
        closeButtonClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={modalDeleteButtonHandler}
      >
        <>
          Do you want to delete this <strong>{deleteKPIName}</strong> ?
        </>
      </OModal>
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        visible={isModalVisible}
        setVisible={setModalVisible}
      >
        <div data-testid="modal-cnt-kpi">{modalDescription}</div>
      </OModal>
    </>
  )
}

export default KPIsTable
