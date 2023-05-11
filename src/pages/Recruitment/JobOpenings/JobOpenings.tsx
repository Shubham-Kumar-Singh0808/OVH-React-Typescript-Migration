import React, { useEffect, useState } from 'react'
import { CFormCheck, CButton, CFormInput, CInputGroup } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import JobOpeningsTable from './JobOpeningsTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const JobOpenings = (): JSX.Element => {
  const [selectRadioAction, setSelectRadioAction] = useState<string>('Open')
  const [searchInput, setSearchInput] = useState<string>('')

  const dispatch = useAppDispatch()

  const CurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  const listSize = useTypedSelector(
    reduxServices.jobVacancies.selectors.listSize,
  )

  useEffect(() => {
    if (CurrentPage) {
      setCurrentPage(CurrentPage)
    }
  }, [CurrentPage])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  const prepareObject = dispatch(
    reduxServices.jobVacancies.getAllJobVacancies({
      startIndex: pageSize * (currentPage - 1),
      endIndex: pageSize * currentPage,
      searchJobTitle: searchInput,
      status: selectRadioAction,
    }),
  )

  useEffect(() => {
    dispatch(
      reduxServices.jobVacancies.getAllJobVacancies({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        searchJobTitle: searchInput,
        status: selectRadioAction,
      }),
    )
    dispatch(reduxServices.jobVacancies.getAllTechnology())
  }, [currentPage, dispatch, pageSize, selectRadioAction])

  const handleSearchBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.jobVacancies.getAllJobVacancies({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          searchJobTitle: searchInput,
          status: selectRadioAction,
        }),
      )
    }
  }

  const multiSearchBtnHandler = () => prepareObject
  const onChangeHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectRadioAction(e.target.value)
    setCurrentPage(1)
    setPageSize(20)
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Job Openings"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <div className="mb-3 pull-right">
          <div className="d-inline">
            <>
              <CFormCheck
                type="radio"
                name="Open"
                value="Open"
                id="jobOpen"
                label="Open"
                inline
                checked={selectRadioAction === 'Open'}
                onChange={onChangeHandler}
              />
              <CFormCheck
                type="radio"
                name="Close"
                value="Close"
                id="jobClose"
                label="Close"
                inline
                checked={selectRadioAction === 'Close'}
                onChange={onChangeHandler}
              />
            </>
          </div>
          <div className="me-2 d-inline-block">
            <CInputGroup className="global-search me-0 justify-content-md-end">
              <CFormInput
                data-testid="searchField"
                placeholder="Multiple Search"
                aria-label="Multiple Search"
                aria-describedby="button-addon2"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value)
                }}
                onKeyDown={handleSearchBtn}
              />
              <CButton
                disabled={!searchInput}
                data-testid="multi-search-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="button-addon2"
                onClick={multiSearchBtnHandler}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>
          </div>

          <div className="d-inline ml15 pull-right">
            <Link to={'/addJobvacancies'}>
              <CButton color="info" className="text-white btn-ovh" size="sm">
                <i className="fa fa-plus me-1"></i>
                Add
              </CButton>
            </Link>
          </div>
        </div>
        <JobOpeningsTable
          paginationRange={paginationRange}
          setPageSize={setPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
          searchInput={searchInput}
          selectRadioAction={selectRadioAction}
        />
      </OCard>
    </>
  )
}

export default JobOpenings
