import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import ManagerAppraisalForm from './ManagerAppraisalForm'
import { MyReviewTabList } from '../../../../types/Performance/MyReview/myReviewTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import EmployeeRatingDetails from '../../MyReviews/RatingDetailsTab/EmployeeRatingDetails'

interface ShowTabContentType<TValue> {
  [id: number]: TValue
}

const TabsLabels: MyReviewTabList[] = [
  {
    id: 1,
    tabName: 'Review Form',
    label: 'Employee Review Form',
  },
  {
    id: 2,
    tabName: 'Rating Details',
    label: 'Employee Rating Details',
  },
]
const MyReviewTabs = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [activeTabsKey, setActiveTabsKey] = useState(1)
  const [activeTabsContent, setActiveTabsContent] = useState<JSX.Element>()
  const employeeRole = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeRole,
  )
  useEffect(() => {
    dispatch(reduxServices.myReview.getEmployeePerformanceReview('review'))
  }, [dispatch])

  const handleActiveTab = (tabKey: number) => {
    setActiveTabsKey(tabKey)
  }

  useEffect(() => {
    if (
      employeeRole !== 'admin' &&
      employeeRole !== 'HR' &&
      activeTabsKey === 2
    ) {
      setActiveTabsKey(0)
    }

    const changeTabContent = (tabKey: number): JSX.Element => {
      const showTabContent: ShowTabContentType<JSX.Element> = {
        1: <ManagerAppraisalForm />,
        2: <EmployeeRatingDetails />,
      }
      return showTabContent[tabKey] || 'Tab Content not available'
    }

    setActiveTabsContent(changeTabContent(activeTabsKey))
  }, [activeTabsKey, employeeRole])

  return (
    <>
      <CNav className="inline-tabs-nav mt-4" variant="tabs" role="tablist">
        {TabsLabels?.map((item, index) => (
          <CNavItem key={index}>
            <>
              <CNavLink
                data-testid="myReviewNavLink"
                active={activeTabsKey === item.id}
                onClick={() => handleActiveTab(item.id)}
              >
                {item.tabName}
              </CNavLink>
            </>
          </CNavItem>
        ))}
      </CNav>
      <CTabContent className="inline-tabs-content">
        <CTabPane
          className="review-border"
          role="tabpanel"
          aria-labelledby="home-tab"
          visible={!!activeTabsKey}
        >
          {activeTabsContent}
        </CTabPane>
      </CTabContent>
    </>
  )
}

export default MyReviewTabs
