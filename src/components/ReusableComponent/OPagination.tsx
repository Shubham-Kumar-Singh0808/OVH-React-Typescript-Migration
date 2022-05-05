import { CPagination, CPaginationItem } from '@coreui/react-pro'

import React from 'react'

const OPagination = ({
  currentPage,
  pageSetter,
  paginationRange,
}: {
  currentPage: number
  pageSetter: React.Dispatch<React.SetStateAction<number>>
  paginationRange: number[]
}): JSX.Element => {
  const handleNextPage = () => {
    pageSetter(currentPage + 1)
  }

  const handlePreviousPage = () => {
    pageSetter(currentPage - 1)
  }

  const handleFirstPage = () => {
    pageSetter(1)
  }

  const handleLastPage = () => {
    pageSetter(paginationRange[paginationRange.length - 1])
  }

  const handleSelectPage = (pageNumber: number) => {
    pageSetter(pageNumber)
  }

  return (
    <CPagination>
      <CPaginationItem disabled={currentPage === 1} onClick={handleFirstPage}>
        &laquo; First
      </CPaginationItem>
      <CPaginationItem
        disabled={currentPage === 1}
        onClick={handlePreviousPage}
      >
        &lt; Prev
      </CPaginationItem>
      {paginationRange.map((pageNumber, index) => {
        return (
          <CPaginationItem
            key={index}
            active={currentPage === pageNumber}
            onClick={() => handleSelectPage(pageNumber)}
          >
            {pageNumber}
          </CPaginationItem>
        )
      })}
      <CPaginationItem
        onClick={handleNextPage}
        disabled={currentPage === paginationRange[paginationRange.length - 1]}
      >
        Next &gt;
      </CPaginationItem>
      <CPaginationItem
        disabled={currentPage === paginationRange[paginationRange.length - 1]}
        onClick={handleLastPage}
      >
        Last &raquo;
      </CPaginationItem>
    </CPagination>
  )
}

export default OPagination
