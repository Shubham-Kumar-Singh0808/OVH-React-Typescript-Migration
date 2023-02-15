import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import ProjectViewTabLabel from '../../../../../middleware/ProjectViewTabLables'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'
import { MappedTabs } from '../../../../../types/MyProfile/ProfileLandingPage/myProfileTabsTypes'
import { mapTabsToFeatures } from '../../../../../utils/helper'
import ChangeRequest from '../ChangeRequest/ChangeRequest'
import ProjectInvoices from '../Invoices/ProjectInvoices'
import MileStone from '../MileStone/MileStone'
import ProjectNotes from '../Notes/ProjectNotes'
import PeopleTab from '../People/PeopleTab'
import ProjectMetricsTab from '../ProjectMetrics/ProjectMetricsTab'
import ProjectTailoring from '../ProjectTailoring/ProjectTailoring'
import ProjectHistoryDetails from '../ProjectTimeLine/ProjectHistoryDetails'
import ProjectHiveActivityReport from '../ProjectTimeSheet/ProjectHiveActivityReport'
import Proposal from '../Proposals/Proposal'
import ProjectStatus from '../Status/ProjectStatus'

interface ShowTabContentType<TValue> {
  [id: number]: TValue
}

const ProjectViewTabs = (): JSX.Element => {
  const [activeTabsKey, setActiveTabsKey] = useState(1)
  const [activeTabsContent, setActiveTabsContent] = useState<JSX.Element>()
  const [tabResult, setTabResult] = useState<MappedTabs[]>()
  const handleActiveTab = (tabKey: number) => {
    setActiveTabsKey(tabKey)
  }

  const employeeRole = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeRole,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  useEffect(() => {
    const filteredTabs = userAccessToFeatures.filter((feature) =>
      ProjectViewTabLabel.some(
        (tab) =>
          tab.label.toLowerCase() === feature.name?.toLowerCase() &&
          feature.viewaccess === true,
      ),
    )
    const mappedTabs = mapTabsToFeatures(ProjectViewTabLabel, filteredTabs)
    setTabResult(mappedTabs as MappedTabs[])
  }, [userAccessToFeatures])

  useEffect(() => {
    if (tabResult) {
      const newTabResult = tabResult?.filter(
        (value) => Object.keys(value).length !== 0,
      )
      if (newTabResult) {
        setActiveTabsKey(newTabResult[0]?.id)
      }
    }
  }, [tabResult])
  useEffect(() => {
    const changeTabContent = (tabKey: number): JSX.Element => {
      const showTabContent: ShowTabContentType<JSX.Element> = {
        1: <PeopleTab />,
        2: <ChangeRequest />,
        3: <MileStone />,
        4: <ProjectInvoices />,
        5: <ProjectStatus />,
        6: <ProjectNotes />,
        7: <Proposal />,
        8: <ProjectHiveActivityReport />,
        9: <ProjectTailoring />,
        10: <ProjectMetricsTab />,
        11: <ProjectHistoryDetails />,
      }
      return showTabContent[tabKey] || 'Tab Content not available'
    }

    setActiveTabsContent(changeTabContent(activeTabsKey))
  }, [activeTabsKey, employeeRole])

  return (
    <>
      <CNav className="inline-tabs-nav" variant="tabs" role="tablist">
        {tabResult
          ?.filter((value) => Object.keys(value).length !== 0)
          .map((item, index) => (
            <CNavItem key={index}>
              <>
                <CNavLink
                  data-testid="profileNavLink"
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
