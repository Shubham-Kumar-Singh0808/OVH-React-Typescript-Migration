import {
  CButton,
  CCol,
  CContainer,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import NomineeListApi from '../../../middleware/api/Achievements/NomineeList/NomineeListApi'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { NomineeCycleType } from '../../../types/Achievements/commonAchievementTypes'
import { NomineeFilterCycleProps } from '../../../types/Achievements/NomineeList/NomineeListTypes'
import { downloadFile } from '../../../utils/helper'
import { notFoundNumber, selectCycle } from '../AchievementConstants'

const getCycleId = (cycleList: NomineeCycleType[], itemName: string) => {
  const cycleId = cycleList.find((item) => item.cycleName === itemName)
  if (!cycleId) {
    return notFoundNumber
  }
  return cycleId.id
}

const NomineeListCycleFilter = (
  props: NomineeFilterCycleProps,
): JSX.Element => {
  const { currentCycle, setCurrentCycle } = props
  const dispatch = useAppDispatch()
  const nomineeCycles = useTypedSelector(
    (state) => state.nomineeList.cyclesList,
  )

  const cycleChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCycle(e.target.value)
  }

  const exportCurrentCycleNomineeList = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault()
    const csvFile = await NomineeListApi.exportNomineeList(
      getCycleId(nomineeCycles.list, currentCycle),
    )
    downloadFile(csvFile, 'exportNomineesList.csv')
  }

  useEffect(() => {
    dispatch(
      reduxServices.nomineeList.getNominationsThunk(
        getCycleId(nomineeCycles.list, currentCycle),
      ),
    )
  }, [currentCycle])

  return (
    <>
      <CContainer className="mt-2 mb-4">
        <CRow>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-1">Cycle:</CFormLabel>
          </CCol>
          <CCol xs={12} md={3}>
            <CFormSelect
              size="sm"
              data-testid="cycle-sel"
              value={currentCycle}
              onChange={cycleChangeHandler}
            >
              <option data-testid="cycle-opt" value={selectCycle}>
                {selectCycle}
              </option>
              {nomineeCycles.list.map((item, index) => (
                <option
                  data-testid="cycle-opt"
                  key={index}
                  value={item.cycleName}
                >
                  {item.cycleName}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol xs={12} md={8} className="px-0 text-end">
            <CButton
              size="sm"
              color="info"
              className="btn-ovh me-1"
              data-testid="export-btn"
              onClick={exportCurrentCycleNomineeList}
            >
              + Click To Export
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default NomineeListCycleFilter
