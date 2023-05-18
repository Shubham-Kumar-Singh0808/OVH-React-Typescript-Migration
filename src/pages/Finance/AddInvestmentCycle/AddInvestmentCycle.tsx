import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddNewInvestmentCycle from './AddNewInvestmentCycle'
import InvestmentCycleTable from './InvestmentCycleTable'
import EditInvestmentCycle from './EditCycle/EditInvestmentCycle'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import {
  Cycle,
  ITDeclarationFormToggleType,
} from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const AddInvestmentCycle = (): JSX.Element => {
  const [editCycle, setEditCycle] = useState<Cycle>({
    active: false,
    cycleId: 0,
    cycleName: '',
    endDate: '',
    startDate: '',
  })
  const toggle = useTypedSelector(
    reduxServices.itDeclarationList.selectors.toggle,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.itDeclarationList.getCycles())
  }, [dispatch])

  const editCycleButtonHandler = (editCycleData: Cycle): void => {
    dispatch(
      reduxServices.itDeclarationList.actions.setToggle(
        ITDeclarationFormToggleType.editInvestmentCycle,
      ),
    )
    console.log(editCycleData)
    setEditCycle({
      active: editCycleData.active,
      cycleId: editCycleData.cycleId,
      cycleName: editCycleData.cycleName,
      endDate: editCycleData.endDate,
      startDate: editCycleData.startDate,
    })
  }

  return (
    <>
      {toggle === '' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Add Cycle"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                <Link to={`/itDeclarationList`}>
                  <CButton
                    color="info"
                    className="btn-ovh me-1"
                    data-testid="addCycle-back-btn"
                  >
                    <i className="fa fa-arrow-left  me-1"></i>Back
                  </CButton>
                </Link>
              </CCol>
            </CRow>
            <AddNewInvestmentCycle />
            <InvestmentCycleTable
              editCycleButtonHandler={editCycleButtonHandler}
            />
          </OCard>
        </>
      )}
      {toggle === 'editInvestmentCycle' && (
        <EditInvestmentCycle editCycle={editCycle} />
      )}
    </>
  )
}

export default AddInvestmentCycle
