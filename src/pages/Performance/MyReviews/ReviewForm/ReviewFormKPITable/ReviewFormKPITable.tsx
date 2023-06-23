import {
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import ReviewFormKPITableRow from './ReviewFormKPITableRow'
import ManagerColumns from './ManagerColumns'
import { MyReviewKPI } from '../../../../../types/Performance/MyReview/myReviewTypes'
import { sortKPIByAlphabeticalOrder } from '../../MyReviewHelpers'

const ReviewFormKPITable = ({
  kpis,
  kraId,
}: {
  kpis: MyReviewKPI[]
  kraId: number
}): JSX.Element => {
  return (
    <CTable responsive striped align="middle">
      <CTableHead className="profile-tab-header">
        <CTableRow>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            #
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            KPI Name
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            Self Rating
          </CTableHeaderCell>
          <CTableHeaderCell scope="col" className="profile-tab-content">
            Comments
          </CTableHeaderCell>
          <ManagerColumns />
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {sortKPIByAlphabeticalOrder(kpis)?.map((kpi, kpiIndex) => (
          <ReviewFormKPITableRow
            key={kpiIndex}
            kpi={kpi}
            kpiIndex={kpiIndex}
            kraId={kraId}
          />
        ))}
      </CTableBody>
    </CTable>
  )
}

export default ReviewFormKPITable
