import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTooltip,
  CButton,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { Cycle } from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const InvestmentCycleTable = ({
  editCycleButtonHandler,
}: {
  editCycleButtonHandler: (editCycleData: Cycle) => void
}): JSX.Element => {
  const [isDeleteCycleModalVisible, setIsDeleteCycleModalVisible] =
    useState(false)
  const [toDeleteInvestmentCycleName, setToDeleteInvestmentCycleName] =
    useState('')
  const [investmentCycleId, setInvestmentCycleId] = useState(0)

  const investmentCycles = useTypedSelector(
    reduxServices.itDeclarationList.selectors.cycles,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToCyleActions = userAccessToFeatures?.find(
    (feature) => feature.name === 'Add Section and Investment',
  )
  const dispatch = useAppDispatch()
  const handleShowCycleDeleteModal = (id: number, cycleName: string) => {
    setInvestmentCycleId(id)
    setToDeleteInvestmentCycleName(cycleName)
    setIsDeleteCycleModalVisible(true)
  }

  const toastElement = (
    <OToast toastColor="success" toastMessage="Cycle Deleted Successfully." />
  )

  const handleConfirmDeleteCycle = async () => {
    setIsDeleteCycleModalVisible(false)

    const deleteCycleResultAction = await dispatch(
      reduxServices.itDeclarationList.deleteCycle(investmentCycleId),
    )
    if (
      reduxServices.itDeclarationList.deleteCycle.fulfilled.match(
        deleteCycleResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
      dispatch(reduxServices.itDeclarationList.getCycles())
    }
  }

  return (
    <>
      <CTable striped responsive className="mt-5 align-middle alignment">
        <CTableHead>
          <CTableRow className="text-start">
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Cycle Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Year</CTableHeaderCell>
            <CTableHeaderCell scope="col">End Year</CTableHeaderCell>
            <CTableHeaderCell scope="col">Active</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {investmentCycles?.map((cycle, index) => {
            return (
              <CTableRow key={index} className="text-start">
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{cycle.cycleName}</CTableDataCell>
                <CTableDataCell>{cycle.startDate}</CTableDataCell>
                <CTableDataCell>{cycle.endDate}</CTableDataCell>
                <CTableDataCell>
                  {cycle.active === true ? 'Active' : 'Inactive'}
                </CTableDataCell>
                <CTableDataCell>
                  {userAccessToCyleActions?.updateaccess && (
                    <CTooltip content="Edit">
                      <CButton
                        size="sm"
                        className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                        color="info btn-ovh me-1"
                        data-testid={`cycle-btn-edit${index}`}
                        onClick={() =>
                          editCycleButtonHandler({
                            active: cycle.active,
                            cycleId: cycle.cycleId,
                            cycleName: cycle.cycleName,
                            endDate: cycle.endDate,
                            startDate: cycle.startDate,
                          })
                        }
                      >
                        <i className="fa fa-edit" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                  )}
                  {userAccessToCyleActions?.deleteaccess && (
                    <CTooltip content="Delete">
                      <CButton
                        data-testid={`cycle-btn-delete${index}`}
                        size="sm"
                        color="danger btn-ovh me-1"
                        className="btn-ovh-employee-list"
                        onClick={() =>
                          handleShowCycleDeleteModal(
                            cycle.cycleId,
                            cycle.cycleName,
                          )
                        }
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                  )}
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <OModal
        visible={isDeleteCycleModalVisible}
        setVisible={setIsDeleteCycleModalVisible}
        modalTitle="Delete Investment Cycle"
        modalBodyClass="mt-0"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmDeleteCycle}
      >
        <>
          Do you really want to delete this{' '}
          <strong>{toDeleteInvestmentCycleName}</strong> Cycle?
        </>
      </OModal>
    </>
  )
}

export default InvestmentCycleTable
