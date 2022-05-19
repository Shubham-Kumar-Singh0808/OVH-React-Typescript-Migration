import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'

import GeneralTab from '../GeneralTab/GeneralTab'
import PersonalInfoTab from '../../../pages/MyProfile/PersonalInfoTab/PersonalInfoTab'
import QualificationDetails from '../Qualifications/qualifications/QualificationDetails'
import TabsLabels from '../../../middleware/TabsLabels'
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
      1: <GeneralTab />,
      2: <h1>Basic Info</h1>,
      3: <PersonalInfoTab />,
      4: <QualificationDetails />,
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
