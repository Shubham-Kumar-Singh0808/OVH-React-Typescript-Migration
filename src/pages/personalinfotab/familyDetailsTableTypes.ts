export type FamilyDetailsModal = {
  familyId: number
  personName: string
  relationShip: string
  contactNumber: string
  dateOfBirth: string
  employeeId: number | string
}

export type FamilyDetailsArrayModal = {
  familyDetails: FamilyDetailsModal[]
  isLoading: boolean
}

export type UserHeaders = {
  employeeId: number | string
}
