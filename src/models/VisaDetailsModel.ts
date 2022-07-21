import { classes, AutoMap } from '@automapper/classes'
import {
  createMapper,
  createMap,
  namingConventions,
  CamelCaseNamingConvention,
} from '@automapper/core'

const mapper = createMapper({ strategyInitializer: classes() })

// the data of a user from the database
export class EmployeeVisaDetailsModel {
  @AutoMap()
  id?: number

  @AutoMap()
  empId: number | string

  @AutoMap()
  empName: string | number

  @AutoMap()
  visaTypeId: number | string

  @AutoMap()
  visaType?: string

  @AutoMap()
  countryId: number | string

  @AutoMap()
  countryName?: string

  @AutoMap()
  dateOfIssue?: Date

  @AutoMap()
  dateOfExpire?: Date

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
  visaThumbPicture?: string | number
}

// the shape of the user data that you want to return from the method
export class EmployeeVisaDetailsDto {
  @AutoMap()
  id?: number

  @AutoMap()
  empId: number | string

  @AutoMap()
  empName: string | number

  @AutoMap()
  visaTypeId: number | string

  @AutoMap()
  visaType?: string

  @AutoMap()
  countryId: number | string

  @AutoMap()
  countryName?: string

  @AutoMap()
  dateOfIssue?: Date

  @AutoMap()
  dateOfExpire?: Date

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
  visaThumbPicture?: string | number
}

createMap(
  mapper, //  mapper
  EmployeeVisaDetailsModel, // source
  EmployeeVisaDetailsDto, // destination
  namingConventions(new CamelCaseNamingConvention()),
)
