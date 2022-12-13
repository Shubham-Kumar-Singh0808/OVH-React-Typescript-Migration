import { CBadge, CButton, CCol, CContainer, CRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import OModal from '../../../components/ReusableComponent/OModal'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const showOnDashboard = 'Show On Dashboard'
const hideFromDashboard = 'Hide From Dashboard'

const AchievementTimeline = (props: {
  setAchievementTimeline: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const timelineData = useTypedSelector((state) => state.achieverList)

  const [openDescriptionBox, setDescriptionBox] = useState<boolean>(false)
  const [descriptionContent, setDescriptionContent] = useState<
    string | undefined | null | JSX.Element | JSX.Element[]
  >()

  const backButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    props.setAchievementTimeline(false)
  }

  const badgeAllocation = (label: string, index: number) => {
    if (label === 'UPDATED') {
      return (
        <CBadge
          className="rounded-pill label-info px-2"
          data-testid={`persist-${index}`}
        >
          {label.charAt(0).toUpperCase()}
          {label.slice(1).toLowerCase()}
        </CBadge>
      )
    }
    return (
      <CBadge className="rounded-pill label-success px-2">
        {label.charAt(0).toUpperCase()}
        {label.slice(1).toLowerCase()}
      </CBadge>
    )
  }

  const showDetailsInTimeline = (
    detail: string,
    verifyContent: string | null,
    content: string | JSX.Element | null,
  ) => {
    return (
      <>
        {verifyContent !== null ? (
          <div className="mb-1" data-testid={`${detail}`}>
            <label className=" p-0">
              <strong>{detail} &nbsp;</strong>
            </label>
            {content}
          </div>
        ) : (
          <></>
        )}
      </>
    )
  }

  const changeFromTimeline = (
    changeType: string,
    verifyContent: string | null,
    oldContent: string | null | JSX.Element,
    newContent: string | null | JSX.Element,
  ) => {
    return (
      <>
        {verifyContent !== null ? (
          <div className="mb-1">
            <label className=" p-0">
              <strong>{changeType} changed from &nbsp;</strong>
            </label>
            {oldContent === null ? 'N/A' : oldContent}
            <label className=" p-0">
              <strong>&nbsp; to &nbsp;</strong>
            </label>
            {newContent === null ? 'N/A' : newContent}
          </div>
        ) : (
          <></>
        )}
      </>
    )
  }

  const performDescriptionParsing = (
    content: string | undefined | null,
    parsingFor: 'MODAL' | 'COL',
  ) => {
    const removeTag = '/(<([^>]+)>)/gi'
    if (content === null || content === undefined) {
      return null
    }
    const removeSpaces = content.replace(removeTag, '')
    if (parsingFor === 'MODAL') {
      return parse(removeSpaces)
    }
    const finalContent =
      removeSpaces && removeSpaces.length > 25
        ? `${removeSpaces.substring(0, 25)} ...`
        : removeSpaces
    console.log(finalContent)
    return finalContent
  }

  const descriptionContentJSX = (description: string | null) => {
    return (
      <span
        className="text-info"
        role="button"
        onClick={() => {
          showAchievementDescription(description)
        }}
      >
        {performDescriptionParsing(description, 'COL')}
      </span>
    )
  }

  const showAchievementDescription = (content: string | null) => {
    const showContent = performDescriptionParsing(content, 'MODAL')
    setDescriptionContent(showContent)
    setDescriptionBox(true)
  }

  return (
    <>
      {timelineData.isLoading !== ApiLoadingState.loading ? (
        <>
          <CContainer>
            <CRow className="mt-2 justify-content-end">
              <CCol xs={2} className="px-0">
                <CButton
                  color="info"
                  data-testid="back-btn"
                  className="btn-ovh me-1"
                  onClick={backButtonHandler}
                >
                  <i className="fa fa-arrow-left me-1"></i>Back
                </CButton>
              </CCol>
            </CRow>
            <div className="mt-4 sh-timeline-container">
              {timelineData.achievementHistoryTimeline.list.map(
                (item, index) => (
                  <div key={index} className="sh-timeline-card">
                    <div
                      className="sh-timeline-timestamp"
                      data-testid={`sh-time-stamp-${index}`}
                    >
                      {item.modifiedDate}
                    </div>
                    <div className="sh-timeline-content">
                      <div
                        className="sh-timeline-header mb-4 clearfix"
                        data-testid={`sh-modifiedBy-${index}`}
                      >
                        <h4
                          className="sh-timeline-title"
                          data-testid={`modifiedByValue-${index}`}
                        >
                          {item.modifiedBy} - &nbsp;
                        </h4>
                        {badgeAllocation(item.persistType, index)}
                      </div>
                      <div className="sh-timeline-item">
                        <>
                          {changeFromTimeline(
                            'Dashboard View',
                            item.oldshowOnDashBoard,
                            item.oldshowOnDashBoard === 'true'
                              ? showOnDashboard
                              : hideFromDashboard,
                            item.showOnDashBoard === 'true'
                              ? showOnDashboard
                              : hideFromDashboard,
                          )}
                          {changeFromTimeline(
                            'Achievement Type',
                            item.oldachievementType,
                            item.oldachievementType,
                            item.achievementType,
                          )}
                          {changeFromTimeline(
                            'Time Period',
                            item.oldtimePeriod,
                            item.oldtimePeriod,
                            item.timePeriod,
                          )}
                          {changeFromTimeline(
                            'Start Date',
                            item.oldstartDate,
                            item.oldstartDate,
                            item.startDate,
                          )}
                          {changeFromTimeline(
                            'End Date',
                            item.oldendDate,
                            item.oldendDate,
                            item.endDate,
                          )}
                          {changeFromTimeline(
                            'Description',
                            item.olddescription,
                            descriptionContentJSX(item.olddescription),
                            descriptionContentJSX(item.description),
                          )}
                          {changeFromTimeline(
                            'Employee Name',
                            item.oldemployee,
                            item.oldemployee,
                            item.employee,
                          )}
                          {showDetailsInTimeline(
                            'Start Date',
                            item.startDate,
                            item.startDate,
                          )}
                          {showDetailsInTimeline(
                            'End Date',
                            item.endDate,
                            item.endDate,
                          )}
                          {showDetailsInTimeline(
                            'Description',
                            item.description,
                            descriptionContentJSX(item.description),
                          )}
                          {showDetailsInTimeline(
                            'Achievement Type',
                            item.achievementType,
                            item.achievementType,
                          )}
                          {showDetailsInTimeline(
                            'Employee Name',
                            item.employee,
                            item.employee,
                          )}
                        </>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </CContainer>
          <OModal
            visible={openDescriptionBox}
            setVisible={setDescriptionBox}
            modalSize="lg"
            alignment="center"
            modalFooterClass="d-none"
            modalHeaderClass="d-none"
          >
            <p className="text-info">
              {descriptionContent ? descriptionContent : ''}
            </p>
          </OModal>
        </>
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </>
  )
}

export default AchievementTimeline
