import React from 'react'
import { ModalContent } from '../../../pages/Performance/KRA/KRAConstants'
import { LoadingState } from '../../commonTypes'

export interface KRATableItemProps {
  isIconVisible: boolean
  selectedKRAId: number
  selectedKRA: KRATableDataItem
  setIsIconVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedKRAId: React.Dispatch<React.SetStateAction<number>>
  setModalDescription: React.Dispatch<React.SetStateAction<ModalContent>>
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setDeleteThisKRA: React.Dispatch<React.SetStateAction<number | undefined>>
  setDeleteThisKRAName: React.Dispatch<React.SetStateAction<string>>
  setAddKPI: React.Dispatch<React.SetStateAction<KRATableDataItem>>
}

export interface IncomingEmployeeDepartment {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}

export interface IncomingKRADesignation {
  id: number
  name: string
  code: null | string
  departmentName: string
  departmentId: number
}

export interface KRADataQueryBody {
  departmentId: number
  designationId: string
  endIndex: number
  multipleSearch: string
  startIndex: number
}

export interface KRATableDataItem {
  id: number
  name: string
  description: string | null
  kpiLookps: null
  count: number
  checkType: null
  designationName: string
  designationId: number
  departmentName: string
  departmentId: number
  designationKraPercentage: number
}

export interface IncomingKRADataList {
  size: number
  list: KRATableDataItem[]
}

export interface KRADto {
  id: number
  name: string
  description: null
  kpiLookps: null
  count: number
  checkType: null
  designationName: null
  designationId: null
  departmentName: null
  departmentId: null
  designationKraPercentage: null
}

export interface IncomingKPIDataItem {
  id: number
  name: string
  description: string | null
  frequencyId: number | string
  frequency: string | null
  target: string
  kraDto: KRADto
}

export interface KRATableProps {
  paginationRange: number[]
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  pageSize: number
  setAddKPI: React.Dispatch<React.SetStateAction<KRATableDataItem>>
}

export interface KRAFilterOptionsProps {
  currentPage: number
  pageSize: number
  selectedDepartment: string
  selectedDesignation: string
  setSelectedDepartment: React.Dispatch<React.SetStateAction<string>>
  setSelectedDesignation: React.Dispatch<React.SetStateAction<string>>
}

export type Frequency = {
  id: number
  frequencyname: string
}
export interface KRAInitialState {
  isLoading: LoadingState
  empDepartments: IncomingEmployeeDepartment[]
  designations: IncomingKRADesignation[]
  kraData: IncomingKRADataList
  kpisForIndividualKRAList: IncomingKPIDataItem[]
  currentPage: number
  pageSize: number
  krasQuery: KRADataQueryBody
  kraDesigPercentage: number
  isNewKRADuplicate: boolean
  isNewKpiDuplicate: boolean
  editThisKra: KRATableDataItem
  editThisKpi: IncomingKPIDataItem
  currentOnScreenPage: KRAPages
  frequency: Frequency[]
}

// This is for managing the page changes
export enum KRAPages {
  kraList = 'KRA List',
  addKra = 'Add KRA',
  editKPI = 'Edit KPI',
  addKPI = 'Add KPI',
  editKra = 'Edit KRA',
}

export interface KRATemplateProps {
  enteredKraName: string
  setEnteredKraName: React.Dispatch<React.SetStateAction<string>>
  enteredDept: string
  setEnteredDept: React.Dispatch<React.SetStateAction<string>>
  enteredDesig: string
  setEnteredDesig: React.Dispatch<React.SetStateAction<string>>
  enteredPercentage: string
  setEnteredPercentage: React.Dispatch<React.SetStateAction<string>>
  enteredDescription: string
  setEnteredDescription: React.Dispatch<React.SetStateAction<string>>
  showDescription: boolean
  isPercentReadonly: boolean
  setPercentReadOnly: React.Dispatch<React.SetStateAction<boolean>>
  setIsButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>
  callDesignationEveryDepartment: boolean
}

export interface AddKRAProps {
  enteredDescription: string
  setEnteredDescription: React.Dispatch<React.SetStateAction<string>>
}

export interface KPIsTableProps {
  kraId: number
  // setEditKPi: React.Dispatch<React.SetStateAction<IncomingKPIDataItem>>
  // editKPIButtonHandler: (editKPI: IncomingKPIDataItem) => void
}

export interface KRADesignationPercentageQuery {
  departmentId: number
  designationId: number
}

export interface NewKRADuplicateCheckQuery
  extends KRADesignationPercentageQuery {
  kraName: string
}
export type NewKPiDuplicateCheckQuery = {
  id: number
  name: string
}

export interface NewKRABody {
  departmentId: number
  description: string
  designationId: number
  designationKraPercentage: string
  name: string
}

export interface UpdateKRABody extends NewKRABody {
  checkType: null
  count: number
  departmentName: string
  designationName: string
  id: number
  kpiLookps: null
}

export interface DeleteKPIParams {
  kpiId: number
  kraId: number
}

export type AddKPIData = {
  kraId?: number
  description: string
  frequencyId: number
  name: string
  target: string
}
