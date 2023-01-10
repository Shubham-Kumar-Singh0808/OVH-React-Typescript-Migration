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
import ProjectInvoices from '../Invoices/ProjectInvoices'
import MileStone from '../MileStone/MileStone'
import PeopleTab from '../People/PeopleTab'
import ProjectMetricsTab from '../ProjectMetrics/ProjectMetricsTab'
import ProjectTailoring from '../ProjectTailoring/ProjectTailoring'
import ProjectHistoryDetails from '../ProjectTimeLine/ProjectHistoryDetails'
import ProjectHiveActivityReport from '../ProjectTimeSheet/ProjectHiveActivityReport'
import Proposal from '../Proposals/Proposal'

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
        3: <MileStone />,
        4: <ProjectInvoices />,
        5: <h6>status</h6>,
        6: <h6>Notes</h6>,
        7: <Proposal />,
        8: <ProjectHiveActivityReport />,
        9: <ProjectTailoring />,
        10: <ProjectMetricsTab />,
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

export default ProjectViewTabs
