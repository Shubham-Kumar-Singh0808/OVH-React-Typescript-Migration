import { CNavGroup, CNavItem } from '@coreui/react-pro'
import { NavLink, useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../stateStore'

import { getSidebarMenu } from '../../middleware/api/SidebarMenu/sidebarMenuApi'
import { setReRenderMenu } from '../../reducers/appSlice'

const AppSidebarNavItems = (): JSX.Element => {
  const location = useLocation()
  const employeeId: string = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const reRenderMenu: boolean = useTypedSelector(
    (state) => state.app.reRenderMenu,
  )
  const dispatch = useAppDispatch()
  const getSidebarMenuItems = useTypedSelector(
    (state) => state.sidebarMenu.menuItems,
  )
  useEffect(() => {
    if (reRenderMenu) {
      dispatch(getSidebarMenu(employeeId))
      dispatch(setReRenderMenu(false))
    }
  }, [dispatch, employeeId, reRenderMenu])
  function navLink(name: string, iconClass: string) {
    return (
      <>
        {iconClass && (
          <span className="nav-icon">
            <i className={iconClass}></i>
          </span>
        )}
        {name}
      </>
    )
  }
  return (
    <>
      {getSidebarMenuItems?.map((curNavItem, index) =>
        curNavItem.childmenuItems.length ? (
          <CNavGroup
            idx={String(index)}
            key={index}
            toggler={navLink(curNavItem.menuName, curNavItem.menuclass)}
            visible={location.pathname.startsWith(curNavItem.menuurl)}
          >
            {curNavItem.childmenuItems.map((curChildNavItem, indx) => (
              <CNavItem key={indx}>
                <NavLink className="nav-link" to={curChildNavItem.menuUrl}>
                  {curChildNavItem.menuName}
                </NavLink>
              </CNavItem>
            ))}
          </CNavGroup>
        ) : (
          <CNavItem key={index}>
            <NavLink className="nav-link" to={curNavItem.menuurl}>
              {navLink(curNavItem.menuName, curNavItem.menuclass)}
            </NavLink>
          </CNavItem>
        ),
      )}
    </>
  )
}

export default AppSidebarNavItems
