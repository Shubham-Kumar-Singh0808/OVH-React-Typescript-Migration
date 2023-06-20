import React from 'react'
import parse from 'html-react-parser'
import { MyReviewKPI } from '../../../../../types/Performance/MyReview/myReviewTypes'
import { generateMyReviewTestId } from '../../MyReviewHelpers'

// when the user clicks the kpi name, this modal is displayed

const KPIDescriptionModal = ({ kpi }: { kpi: MyReviewKPI }): JSX.Element => {
  return (
    <>
      <h4
        className="text-primary ng-binding"
        data-testid={generateMyReviewTestId('kpiDesModal-name')}
      >
        {kpi.name}
      </h4>
      <br />
      <p
        className="ng-binding"
        data-testid={generateMyReviewTestId('kpiDesModal-description')}
      >
        <b>Description:</b>
        {parse(kpi.description)}
      </p>
      <p
        className="ng-binding"
        data-testid={generateMyReviewTestId('kpiDesModal-frequency')}
      >
        <b>Frequency:</b>
        {kpi.frequency}
      </p>
      <p
        className="ng-binding"
        data-testid={generateMyReviewTestId('kpiDesModal-target')}
      >
        <b>Target:</b>
        {kpi.target ? kpi.target : 'N/A'}
      </p>
    </>
  )
}

export default KPIDescriptionModal
