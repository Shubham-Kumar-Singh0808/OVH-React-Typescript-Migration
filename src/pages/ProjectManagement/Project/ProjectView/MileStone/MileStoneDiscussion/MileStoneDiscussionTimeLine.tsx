import { CFormLabel } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../../stateStore'

const MileStoneDiscussionTimeLine = (): JSX.Element => {
  const mileStoneDiscussionTimeLine = useTypedSelector(
    reduxServices.projectMileStone.selectors.projectMileStoneNewsFeed,
  )

  return (
    <>
      <div className="sh-timeline-container">
        {mileStoneDiscussionTimeLine?.map((item, index) => {
          return (
            <div key={index} className="sh-timeline-card">
              <div
                className="sh-timeline-timestamp"
                data-testid="sh-time-stamp"
              >
                {item.postDate}
              </div>
              <div className="sh-timeline-content">
                <div
                  className="sh-timeline-header mb-4 clearfix"
                  data-testid="sh-modifiedBy"
                >
                  <h4 className="sh-timeline-title">
                    {item.postedBy.fullName}
                  </h4>
                </div>
                <div className="sh-timeline-body">
                  <div className="sh-timeline-item mb-1">
                    {item.postImageData ? (
                      <div className="mb-1">
                        <img
                          className="rounded-circle img-responsive"
                          src={item.postImageData}
                          width={100}
                          height={100}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="mb-1">
                      <CFormLabel className="col-form-label p-0">
                        Comments:
                      </CFormLabel>
                      &nbsp;
                      {item.post}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MileStoneDiscussionTimeLine
