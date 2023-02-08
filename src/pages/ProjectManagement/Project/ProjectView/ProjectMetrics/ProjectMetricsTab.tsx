import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import EffortVariance from './EffortVariance/EffortVariance'
import ScheduleVariance from './ScheduleVariance/ScheduleVariance'
import { ProjectTabList } from '../../../../../types/ProjectManagement/Project/ProjectView/projectViewTypes'

interface ShowTabContentType<TValue> {
  [id: number]: TValue
}

const ProjectMetricsTabLabel: ProjectTabList[] = [
  {
    id: 1,
    tabName: 'Schedule Variance',
  },
  {
    id: 2,
    tabName: 'Effort Variance',
  },
  {
    id: 3,
    tabName: 'TimeLine',
  },
]

const ProjectMetricsTab = (): JSX.Element => {
  const [activeTabsKey, setActiveTabsKey] = useState(1)
  const [activeTabsContent, setActiveTabsContent] = useState<JSX.Element>()
  const handleActiveTab = (tabKey: number) => {
    setActiveTabsKey(tabKey)
  }

  useEffect(() => {
    const changeTabContent = (tabKey: number): JSX.Element => {
      const showTabContent: ShowTabContentType<JSX.Element> = {
        1: <ScheduleVariance />,
        2: <EffortVariance />,
        3: <h6>TimeLine</h6>,
      }
      return showTabContent[tabKey] || 'Tab Content not available'
    }

    setActiveTabsContent(changeTabContent(activeTabsKey))
  }, [activeTabsKey])

  return (
    <>
      <CNav className="inline-tabs-nav" variant="tabs" role="tablist">
        {ProjectMetricsTabLabel.map((item) => (
          <CNavItem key={item.id}>
            <>
              <CNavLink
                active={activeTabsKey === item.id}
                onClick={() => handleActiveTab(item.id)}
                data-testid="navLink-test"
              >
                {item.tabName}
              </CNavLink>
            </>
          </CNavItem>
        ))}
      </CNav>
      <CTabContent className="inline-tabs-content">
        <CTabPane
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

export default ProjectMetricsTab
