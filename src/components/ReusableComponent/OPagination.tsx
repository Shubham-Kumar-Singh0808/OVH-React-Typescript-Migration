import { CPagination, CPaginationItem } from '@coreui/react-pro'
import React, { useMemo } from 'react'
import { reduxServices } from '../../reducers/reduxServices'
import { useAppDispatch } from '../../stateStore'

const OPagination = ({
  currentPage,
  pageSetter,
  paginationRange,
}: {
  currentPage: number
  pageSetter: React.Dispatch<React.SetStateAction<number>>
  paginationRange: number[]
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const persistCurrentPage = (pageNumber: number) => {
    dispatch(reduxServices.app.actions.setPersistCurrentPage(pageNumber))
  }

  const handleNextPage = () => {
    pageSetter(currentPage + 1)
    persistCurrentPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    pageSetter(currentPage - 1)
    persistCurrentPage(currentPage - 1)
  }

  const handleFirstPage = () => {
    pageSetter(1)
    persistCurrentPage(1)
  }

  const handleLastPage = () => {
    pageSetter(paginationRange[paginationRange.length - 1])
    persistCurrentPage(paginationRange[paginationRange.length - 1])
  }

  const handleSelectPage = (pageNumber: number) => {
    pageSetter(pageNumber)
    persistCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  const paginationItems = useMemo(() => {
    if (paginationRange.length < 6) {
      return paginationRange
    }

    if (paginationRange.includes(currentPage + 4)) {
      return paginationRange.slice(currentPage - 1, currentPage + 4)
    } else {
      return paginationRange.slice(
        paginationRange.length - 5,
        paginationRange.length,
      )
    }
  }, [currentPage, paginationRange])

  return (
    <CPagination>
      <CPaginationItem
        disabled={currentPage === 1}
        onClick={handleFirstPage}
        data-testid="first-page"
      >
        &laquo; First
      </CPaginationItem>
      <CPaginationItem
        disabled={currentPage === 1}
        onClick={handlePreviousPage}
        data-testid="prev-page"
      >
        &#8249; Prev
      </CPaginationItem>
      {paginationItems.map((pageNumber, index) => {
        return (
          <CPaginationItem
            key={index}
            active={currentPage === pageNumber}
            onClick={() => handleSelectPage(pageNumber)}
            data-testid="page-number"
          >
            {pageNumber}
          </CPaginationItem>
        )
      })}
      <CPaginationItem
        onClick={handleNextPage}
        disabled={currentPage === paginationRange[paginationRange.length - 1]}
        data-testid="next-page"
      >
        Next &#8250;
      </CPaginationItem>
      <CPaginationItem
        disabled={currentPage === paginationRange[paginationRange.length - 1]}
        onClick={handleLastPage}
        data-testid="last-page"
      >
        Last &raquo;
      </CPaginationItem>
    </CPagination>
  )
}

export default OPagination
