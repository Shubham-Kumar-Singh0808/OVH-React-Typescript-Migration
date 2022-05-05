import { useMemo, useState } from 'react'

type UsePaginationType = {
  paginationRange: number[]
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  currentPage: number
}

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}
export const usePagination = ({
  totalItemCount,
  customPageSize = 20,
}: {
  totalItemCount: number
  customPageSize: number
}): UsePaginationType => {
  const [pageSize, setPageSize] = useState(customPageSize)
  const [currentPage, setCurrentPage] = useState(1)

  const paginationRange = useMemo(() => {
    return range(1, Math.ceil(totalItemCount / pageSize))
  }, [totalItemCount, pageSize])

  return { paginationRange, setPageSize, setCurrentPage, pageSize, currentPage }
}
