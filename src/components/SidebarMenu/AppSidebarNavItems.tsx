/* eslint-disable @typescript-eslint/no-explicit-any */
// Todo: remove eslint and fix all the errors
import React, { useEffect } from 'react'
import { CNavGroup, CNavItem } from '@coreui/react-pro'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { getSidebarMenu } from '../../middleware/api/SidebarMenu/sidebarMenuApi'
import { reduxServices } from '../../reducers/reduxServices'

const AppSidebarNavItems = (): JSX.Element => {
  const location = useLocation()
  const employeeId: string | number = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const reRenderMenu: boolean = useTypedSelector(
    (state) => state.app.reRenderMenu,
  )
  const dispatch = useAppDispatch()
  const getSidebarMenuItems = useTypedSelector(
    (state) => state.sidebarMenu.menuItems,
  )
  const unfoldable = useTypedSelector((state) => state.app.sidebarUnfoldable)
  useEffect(() => {
    if (reRenderMenu) {
      dispatch(getSidebarMenu(employeeId))
      dispatch(reduxServices.app.actions.setReRenderMenu(false))
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
        <span className="nav-link-label">{name}</span>

        {/* {unfoldable ? (
          <>
            <div className="posRelative">
              <div className="iconWrap">
                {iconClass && (
                  <span className="nav-icon">
                    <i className={iconClass}></i>
                  </span>
                )}
              </div>
              <div>{name}</div>
            </div>
          </>
        ) : (
          <>
            {iconClass && (
              <span className="nav-icon">
                <i className={iconClass}></i>
              </span>
            )}
            {name}
          </>
        )} */}
      </>
    )
  }
  return (
    <>
      {getSidebarMenuItems?.map((curNavItem: any, index: number) =>
        curNavItem.childmenuItems.length ? (
          <CNavGroup
            idx={String(index)}
            key={index}
            toggler={navLink(curNavItem.menuName, curNavItem.menuclass)}
            visible={location.pathname.startsWith(curNavItem.menuurl)}
          >
            {curNavItem.childmenuItems.map(
              (curChildNavItem: any, indx: number) => (
                <CNavItem key={indx}>
                  <NavLink
                    className="nav-link"
                    to={`/${curChildNavItem.menuUrl}`}
                  >
                    {curChildNavItem.menuName}
                  </NavLink>
                </CNavItem>
              ),
            )}
          </CNavGroup>
        ) : (
          <CNavItem key={index}>
            <NavLink className="nav-link" to={`/${curNavItem.menuurl}`}>
              {navLink(curNavItem.menuName, curNavItem.menuclass)}
            </NavLink>
          </CNavItem>
        ),
      )}
    </>
  )
}

export default AppSidebarNavItems
