export type MyProfileTabList = {
  id: number
  tabName: string
  label: string
}

export type MappedTabs = {
  featureId?: number
  name?: string
  viewaccess?: boolean
  createaccess?: boolean
  updateaccess?: boolean
  deleteaccess?: boolean
  childFeatures?: null
  id: number
  tabName: string
  label: string
}
