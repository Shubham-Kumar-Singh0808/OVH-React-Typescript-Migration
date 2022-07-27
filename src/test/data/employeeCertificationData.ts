import { MockEmployeeCertification } from '../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'

export const mockEmployeeCertifications: MockEmployeeCertification[] = [
  {
    id: 409,
    code: '123',
    name: 'qweert',
    completedDate: '01/06/2022',
    expiryDate: '30/06/2022',
    skill: null,
    percent: '100.0',
    description:
      '<p><em><strong><img alt="" src="https://imgsv.imaging.nikon.com/lineup/dslr/df/img/sample/img_01.jpg" style="height:50px; width:75px" /></strong></em></p>\n\n<ul>\n\t<li><em><strong>sdasdsa dasdsadsa dsadsadsad</strong></em></li>\n\t<li><em><strong>dsadsadsadsa</strong></em></li>\n\t<li><em><strong>sdasdsada</strong></em></li>\n</ul>',
    employeeId: 2013,
    technology: 'Java',
    certificateType: 'Full Stack JAVA',
  },
  {
    id: 424,
    code: '123',
    name: 'testing',
    completedDate: '21/06/2022',
    expiryDate: '30/07/2022',
    skill: null,
    percent: '100.0',
    description:
      '<table border="1" cellpadding="1" cellspacing="1" style="width:500px">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td>test1</td>\n\t\t\t<td>test1</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>test2</td>\n\t\t\t<td>test2</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td>test3</td>\n\t\t\t<td>test3</td>\n\t\t</tr>\n\t</tbody>\n</table>\n\n<p>&nbsp;</p>',
    employeeId: 2013,
    technology: 'Java',
    certificateType: 'JavaTesting',
  },
  {
    id: 434,
    code: '12321',
    name: 'qwedasd',
    completedDate: '13/06/2022',
    expiryDate: '09/07/2022',
    skill: null,
    percent: '100.0',
    description: null,
    employeeId: 2013,
    technology: 'Java',
    certificateType: 'JavaTesting',
  },
  {
    id: 435,
    code: '321',
    name: 'test',
    completedDate: '14/06/2022',
    expiryDate: '09/07/2022',
    skill: null,
    percent: '100.0',
    description:
      '<table cellspacing="0" style="border-collapse:collapse; width:523px">\n\t<tbody>\n\t\t<tr>\n\t\t\t<td style="background-color:white; border-color:black; border-style:solid; border-width:1px; height:19px; text-align:left; vertical-align:top; white-space:nowrap; width:192px">Global Rich Text Editor</td>\n\t\t\t<td style="border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:1px solid black; text-align:left; vertical-align:top; white-space:nowrap; width:321px">Implementing Rich Text Editor globally for all screens</td>\n\t\t</tr>\n\t\t<tr>\n\t\t\t<td style="background-color:white; border-bottom:1px solid black; border-left:1px solid black; border-right:1px solid black; border-top:none; height:19px; text-align:left; vertical-align:top; white-space:nowrap; width:192px">Employee Directory</td>\n\t\t\t<td style="border-bottom:1px solid black; border-left:none; border-right:1px solid black; border-top:none; text-align:left; vertical-align:top; white-space:nowrap; width:321px">&nbsp;Employee Report</td>\n\t\t</tr>\n\t</tbody>\n</table>',
    employeeId: 2013,
    technology: 'Java',
    certificateType: 'JavaTesting',
  },
]
