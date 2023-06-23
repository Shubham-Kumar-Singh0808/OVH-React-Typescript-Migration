import { CCol, CFormInput, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import SearchFormCheck from './SearchFormCheck'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { CandidateCheckBoxFilterEnum } from '../../../../types/Recruitment/InterviewStatusReport/InterviewStatusReportTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import {
  getInterviewStatusReportTestId,
  isOneOfTheCheckBoxChecked,
} from '../InterviewStatusReportHelpers'

const SearchFilterOption = ({
  isSearchButtonEnabled,
  setCurrentPage,
}: {
  isSearchButtonEnabled: boolean
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const filterOptions = useTypedSelector(
    (state) => state.interviewStatusReport.filterOptions,
  )

  const [isSearchInputReadonly, setIsSearchInputReadonly] =
    useState<boolean>(true)

  const searchByCandidateNameChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(
      reduxServices.interviewStatusReport.actions.setSearchByCandidateNameInFilter(
        e.target.value,
      ),
    )
  }

  const getLatestData = () => {
    dispatch(
      reduxServices.interviewStatusReport.getInterviewStatusReportThunk(
        filterOptions,
      ),
    )
    setCurrentPage(1)
  }

  const searchInputKeyUpHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      getLatestData()
    }
  }

  const searchButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    getLatestData()
  }

  // if either of the 4 checkboxes are ticked, user can write text input
  useEffect(() => {
    if (isOneOfTheCheckBoxChecked(filterOptions)) {
      setIsSearchInputReadonly(false)
    } else {
      setIsSearchInputReadonly(true)
    }
  }, [
    filterOptions.searchByExperience,
    filterOptions.searchByMultipleFlag,
    filterOptions.searchByRecruiterName,
    filterOptions.searchBySourceName,
  ])

  return (
    <div className="d-flex flex-column align-items-end">
      <div className="d-flex flex-column">
        <SearchFormCheck
          label={CandidateCheckBoxFilterEnum.searchByExperience}
          isChecked={filterOptions.searchByExperience}
        />
        <SearchFormCheck
          label={CandidateCheckBoxFilterEnum.multipleSearch}
          isChecked={filterOptions.searchByMultipleFlag}
        />
        <SearchFormCheck
          label={CandidateCheckBoxFilterEnum.searchByRecruiterName}
          isChecked={filterOptions.searchByRecruiterName}
        />
        <SearchFormCheck
          label={CandidateCheckBoxFilterEnum.searchBySourceName}
          isChecked={filterOptions.searchBySourceName}
        />
      </div>
      <CCol sm={2} className="d-flex flex-row align-items-center">
        <CFormInput
          placeholder="Multiple Search"
          onChange={searchByCandidateNameChangeHandler}
          value={filterOptions.searchByCandidateName}
          readOnly={isSearchInputReadonly}
          onKeyUp={searchInputKeyUpHandler}
          data-testid={getInterviewStatusReportTestId('searchInput')}
        />
        <CButton
          className="btn-ovh cursor-pointer"
          color="info"
          disabled={!isSearchButtonEnabled}
          onClick={searchButtonHandler}
          data-testid={getInterviewStatusReportTestId('searchBtn')}
        >
          <i className="fa fa-search"></i>
        </CButton>
      </CCol>
    </div>
  )
}

export default SearchFilterOption
