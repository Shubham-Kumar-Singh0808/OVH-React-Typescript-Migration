export type EmployeeCertificationProps = {
  isEditCertificationDetails?: boolean
  headerTitle: string
  confirmButtonText: string
  backButtonHandler: () => void
}

export type EmployeeCertificationTableProps = {
  editCertificateButtonHandler: (technologyName: string) => void
}
