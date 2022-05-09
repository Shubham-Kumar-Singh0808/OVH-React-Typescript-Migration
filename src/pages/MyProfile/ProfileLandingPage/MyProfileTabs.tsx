import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'

import OCard from '../../../components/ReusableComponent/OCard'
import TabsLabels from '../../../middleware/TabsLabels'
import QualificationCategoryList from '../QualificationCategoryList/QualificationCategoryList'

interface ShowTabContentType<TValue> {
  [id: number]: TValue
}
const MyProfileTabs = (): JSX.Element => {
  const [activeTabsKey, setActiveTabsKey] = useState(1)
  const [activeTabsContent, setActiveTabsContent] = useState<JSX.Element>()
  useEffect(
    () => setActiveTabsContent(changeTabContent(activeTabsKey)),
    [activeTabsKey],
  )
  //Loading different components that comes in My Profile Tabs section
  //First add the item in 'TabsLabel.js' in 'middleware' folder
  //And add the key-value in below object

  const changeTabContent = (tabKey: number): JSX.Element => {
    const showTabContent: ShowTabContentType<JSX.Element> = {
      1: <OCard />,
      2: <h1>Basic Info</h1>,
      3: <h1>Personal Info</h1>,
      4: <h1>Qualifications</h1>,
      5: <h1>Review</h1>,
      6: <h1>Projects</h1>,
    }
    return showTabContent[tabKey] || 'Tab Content not available'
  }
  const handleActiveTab = (tabKey: number) => {
    setActiveTabsKey(tabKey)
  }
  return (
    <>
      <CNav className="inline-tabs-nav" variant="tabs" role="tablist">
        {TabsLabels.map((item, i) => (
          <CNavItem key={item.id}>
            <CNavLink
              active={activeTabsKey === item.id}
              onClick={() => handleActiveTab(item.id)}
            >
              {item.name}
            </CNavLink>
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

export default MyProfileTabs
