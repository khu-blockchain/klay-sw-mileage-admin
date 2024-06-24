import {SwMileage, SwMileageFile} from "@/store/types";

type getSwMileageList = Array<SwMileage>

type getSwMileageById = SwMileage

type getSwMileageFileById = SwMileageFile

export type {
  getSwMileageList as getSwMileageListResponse,
  getSwMileageById as getSwMileageByIdResponse,
  getSwMileageFileById as getSwMileageFileByIdResponse,
}
