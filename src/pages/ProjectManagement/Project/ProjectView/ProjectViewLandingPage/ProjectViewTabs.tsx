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
import PeopleTab from '../People/PeopleTab'
import ProjectHistoryDetails from '../ProjectTimeLine/ProjectHistoryDetails'

interface ShowTabContentType<TValue> {
  [id: number]: TValue
}
const ProjectViewTabs = (): JSX.Element => {
  const [tabResult, setTabResult] = useState<MappedTabs[]>()
  const [activeTabsKey, setActiveTabsKey] = useState(1)
  const [activeTabsContent, setActiveTabsContent] = useState<JSX.Element>()
  const handleActiveTab = (tabKey: number) => {
    setActiveTabsKey(tabKey)
  }

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
    const changeTabContent = (tabKey: number): JSX.Element => {
      const showTabContent: ShowTabContentType<JSX.Element> = {
        1: <PeopleTab />,
        2: <ProjectHistoryDetails />,
      }
      return showTabContent[tabKey] || 'Tab Content not available'
    }
    setActiveTabsContent(changeTabContent(activeTabsKey))
  }, [activeTabsKey])
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
