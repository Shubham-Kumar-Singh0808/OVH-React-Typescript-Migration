/* eslint-disable import/named */
import { classes, AutoMap } from '@automapper/classes'
import {
  createMapper,
  createMap,
  Converter,
  forMember,
  convertUsing,
  undefinedSubstitution,
  nullSubstitution,
  ignore,
  typeConverter,
  mapFrom,
} from '@automapper/core'
import { EmployeeVisaDetails } from '../types/MyProfile/PersonalInfoTab/personalInfoTypes'

export const bigintToNumber: Converter<bigint, number> = {
  convert(source: bigint): number {
    if (source === undefined || source === null) return 0
    else return Number(source)
  },
}

export const dateToString: Converter<Date, string> = {
  convert(source: Date): string {
    if (source === undefined || source === null) return ''
    else
      return (
        source.getDate() +
        '/' +
        Number(source.getMonth() + 1) +
        '/' +
        source.getFullYear()
      )
  },
}

export const numberToBigInt: Converter<number, bigint> = {
  convert(source: number): bigint {
    return BigInt(source)
  },
}

export const stringToDate: Converter<string, Date> = {
  convert(source: string): Date {
    return new Date(source)
  },
}

export class EmployeeVisaDetailsDto {
  id?: number

  empId?: number

  empName: string

  visaTypeId?: number

  visaType?: string

  countryId?: number

  countryName?: string

  dateOfIssue?: string

  dateOfExpire?: string

  createdBy?: string

  updatedBy?: string

  createdDate?: string

  updatedDate?: string

  visaDetailsPath?: string

  visaDetailsData?: string

  visaThumbPicture?: string

  public static mapToDto(source: EmployeeVisaDetails): EmployeeVisaDetailsDto {
    const mapper = createMapper({ strategyInitializer: classes() })

    createMap(
      mapper,
      EmployeeVisaDetails,
      EmployeeVisaDetailsDto,
      forMember(
        (data) => data.id,
        convertUsing(bigintToNumber, (source) => source.id),
      ),
      forMember(
        (data) => data.empId,
        convertUsing(bigintToNumber, (source) => source.empId),
      ),
      forMember((data) => data.empName, undefinedSubstitution('')),
      forMember((data) => data.visaType, undefinedSubstitution('')),
      forMember(
        (data) => data.visaTypeId,
        convertUsing(bigintToNumber, (source) => source.visaTypeId),
      ),
      forMember(
        (data) => data.countryId,
        convertUsing(bigintToNumber, (source) => source.countryId),
      ),
      forMember((data) => data.countryName, undefinedSubstitution('')),
      forMember((data) => data.createdBy, undefinedSubstitution('')),
      forMember((data) => data.updatedBy, undefinedSubstitution('')),
      forMember(
        (data) => data.dateOfIssue,
        convertUsing(dateToString, (source) => source.dateOfIssue),
      ),
      forMember(
        (data) => data.dateOfExpire,
        convertUsing(dateToString, (source) => source.dateOfExpire),
      ),
      forMember(
        (data) => data.createdDate,
        convertUsing(dateToString, (source) => source.createdDate),
      ),
      forMember(
        (data) => data.updatedDate,
        convertUsing(dateToString, (source) => source.updatedDate),
      ),
      forMember((data) => data.visaDetailsPath, nullSubstitution('')),
      forMember((data) => data.visaDetailsData, nullSubstitution('')),
      forMember((data) => data.visaThumbPicture, nullSubstitution('')),
      // typeConverter(BigInt, Number, (data) => Number(data)),
    )

    return mapper.map(source, EmployeeVisaDetails, EmployeeVisaDetailsDto)
  }

  public static mapFromDto(
    source: EmployeeVisaDetailsDto,
  ): EmployeeVisaDetails {
    const mapper = createMapper({ strategyInitializer: classes() })

    createMap(
      mapper,
      EmployeeVisaDetailsDto,
      EmployeeVisaDetails,
      forMember(
        (data) => data.id,
        convertUsing(numberToBigInt, (source) => source.id),
      ),
      forMember(
        (data) => data.empId,
        convertUsing(numberToBigInt, (source) => source.empId),
      ),
      forMember((data) => data.empName, undefinedSubstitution('')),
      forMember((data) => data.visaType, undefinedSubstitution('')),
      forMember(
        (data) => data.visaTypeId,
        convertUsing(numberToBigInt, (source) => source.visaTypeId),
      ),
      forMember(
        (data) => data.countryId,
        convertUsing(numberToBigInt, (source) => source.countryId),
      ),
      forMember((data) => data.countryName, undefinedSubstitution('')),
      forMember((data) => data.createdBy, undefinedSubstitution('')),
      forMember((data) => data.updatedBy, undefinedSubstitution('')),
      forMember(
        (data) => data.dateOfIssue,
        convertUsing(stringToDate, (source) => source.dateOfIssue),
      ),
      forMember(
        (data) => data.dateOfExpire,
        convertUsing(stringToDate, (source) => source.dateOfExpire),
      ),
      forMember(
        (data) => data.createdDate,
        convertUsing(stringToDate, (source) => source.createdDate),
      ),
      forMember(
        (data) => data.updatedDate,
        convertUsing(stringToDate, (source) => source.updatedDate),
      ),
      forMember((data) => data.visaDetailsPath, nullSubstitution('')),
      forMember((data) => data.visaDetailsData, nullSubstitution('')),
      forMember((data) => data.visaThumbPicture, nullSubstitution('')),
    )

    return mapper.map(source, EmployeeVisaDetailsDto, EmployeeVisaDetails)
  }
}
