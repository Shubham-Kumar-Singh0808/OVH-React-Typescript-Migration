import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'

import BasicInfoTab from '../BasicInfoTab/BasicInfoTab'
import GeneralTab from '../GeneralTab/GeneralTab'
import PersonalInfoTab from '../../../pages/MyProfile/PersonalInfoTab/PersonalInfoTab'
import QualificationDetails from '../QualificationsTab/QualificationDetails'
import TabsLabels from '../../../middleware/TabsLabels'

interface ShowTabContentType<TValue> {
  [id: number]: TValue
}
const MyProfileTabs = (): JSX.Element => {
  const [activeTabsKey, setActiveTabsKey] = useState(1)
  const [activeTabsContent, setActiveTabsContent] = useState<JSX.Element>()

  const handleActiveTab = (tabKey: number) => {
    setActiveTabsKey(tabKey)
  }
  //Loading different components that comes in My Profile Tabs section
  //First add the item in 'TabsLabel.js' in 'middleware' folder
  //And add the key-value in below object
  useEffect(() => {
    const changeTabContent = (tabKey: number): JSX.Element => {
      const showTabContent: ShowTabContentType<JSX.Element> = {
        1: <GeneralTab />,
        2: <BasicInfoTab />,
        3: <PersonalInfoTab handleActiveTab={handleActiveTab} />,
        4: <QualificationDetails />,
        5: <h1>Review</h1>,
        6: <h1>Projects</h1>,
      }
      return showTabContent[tabKey] || 'Tab Content not available'
    }

    setActiveTabsContent(changeTabContent(activeTabsKey))
  }, [activeTabsKey])

  return (
    <>
      <CNav className="inline-tabs-nav" variant="tabs" role="tablist">
        {TabsLabels.map((item, _i) => (
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
