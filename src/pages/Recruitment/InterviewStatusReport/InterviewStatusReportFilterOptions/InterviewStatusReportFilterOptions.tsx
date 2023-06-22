import { CCol, CFormLabel, CFormSelect, CButton } from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import CustomDateFilterOption from './CustomDateFilterOption'
import SearchFilterOption from './SearchFilterOption'
import FilterOptionsButtons from './FilterOptionsButtons'
import ExportButtons from './ExportButtons'
import {
  initialTechnology,
  initialCountry,
  candidateStatusMapping,
  candidateSelectionStatusList,
  isOneOfTheCheckBoxChecked,
  isDateNotFilledWithCustom,
  getInterviewStatusReportTestId,
} from '../InterviewStatusReportHelpers'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { OutgoingCandidateSelectionStatusEnum } from '../../../../types/Recruitment/InterviewStatusReport/InterviewStatusReportTypes'

const InterviewStatusReportFilterOptions = ({
  setCurrentPage,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const allEmpCountries = useTypedSelector(
    (state) => state.interviewStatusReport.allEmpCountries,
  )
  const allTechnology = useTypedSelector(
    (state) => state.interviewStatusReport.allTechnology,
  )
  // the values of the filter options
  const filterOptions = useTypedSelector(
    (state) => state.interviewStatusReport.filterOptions,
  )
  const interviewStatusReportListLength = useTypedSelector(
    (state) => state.interviewStatusReport.interviewStatusReportList.size,
  )

  // view and clear button disable attribute
  const [IsViewBtnEnabled, setIsViewBtnEnabled] = useState<boolean>(false)
  const [isClearBtnEnabled, setIsClearBtnEnabled] = useState<boolean>(false)
  const [isSearchButtonEnabled, setIsSearchButtonEnabled] =
    useState<boolean>(false)

  const selectionStatusChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(
      reduxServices.interviewStatusReport.actions.setSelectionStatusInFilter(
        e.target.value,
      ),
    )
  }

  const candidateStateChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(
      reduxServices.interviewStatusReport.actions.setCandidateStatusInFilter(
        e.target.value,
      ),
    )
  }

  const selectionTechnologyChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(
      reduxServices.interviewStatusReport.actions.setSelectionTechnologyInFilter(
        e.target.value,
      ),
    )
  }

  const selectionCountryChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(
      reduxServices.interviewStatusReport.actions.setSelectionCountryInFilter(
        e.target.value,
      ),
    )
  }

  // shows red asterix if true
  const selectionStatusAsterix = useMemo(() => {
    return filterOptions.selectionStatus === ''
  }, [filterOptions.selectionStatus])

  //writing condition for enabling and disabling of the view and clear button
  useEffect(() => {
    if (selectionStatusAsterix) {
      setIsViewBtnEnabled(false)
    } else {
      // if option selected is custom
      if (isDateNotFilledWithCustom(filterOptions)) {
        setIsViewBtnEnabled(false)
        return
      }
      setIsViewBtnEnabled(true)
    }
  }, [selectionStatusAsterix, filterOptions])

  // condition for enabling or disabling the clear button
  useEffect(() => {
    if (selectionStatusAsterix) {
      setIsClearBtnEnabled(false)
    } else {
      setIsClearBtnEnabled(true)
    }
  }, [selectionStatusAsterix])

  //condition for enabling and disabling of the search button
  useEffect(() => {
    if (
      isOneOfTheCheckBoxChecked(filterOptions) &&
      !selectionStatusAsterix &&
      filterOptions.searchByCandidateName.trim().length > 0
    ) {
      setIsSearchButtonEnabled(true)
    } else {
      setIsSearchButtonEnabled(false)
    }
  }, [filterOptions, selectionStatusAsterix])

  return (
    <>
      <div className="d-flex flex-row align-items-center gap-5">
        <CCol sm={5}>
          <div className="d-flex flex-row align-items-center">
            <CFormLabel className="me-3">
              Select:{' '}
              <span className={selectionStatusAsterix ? TextDanger : TextWhite}>
                *
              </span>
            </CFormLabel>
            <CCol sm={4} className="me-3">
              <CFormSelect
                value={filterOptions.selectionStatus}
                onChange={selectionStatusChangeHandler}
                data-testid={getInterviewStatusReportTestId(
                  'selectionStatusSel',
                )}
              >
                <option value="">Select Date</option>
                {candidateSelectionStatusList.map((dateItem, dateItemIndex) => (
                  <option key={dateItemIndex} value={dateItem}>
                    {dateItem}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol sm={4}>
              <CFormSelect
                value={filterOptions.candidateStatus}
                onChange={candidateStateChangeHandler}
                data-testid={getInterviewStatusReportTestId(
                  'candidateStatusSel',
                )}
              >
                {Object.entries(candidateStatusMapping)?.map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </div>
        </CCol>
        <CCol sm={3}>
          <div className="d-flex flex-row align-items-center">
            <CFormLabel className="me-2">Technology:</CFormLabel>
            <CCol sm={7}>
              <CFormSelect
                value={filterOptions.selectionTechnology}
                onChange={selectionTechnologyChangeHandler}
                data-testid={getInterviewStatusReportTestId(
                  'selectionTechnologySel',
                )}
              >
                <option value={''}>{initialTechnology.name}</option>
                {allTechnology?.map(
                  (thisTechnologyItem, thisTechnologyIndex) => (
                    <option
                      key={thisTechnologyIndex}
                      value={thisTechnologyItem.name}
                    >
                      {thisTechnologyItem.name}
                    </option>
                  ),
                )}
              </CFormSelect>
            </CCol>
          </div>
        </CCol>
        <div className="d-flex flex-row align-items-center">
          <CFormLabel className="me-2">Country:</CFormLabel>
          <div className="d-flex flex-column mt-4">
            <CFormSelect
              value={filterOptions.selectionCountry}
              onChange={selectionCountryChangeHandler}
              data-testid={getInterviewStatusReportTestId(
                'selectionCountrySel',
              )}
            >
              <option value="">{initialCountry.name}</option>
              {allEmpCountries?.map((empCountry, empCountryIndex) => (
                <option key={empCountryIndex} value={empCountry.id}>
                  {empCountry.name}
                </option>
              ))}
            </CFormSelect>
            <CButton className="btn-ovh mt-1" color="info">
              <i className="fa fa-eye me-1"></i>
              View Status Chart
            </CButton>
          </div>
        </div>
      </div>
      {interviewStatusReportListLength > 0 && <ExportButtons />}
      {
        // only when custom option is selected
        filterOptions.selectionStatus ===
          OutgoingCandidateSelectionStatusEnum.custom.toString() && (
          <CustomDateFilterOption />
        )
      }
      <FilterOptionsButtons
        IsViewBtnEnabled={IsViewBtnEnabled}
        setCurrentPage={setCurrentPage}
        isClearBtnEnabled={isClearBtnEnabled}
      />
      <SearchFilterOption
        isSearchButtonEnabled={isSearchButtonEnabled}
        setCurrentPage={setCurrentPage}
      />
    </>
  )
}

export default InterviewStatusReportFilterOptions
