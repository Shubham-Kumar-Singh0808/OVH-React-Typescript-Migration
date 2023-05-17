import React, { useState } from 'react'
import { CCol, CFormCheck, CRow } from '@coreui/react-pro'
import ReporteesAutoComplete from './ReporteesAutoComplete'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const ChangeReporteeFilterOptions = () => {
  const [isActive, setIsActive] = useState(true)
  const [autoCompleteTarget, setAutoCompleteTarget] = useState('')
  const [ShouldRenderTable, setShouldRenderTable] = useState<boolean>(false)
  const [placeHolder, setPlaceHolder] = useState<string>('Manager Name')

  const dispatch = useAppDispatch()

  const AllReportingManager = useTypedSelector(
    reduxServices.changeReportees.selectors.ReportingManagersDetails,
  )
  const AllHRList = useTypedSelector(
    reduxServices.changeReportees.selectors.HRListDetails,
  )
  const isLoading = useTypedSelector(
    reduxServices.changeReportees.selectors.isLoading,
  )

  const handleOnChange = (value: string) => {
    setAutoCompleteTarget('')
    dispatch(reduxServices.changeReportees.actions.clearManagerData())
    setShouldRenderTable(false)

    const isTrue = value.toLowerCase() === 'reportees'
    setIsActive(isTrue)
    if (isTrue) {
      setPlaceHolder('Manager Name')
    } else setPlaceHolder('Hr Name')
  }
  return (
    <>
      <CRow className="mb-3">
        <CCol sm={2}>
          <CFormCheck
            type="radio"
            name="Reportees"
            id="reportees"
            label="Reportees"
            checked={isActive}
            onChange={() => handleOnChange('reportees')}
          />
        </CCol>
        <CCol sm={2}>
          <CFormCheck
            type="radio"
            name="HR Associates"
            id="hrAssocaites"
            label="HR Associates"
            checked={!isActive}
            onChange={() => handleOnChange('hrReportees')}
          />
        </CCol>
      </CRow>
      {isActive ? (
        <ReporteesAutoComplete
          managersOrHrManagersList={AllReportingManager}
          placeHolder={placeHolder}
          autoCompleteTarget={autoCompleteTarget}
          setAutoCompleteTarget={setAutoCompleteTarget}
          shouldRenderTable={ShouldRenderTable}
          setShouldRenderTable={setShouldRenderTable}
        />
      ) : (
        <ReporteesAutoComplete
          managersOrHrManagersList={AllHRList}
          placeHolder={placeHolder}
          autoCompleteTarget={autoCompleteTarget}
          setAutoCompleteTarget={setAutoCompleteTarget}
          shouldRenderTable={ShouldRenderTable}
          setShouldRenderTable={setShouldRenderTable}
        />
      )}
    </>
  )
}

export default ChangeReporteeFilterOptions
