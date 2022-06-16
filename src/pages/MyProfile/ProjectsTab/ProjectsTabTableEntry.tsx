import { CTableDataCell, CTableRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { EmployeeProjectDetails } from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'

export type EntryExport = {
  id: number
  project: EmployeeProjectDetails
  projectSelected: number | undefined
  isShown?: boolean
  projectDetailOpenedHandler(projectIndex: number | undefined): void
}
const ProjectsTabTableEntry = (props: EntryExport): JSX.Element => {
  const [projectDetailsClicked, setProjectDetailsClicked] = useState<
    boolean | undefined
  >(undefined)
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

  useEffect(() => {
    if (projectDetailsClicked) {
      props.projectDetailOpenedHandler(props.id)
    }

    if (!projectDetailsClicked) {
      setProjectDetailsClicked(false)
    }

    if (props.id === props.projectSelected && !projectDetailsClicked) {
      setProjectDetailsClicked(true)
    }
  }, [projectDetailsClicked])

  if (
    projectDetailsClicked &&
    (props.id === props.projectSelected || props.projectSelected === undefined)
  ) {
    icon = 'fa fa-minus-circle cursor-pointer'
  } else icon = 'fa fa-plus-circle cursor-pointer'

  console.log(props.projectSelected)

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
        <CTableDataCell scope="row">{props.project.status}</CTableDataCell>
      </CTableRow>
    </>
  )
}

export default ProjectsTabTableEntry
