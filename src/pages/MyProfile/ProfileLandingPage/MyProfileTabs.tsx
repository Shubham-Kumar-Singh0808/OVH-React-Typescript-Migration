import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BasicInfoTab from '../BasicInfoTab/BasicInfoTab'
import EmployeeProfileHistory from '../../MyProfile/ProfileHistory/EmployeeProfileHistory'
import GeneralTab from '../GeneralTab/GeneralTab'
import PersonalInfoTab from '../../../pages/MyProfile/PersonalInfoTab/PersonalInfoTab'
import QualificationDetails from '../QualificationsTab/QualificationDetails'
import RecruitmentHistory from '../RecruitmentHistory/RecruitmentHistory'
import EmployeeReviews from '../ReviewsTab/EmployeeReviews'
import TabsLabels from '../../../middleware/TabsLabels'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import EmployeeProjects from '../ProjectsTab/EmployeeProjects'
import EmployeeAssets from '../MyAssetsTab/EmployeeAssets'
import { mapTabsToFeatures } from '../../../utils/helper'
import { MappedTabs } from '../../../types/MyProfile/ProfileLandingPage/myProfileTabsTypes'
import EmployeeReportees from '../ReporteesTab/EmployeeReportees'
import Separation from '../Separation/Separation'

interface ShowTabContentType<TValue> {
  [id: number]: TValue
}
const MyProfileTabs = ({
  isViewingAnotherEmployee,
}: {
  isViewingAnotherEmployee: boolean
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [activeTabsKey, setActiveTabsKey] = useState(1)
  const [activeTabsContent, setActiveTabsContent] = useState<JSX.Element>()
  const [tabResult, setTabResult] = useState<MappedTabs[]>()

  const employeeRole = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeRole,
  )

  const { employeeId } = useParams<{ employeeId?: string }>()

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  useEffect(() => {
    console.log(userAccessToFeatures)
    const filteredTabs = userAccessToFeatures.filter((feature) =>
      TabsLabels.some(
        (tab) =>
          tab.label.toLowerCase() === feature.name?.toLowerCase() &&
          feature.viewaccess === true,
      ),
    )
    const mappedTabs = mapTabsToFeatures(TabsLabels, filteredTabs)
    setTabResult(mappedTabs as MappedTabs[])
    console.log(mappedTabs)
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

  const handleActiveTab = (tabKey: number) => {
    setActiveTabsKey(tabKey)
  }

  useEffect(() => {
    if (employeeId) {
      dispatch(
        reduxServices.generalInformation.getSelectedEmployeeInformation(
          employeeId,
        ),
      )
    }
  }, [dispatch, employeeId])

  console.log(isViewingAnotherEmployee)

  useEffect(() => {
    // if (
    //   employeeRole !== 'admin' &&
    //   employeeRole !== 'HR' &&
    //   activeTabsKey === 9
    // ) {
    //   setActiveTabsKey(0)
    // }
    //Loading different components that comes in My Profile Tabs section
    //First add the item in 'TabsLabel.js' in 'middleware' folder
    //And add the key-value in below object
    const changeTabContent = (tabKey: number): JSX.Element => {
      const showTabContent: ShowTabContentType<JSX.Element> = {
        1: <GeneralTab />,
        2: <BasicInfoTab />,
        3: <PersonalInfoTab handleActiveTab={handleActiveTab} />,
        4: <QualificationDetails />,
        5: isViewingAnotherEmployee ? <RecruitmentHistory /> : <></>,
        6: <EmployeeReviews />,
        7: <EmployeeProjects />,
        8: <EmployeeReportees />,
        9: <EmployeeAssets />,
        10: <EmployeeProfileHistory />,
        11: <Separation />,
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
              {/* {employeeRole !== 'admin' &&
              employeeRole !== 'HR' &&
              item.id === 9 ? (
                <></>
              ) : ( */}
              <>
                <CNavLink
                  data-testid="profileNavLink"
                  active={activeTabsKey === item.id}
                  onClick={() => handleActiveTab(item.id)}
                >
                  {item.tabName}
                </CNavLink>
              </>
              {/* )} */}
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
