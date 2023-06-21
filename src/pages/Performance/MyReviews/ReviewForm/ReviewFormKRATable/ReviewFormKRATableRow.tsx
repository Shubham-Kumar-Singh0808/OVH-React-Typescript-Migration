import React from 'react'
import { CTableDataCell, CTableRow } from '@coreui/react-pro'
import { IncomingMyReviewKRA } from '../../../../../types/Performance/MyReview/myReviewTypes'
import ReviewFormKPITable from '../ReviewFormKPITable/ReviewFormKPITable'
import {
  generateMyReviewTestId,
  initialMyReviewKRA,
} from '../../MyReviewHelpers'

const ReviewFormKRATableRow = ({
  kra,
  kraIndex,
  openedKRA,
  openedKRAHandler,
}: {
  kra: IncomingMyReviewKRA
  kraIndex: number
  openedKRA: IncomingMyReviewKRA
  openedKRAHandler: (
    e: React.MouseEvent<HTMLElement>,
    selectedKRA: IncomingMyReviewKRA,
  ) => void
}): JSX.Element => {
  return (
    <>
      <CTableRow data-testid="myReview-kraRow">
        <CTableDataCell>
          {openedKRA.id === kra.id ? (
            <i
              className="fa fa-minus-circle cursor-pointer"
              data-testid={generateMyReviewTestId(`kraClose-${kraIndex}`)}
              onClick={(e) => openedKRAHandler(e, initialMyReviewKRA)} // used to close the kpi table
            />
          ) : (
            <i
              className="fa fa-plus-circle cursor-pointer"
              data-testid={generateMyReviewTestId(`kraOpen-${kraIndex}`)}
              onClick={(e) => openedKRAHandler(e, kra)} // used to open this specific kra
            />
          )}
        </CTableDataCell>
        <CTableDataCell>{kra.name}</CTableDataCell>
        <CTableDataCell>{kra.designationKraPercentage}</CTableDataCell>
        <CTableDataCell>{kra.count}</CTableDataCell>
      </CTableRow>
      {openedKRA.id === kra.id && (
        <CTableRow color="light">
          <CTableDataCell colSpan={8}>
            <ReviewFormKPITable kpis={kra.kpis} kraId={kra.id} />
          </CTableDataCell>
        </CTableRow>
      )}
    </>
  )
}

export default ReviewFormKRATableRow
