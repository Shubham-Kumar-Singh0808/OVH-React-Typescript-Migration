import React from 'react'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'

const ProposalsTimeLine = () => {
  const projectProposalTimeLine = useTypedSelector(
    reduxServices.projectProposals.selectors.projectProposalsTimeLine,
  )
  return (
    <>
      <div className="sh-timeline-container">
        {projectProposalTimeLine.map((item, index) => {
          return (
            <div key={index} className="sh-timeline-card">
              <div
                className="sh-timeline-timestamp"
                data-testid="sh-time-stamp"
              >
                {item.postedOn}
              </div>
              <div className="sh-timeline-content">
                <div
                  className="sh-timeline-header mb-4 clearfix"
                  data-testid="sh-modifiedBy"
                >
                  <h4 className="sh-timeline-title">{item.postedBy}</h4>
                </div>
                <div className="sh-timeline-body">
                  <div className="sh-timeline-item mb-1">{item.post}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default ProposalsTimeLine