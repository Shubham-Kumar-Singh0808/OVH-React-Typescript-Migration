import React from 'react'
import { LoadingState } from '../../commonTypes'

export interface KRATableItemProps {
  isIconVisible: boolean
  selectedKRAId: number
  selectedKRA: KRATableDataItem
  setIsIconVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedKRAId: React.Dispatch<React.SetStateAction<number>>
  setModalDescription: React.Dispatch<React.SetStateAction<string>>
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setShowModalButtons: React.Dispatch<React.SetStateAction<boolean>>
  setDeleteThisKRA: React.Dispatch<React.SetStateAction<number | undefined>>
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
  frequencyId: number
  frequency: string | null
  target: string | null
  kraDto: KRADto
}

export interface KRATableProps {
  paginationRange: number[]
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  pageSize: number
}

export interface KRAFilterOptionsProps {
  currentPage: number
  pageSize: number
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
}

export interface KPIsTableProps {
  kraId: number
}

export interface deleteKPIParams {
  kpiId: number
  kraId: number
}
