import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import ProjectViewTabLabel from '../../../../../middleware/ProjectViewTabLables'
import ChangeRequest from '../ChangeRequest/ChangeRequest'
import PeopleTab from '../People/PeopleTab'
import ProjectHistoryDetails from '../ProjectTimeLine/ProjectHistoryDetails'

interface ShowTabContentType<TValue> {
  [id: number]: TValue
}

const ProjectViewTabs = (): JSX.Element => {
  const [activeTabsKey, setActiveTabsKey] = useState(1)
  const [activeTabsContent, setActiveTabsContent] = useState<JSX.Element>()
  const handleActiveTab = (tabKey: number) => {
    setActiveTabsKey(tabKey)
  }

  useEffect(() => {
    const changeTabContent = (tabKey: number): JSX.Element => {
      const showTabContent: ShowTabContentType<JSX.Element> = {
        1: <PeopleTab />,
        2: <ChangeRequest />,
        3: <h5>Milestone</h5>,
        4: <h6>Invoices</h6>,
        5: <h6>status</h6>,
        6: <h6>Notes</h6>,
        7: <h6>Proposals</h6>,
        8: <h6>Time Sheet</h6>,
        9: <h6>Project Tailoring</h6>,
        10: <h6>Project Metrics</h6>,
        11: <ProjectHistoryDetails />,
      }
      return showTabContent[tabKey] || 'Tab Content not available'
    }

    setActiveTabsContent(changeTabContent(activeTabsKey))
  }, [activeTabsKey])

  return (
    <>
      <CNav className="inline-tabs-nav" variant="tabs" role="tablist">
        {ProjectViewTabLabel.map((item) => (
          <CNavItem key={item.id}>
            <>
              <CNavLink
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

export default ProjectViewTabs
