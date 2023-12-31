import { CTableDataCell, CTableRow } from '@coreui/react-pro'
import React, { useState } from 'react'
import EmployeeProjectDetailsTable from './EmployeeProjectDetailsTable'
import { EmployeeProjectDetailsTableInterface } from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'
import { localeDateFormat } from '../../../utils/dateFormatUtils'

const EmployeeProjectEntry = (
  props: EmployeeProjectDetailsTableInterface,
): JSX.Element => {
  const [projectDetailsClicked, setProjectDetailsClicked] = useState<
    boolean | undefined
  >(false)
  const icon = projectDetailsClicked
    ? 'fa fa-minus-circle cursor-pointer'
    : 'fa fa-plus-circle cursor-pointer'

  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word.replace(word[0], word[0].toUpperCase())
      })
      .join(' ')
  }

  const onShowProjectDetailsHandler = () => {
    setProjectDetailsClicked((projectDetailsClicked) => !projectDetailsClicked)
  }

  let health
  if (props.project?.health === 'Green') {
    health = (
      <span
        data-testid="project-health"
        className="profile-tab-label profile-tab-label-success"
      >
        {props.project.status}
      </span>
    )
  }
  if (props.project?.health === 'Orange') {
    health = (
      <span
        data-testid="project-health"
        className="profile-tab-label profile-tab-label-warning"
      >
        {props.project.status}
      </span>
    )
  }
  if (props.project?.health === 'Red') {
    health = (
      <span
        data-testid="project-health"
        className="profile-tab-label profile-tab-label-failed"
      >
        {props.project.status}
      </span>
    )
  }
  if (props.project.health === 'Gray' || props.project.health === null) {
    health = (
      <span
        data-testid="project-health"
        className="profile-tab-label profile-tab-label-null"
      >
        {props.project.status}
      </span>
    )
  }

  const projectType =
    props.project.type === null
      ? ' '
      : toTitleCase(props.project.type as string)

  return (
    <>
      <CTableRow key={props.id}>
        <CTableDataCell scope="row">
          <i className={icon} onClick={onShowProjectDetailsHandler} />
        </CTableDataCell>
        <CTableDataCell scope="row">{props.project.projectName}</CTableDataCell>
        <CTableDataCell scope="row">{projectType}</CTableDataCell>
        <CTableDataCell scope="row">{props.project.client}</CTableDataCell>
        <CTableDataCell scope="row">{props.project.managerName}</CTableDataCell>
        <CTableDataCell scope="row">
          {localeDateFormat(props.project.startdate as string)}
        </CTableDataCell>
        <CTableDataCell scope="row">
          {localeDateFormat(props.project.enddate as string)}
        </CTableDataCell>
        <CTableDataCell scope="row">{health}</CTableDataCell>
      </CTableRow>
      {projectDetailsClicked && (
        <CTableDataCell colSpan={8}>
          <EmployeeProjectDetailsTable projectId={props.project.id as number} />
        </CTableDataCell>
      )}
    </>
  )
}

export default EmployeeProjectEntry
