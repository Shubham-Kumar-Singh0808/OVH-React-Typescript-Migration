import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CRow, CCol, CInputGroup, CFormInput, CButton } from '@coreui/react-pro'
import UpComingJoinListTable from './UpComingJoinListTable'
import { reduxServices } from '../../../reducers/reduxServices'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { usePagination } from '../../../middleware/hooks/usePagination'

const UpComingJoinList = (): JSX.Element => {
  const comingJoin = useTypedSelector(
    reduxServices.upComingJoinList.selectors.upComingJoinList,
  )
  const [searchInput, setSearchInput] = useState<string>('')

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      reduxServices.upComingJoinList.getUpConingJoinList({
        startIndex: 0,
        endIndex: 20,
        searchName: '',
      }),
    )
  }, [dispatch])

  console.log(comingJoin)

  const listSize = useTypedSelector(
    reduxServices.upComingJoinList.selectors.listSize,
  )

  const CurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
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

  const searchButtonHandlerOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatch(
        reduxServices.upComingJoinList.getUpConingJoinList({
          startIndex: 0,
          endIndex: 20,
          searchName: searchInput,
        }),
      )
      setCurrentPage(1)
      setPageSize(20)
    }
  }

  const searchButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      reduxServices.upComingJoinList.getUpConingJoinList({
        startIndex: 0,
        endIndex: 20,
        searchName: searchInput,
      }),
    )
    setCurrentPage(1)
    setPageSize(20)
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Upcoming Joinees"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="gap-2 d-md-flex justify-content-md-end">
          <CCol sm={3} md={3}>
            <CInputGroup className="global-search me-0 justify-content-md-end">
              <CFormInput
                data-testid="searchField"
                placeholder="Search by name"
                aria-label="Multiple Search"
                aria-describedby="button-addon2"
                id="searchInput"
                name="searchInput"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value)
                }}
                onKeyDown={searchButtonHandlerOnKeyDown}
              />
              <CButton
                disabled={!searchInput}
                data-testid="multi-search-btn"
                className="cursor-pointer"
                type="button"
                color="info"
                id="button-addon2"
                onClick={searchButtonHandler}
              >
                <i className="fa fa-search"></i>
              </CButton>
            </CInputGroup>

            <CCol xs={12} md={8} className="px-0 text-end">
              <CButton
                size="sm"
                color="info"
                className="btn-ovh me-1"
                data-testid="export-btn"
                // onClick={handleExportUpComingJoinList }
              >
                + Click To Export
              </CButton>
            </CCol>
          </CCol>
        </CRow>

        <UpComingJoinListTable
          paginationRange={paginationRange}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </OCard>
    </>
  )
}

export default UpComingJoinList
