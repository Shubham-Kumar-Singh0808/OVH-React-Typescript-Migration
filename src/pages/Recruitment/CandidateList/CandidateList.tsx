import React, { useEffect, useState } from 'react'
import CandidateListTable from './CandidateListTable'
import CandidateListFilterOptions from './CandidateListFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'

const CandidateList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [selectStatus, setSelectStatus] = useState<string>('')
  const [selectTechnology, setSelectTechnology] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectCountry, setSelectCountry] = useState<string>('')

  const listSize = useTypedSelector(
    reduxServices.candidateList.selectors.listSize,
  )
  const CurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  useEffect(() => {
    if (CurrentPage) {
      setCurrentPage(CurrentPage)
    }
  }, [CurrentPage])

  console.log(selectCountry + '')

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(reduxServices.candidateList.getEmpCountries())
    dispatch(reduxServices.candidateList.getTechnology())
    dispatch(
      reduxServices.candidateList.searchScheduledCandidate({
        startIndex: pageSize * (CurrentPage - 1),
        endIndex: pageSize * CurrentPage,
        searchStr: searchInput,
      }),
    )
  }, [dispatch, pageSize, CurrentPage])

  const viewButtonHandler = () => {
    dispatch(
      reduxServices.candidateList.getCountryWiseCandidatesList({
        candidateStatus: selectStatus,
        startIndex: pageSize * (CurrentPage - 1),
        endIndex: pageSize * CurrentPage,
        selectionCountry: selectCountry,
        selectionTechnology: selectTechnology || '',
      }),
    )
    setCurrentPage(1)
    setPageSize(20)
  }

  const searchButtonHandler = () => {
    dispatch(
      reduxServices.candidateList.searchScheduledCandidate({
        startIndex: pageSize * (CurrentPage - 1),
        endIndex: pageSize * CurrentPage,
        searchStr: searchInput,
      }),
    )
  }
  const searchKeyDownButtonHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      if (searchInput === '') {
        dispatch(
          reduxServices.candidateList.searchScheduledCandidate({
            startIndex: pageSize * (CurrentPage - 1),
            endIndex: pageSize * CurrentPage,
            searchStr: searchInput,
          }),
        )
        setCurrentPage(1)
      } else {
        dispatch(
          reduxServices.candidateList.searchScheduledCandidate({
            startIndex: pageSize * (CurrentPage - 1),
            endIndex: pageSize * CurrentPage,
            searchStr: searchInput,
          }),
        )
      }
    }
  }

  const clearButtonHandler = () => {
    setSelectStatus('')
    setSelectTechnology('')
    setSelectCountry('')
    setSearchInput('')
    dispatch(
      reduxServices.candidateList.searchScheduledCandidate({
        startIndex: pageSize * (CurrentPage - 1),
        endIndex: pageSize * CurrentPage,
        searchStr: '',
      }),
    )
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Candidate List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CandidateListFilterOptions
          selectStatus={selectStatus}
          setSelectStatus={setSelectStatus}
          selectCountry={selectCountry}
          setSelectCountry={setSelectCountry}
          selectTechnology={selectTechnology}
          setSelectTechnology={setSelectTechnology}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchKeyDownButtonHandler={searchKeyDownButtonHandler}
          searchButtonHandler={searchButtonHandler}
          viewButtonHandler={viewButtonHandler}
          clearButtonHandler={clearButtonHandler}
        />
        <CandidateListTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
          searchInput={searchInput}
        />
      </OCard>
    </>
  )
}

export default CandidateList
