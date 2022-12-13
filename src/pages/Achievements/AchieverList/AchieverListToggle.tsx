import React from 'react'
import { CFormSwitch } from '@coreui/react-pro'
import OToast from '../../../components/ReusableComponent/OToast'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  AchieverListUserTypes,
  UpdateShowOnDashboardQueryParameters,
} from '../../../types/Achievements/AchieverList/AchieverListTypes'
import { reduxServices } from '../../../reducers/reduxServices'

const AchieverListToggle = ({
  index,
  achieverItem,
}: {
  index: number
  achieverItem: AchieverListUserTypes
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const filterQueries = useTypedSelector(
    (state) => state.achieverList.achieverListQueries,
  )
  const updatedToast = (
    <OToast toastColor="success" toastMessage="Updated Successfully" />
  )
  const errorToast = (
    <OToast toastColor="error" toastMessage="Error! Please Try again later" />
  )

  const switchChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { checked } = e.target
    const copyChecked = checked
    const queries: UpdateShowOnDashboardQueryParameters = {
      achievementId: achieverItem.id,
      dashBoardStatus: copyChecked,
    }
    const result = await dispatch(
      reduxServices.achieverList.updateAchievementDashboardStatus(queries),
    )
    if (
      reduxServices.achieverList.updateAchievementDashboardStatus.fulfilled.match(
        result,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(updatedToast))
      dispatch(reduxServices.achieverList.getAllAchieverList(filterQueries))
    } else {
      dispatch(reduxServices.app.actions.addToast(errorToast))
    }
  }

  return (
    <>
      <CFormSwitch
        className="sh-form-switch w-100"
        data-testid={`btn-toggle${index}`}
        type="checkbox"
        name="showStatus"
        size="lg"
        valid={true}
        checked={achieverItem.showOnDashBoard}
        onChange={(e) => switchChangeHandler(e)}
      />
    </>
  )
}

export default AchieverListToggle
