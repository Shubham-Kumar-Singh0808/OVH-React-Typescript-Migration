import { classes, AutoMap } from '@automapper/classes'
import {
  createMapper,
  createMap,
  namingConventions,
  CamelCaseNamingConvention,
} from '@automapper/core'
import { EmployeeVisaDetails } from '../types/MyProfile/PersonalInfoTab/personalInfoTypes'

const mapper = createMapper({ strategyInitializer: classes() })

export class EmployeeVisaDetailsDto {
  @AutoMap()
  id: bigint

  @AutoMap()
  empId: bigint

  @AutoMap()
  empName: string

  @AutoMap()
  visaTypeId: bigint

  @AutoMap()
  visaType: string

  @AutoMap()
  countryId: bigint

  @AutoMap()
  countryName?: string

  @AutoMap()
  dateOfIssue: Date

  @AutoMap()
  dateOfExpire: Date

  @AutoMap()
  createdBy?: string

  @AutoMap()
  updatedBy?: string

  @AutoMap()
  createdDate?: Date

  @AutoMap()
  updatedDate?: Date

  @AutoMap()
  visaDetailsPath?: string

  @AutoMap()
  visaDetailsData?: string

  @AutoMap()
  visaThumbPicture?: string
}

createMap(
  mapper, //  mapper
  EmployeeVisaDetails, // source
  EmployeeVisaDetailsDto, // destination
  namingConventions(new CamelCaseNamingConvention()),
)
