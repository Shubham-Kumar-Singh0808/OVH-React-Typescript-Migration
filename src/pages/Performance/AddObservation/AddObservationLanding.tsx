import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import AddObservation from './AddObservationComponents/AddObservation'
import RatingScale from './AddObservationComponents/RatingScale'
import Reportees from './AddObservationComponents/Reportees'
import { AddObservationTabList } from './AddObservationConstants'
import { AddObservationTab } from '../../../types/Performance/AddObservation/AddObservationTypes'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'

interface TabContentType<TValue> {
  [id: number]: TValue
}
const AddObservationLanding = () => {
  const dispatch = useAppDispatch()
  const [currentTabKey, setCurrentTabsKey] = useState<number>(1)
  const [currentTabContent, setCurrentTabContent] = useState<JSX.Element>()
  const [currentTabs, setCurrentTabs] = useState<AddObservationTab[]>()
  const userAccessToFeatures = useTypedSelector(
    (state) => state.userAccessToFeatures.userAccessToFeatures,
  )

  useEffect(() => {
    dispatch(reduxServices.addObservation.ratingScaleRenderThunk())
  }, [])

  useEffect(() => {
    const filteredTabs = userAccessToFeatures
      .filter((item) => item.name === 'Hierarchy Observation List')
      .at(0)
    if (filteredTabs?.viewaccess) {
      setCurrentTabs(AddObservationTabList)
    } else {
      setCurrentTabs(AddObservationTabList.slice(1))
    }
  }, [userAccessToFeatures])

  useEffect(() => {
    if (currentTabs) {
      setCurrentTabsKey(currentTabs[0].id)
    }
  }, [currentTabs])

  useEffect(() => {
    const tabContent: TabContentType<JSX.Element> = {
      1: <Reportees />,
      2: <AddObservation />,
      3: <RatingScale />,
    }
    if (currentTabKey) {
      setCurrentTabContent(tabContent[currentTabKey])
    }
  }, [currentTabKey])

  const currentTabHandler = (tabId: number) => {
    setCurrentTabsKey(tabId)
  }

  console.log(currentTabs)

  return (
    <OCard
      title="Observations"
      className="mb-4 myprofile-wrapper"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CNav className="inline-tabs-nav" variant="tabs" role="tablist">
        {currentTabs?.map((item, index) => (
          <CNavItem key={index}>
            <CNavLink
              active={currentTabKey === item.id}
              onClick={() => currentTabHandler(item.id)}
            >
              {item.name}
            </CNavLink>
          </CNavItem>
        ))}
      </CNav>
      <CTabContent className="inline-tabs-content">
        <CTabPane role="tabpanel" visible={!!currentTabKey}>
          {currentTabContent}
        </CTabPane>
      </CTabContent>
    </OCard>
  )
}

export default AddObservationLanding
