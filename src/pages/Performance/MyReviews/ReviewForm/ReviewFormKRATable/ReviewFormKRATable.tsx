import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import ReviewFormKRATableRow from './ReviewFormKRATableRow'
import {
  IncomingMyReviewAppraisalForm,
  IncomingMyReviewKRA,
} from '../../../../../types/Performance/MyReview/myReviewTypes'
import { initialMyReviewKRA } from '../../MyReviewHelpers'

const ReviewFormKRATable = ({
  appraisalForm,
}: {
  appraisalForm: IncomingMyReviewAppraisalForm
}): JSX.Element => {
  const [openedKRA, setOpenedKRA] =
    useState<IncomingMyReviewKRA>(initialMyReviewKRA)

  // used to select the kra to open kpis specific to that
  const openedKRAHandler = (
    e: React.MouseEvent<HTMLElement>,
    selectedKRA: IncomingMyReviewKRA,
  ) => {
    e.preventDefault()
    setOpenedKRA(selectedKRA)
  }

  return (
    <CTable responsive className="mt-3 align-middle">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col"></CTableHeaderCell>
          <CTableHeaderCell scope="col">KRA Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Weightage(%)</CTableHeaderCell>
          <CTableHeaderCell scope="col">No.of KPIs</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody color="secondary">
        {appraisalForm.kra?.map((kraItem, kraItemIndex) => (
          <ReviewFormKRATableRow
            kra={kraItem}
            kraIndex={kraItemIndex}
            key={kraItemIndex}
            openedKRA={openedKRA}
            openedKRAHandler={openedKRAHandler}
          />
        ))}
      </CTableBody>
    </CTable>
  )
}

export default ReviewFormKRATable
