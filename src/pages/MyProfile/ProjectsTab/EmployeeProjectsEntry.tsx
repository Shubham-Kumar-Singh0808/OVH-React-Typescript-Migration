import { CTableDataCell, CTableRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import { EmployeeProjectDetailsTableInterface } from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'
import EmployeeProjectsDetail from './EmployeeProjectsDetails'

const EmployeeProjectsEntry = (
  props: EmployeeProjectDetailsTableInterface,
): JSX.Element => {
  const [projectDetailsClicked, setProjectDetailsClicked] = useState<
    boolean | undefined
  >(false)
  let icon: string

  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word.replace(word[0], word[0].toUpperCase())
      })
      .join(' ')
  }

  const onShowProjectDetailsHandler = () => {
    setProjectDetailsClicked((projectDetailsClicked) => !projectDetailsClicked)
  }

  if (projectDetailsClicked) {
    icon = 'fa fa-minus-circle cursor-pointer'
  } else icon = 'fa fa-plus-circle cursor-pointer'

  let health
  if (props.project?.health === 'Green') {
    health = (
      <span className="profile-tab-label profile-tab-label-success">
        {props.project.status}
      </span>
    )
  }
  if (props.project?.health === 'Orange') {
    health = (
      <span className="profile-tab-label profile-tab-label-warning">
        {props.project.status}
      </span>
    )
  }
  if (props.project?.health === 'Red') {
    health = (
      <span className="profile-tab-label profile-tab-label-failed">
        {props.project.status}
      </span>
    )
  }
  if (props.project?.health === 'Gray' || props.project?.health === 'Null') {
    health = (
      <span className="profile-tab-label profile-tab-label-null">
        {props.project.status}
      </span>
    )
  }

  return (
    <>
      <CTableRow key={props.id}>
        <CTableDataCell scope="row">
          <i className={icon} onClick={onShowProjectDetailsHandler} />
        </CTableDataCell>
        <CTableDataCell scope="row">{props.project.projectName}</CTableDataCell>
        <CTableDataCell scope="row">
          {toTitleCase(props.project.type as string)}
        </CTableDataCell>
        <CTableDataCell scope="row">{props.project.client}</CTableDataCell>
        <CTableDataCell scope="row">{props.project.managerName}</CTableDataCell>
        <CTableDataCell scope="row">{props.project.startdate}</CTableDataCell>
        <CTableDataCell scope="row">{props.project.enddate}</CTableDataCell>
        <CTableDataCell scope="row">{health}</CTableDataCell>
      </CTableRow>
      {projectDetailsClicked && (
        <CTableDataCell colSpan={8}>
          <EmployeeProjectsDetail projectId={props.project.id as number} />
        </CTableDataCell>
      )}
    </>
  )
}

export default EmployeeProjectsEntry
