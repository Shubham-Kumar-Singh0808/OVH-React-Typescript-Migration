import { StatusReportList } from '../../types/ProjectManagement/Project/ProjectView/Status/projectStatusTypes'

export const mockProjectStatusList: StatusReportList = {
  size: 22,
  list: [
    {
      id: 12,
      prevstatus: 'testing',
      prevDate: '12/01/2022',
      nextstatus: 'test',
      nextDate: '01/02/2024',
      addOn: null,
      projectId: '198',
    },
  ],
}
