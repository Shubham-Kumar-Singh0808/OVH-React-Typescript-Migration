import React from 'react'
import parse from 'html-react-parser'
import { MyReviewKPI } from '../../../../../types/Performance/MyReview/myReviewTypes'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

// when the user clicks the kpi name, this modal is displayed

const KPIDescriptionModal = ({ kpi }: { kpi: MyReviewKPI }): JSX.Element => {
  const getFinalContent = (value: string | null): string => {
    return value ? value : 'N/A'
  }

  return (
    <>
      <h4
        className="text-primary"
        data-testid={generateMyReviewTestId('kpiDesModal-name')}
        style={{ borderBottom: '1px solid #124b7c', paddingBottom: '15px' }}
      >
        {kpi.name}
      </h4>
      <br />
      <p
        className="ng-binding"
        data-testid={generateMyReviewTestId('kpiDesModal-description')}
      >
        <b>Description:</b>
        {parse(getFinalContent(kpi.description))}
      </p>
      <p
        className="ng-binding"
        data-testid={generateMyReviewTestId('kpiDesModal-frequency')}
      >
        <b>Frequency:</b>
        {getFinalContent(kpi.frequency)}
      </p>
      <p
        className="ng-binding"
        data-testid={generateMyReviewTestId('kpiDesModal-target')}
      >
        <b>Target:</b>
        {getFinalContent(kpi.target)}
      </p>
    </>
  )
}

export default KPIDescriptionModal
