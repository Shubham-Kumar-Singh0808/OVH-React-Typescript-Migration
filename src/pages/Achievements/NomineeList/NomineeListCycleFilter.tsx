import {
  CButton,
  CCol,
  CContainer,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { NomineeCycleType } from '../../../types/Achievements/commonAchievementTypes'
import { NomineeFilterCycleProps } from '../../../types/Achievements/NomineeList/NomineeListTypes'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { notFoundNumber, selectCycle } from '../AchievementConstants'

const getCycleId = (cycleList: NomineeCycleType[], itemName: string) => {
  const cycleId = cycleList.find((item) => item.cycleName === itemName)
  if (!cycleId) {
    return notFoundNumber
  }
  return cycleId.id
}

const NomineeListCycleFilter = (props: NomineeFilterCycleProps) => {
  const { currentCycle, setCurrentCycle } = props
  const dispatch = useAppDispatch()
  const nomineeCycles = useTypedSelector(
    (state) => state.nomineeList.cyclesList,
  )

  const cycleChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCycle(e.target.value)
  }
  const isLoading = useTypedSelector((state) => state.nomineeList.isLoading)

  console.log(currentCycle)

  useEffect(() => {
    dispatch(
      reduxServices.nomineeList.getNominationsThunk(
        getCycleId(nomineeCycles.list, currentCycle),
      ),
    )
  }, [currentCycle])

  return (
    <>
      {isLoading === ApiLoadingState.loading ? (
        <OLoadingSpinner type={LoadingType.PAGE} />
      ) : (
        <>
          <CContainer className="mt-4 ms-1 mb-4">
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
                  <option value={selectCycle}>{selectCycle}</option>
                  {nomineeCycles.list.map((item, index) => (
                    <option key={index} value={item.cycleName}>
                      {item.cycleName}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs={12} md={8} className="px-0 text-end">
                <CButton size="sm" color="info" className="btn-ovh me-1">
                  + Click To Export
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </>
      )}
    </>
  )
}

export default NomineeListCycleFilter
