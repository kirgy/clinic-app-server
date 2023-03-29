export enum DATA_MAPPING_TYPES {
  PATIENT = "PATIENT",
  CLINIC = "CLINIC",
}

export type PatientTypeSource = {
  id: string;
  clinic_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
};

export type ClinicTypeSource = {
  id: string;
  name: string;
};

type PatientTypeGraph = {
  id: string;
  originId: string;
  clinicId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};

type ClinicTypeGraph = {
  id: string;
  originId: string;
  name: string;
};

type DataMappingInput =
  | {
      type: DATA_MAPPING_TYPES.PATIENT;
      source: Array<PatientTypeSource>;
    }
  | {
      type: DATA_MAPPING_TYPES.CLINIC;
      source: Array<ClinicTypeSource>;
    };

type DataMappingOutput = PatientTypeGraph | ClinicTypeGraph;

export const mapData = ({
  type,
  source,
}: DataMappingInput): Array<DataMappingOutput> => {
  switch (type) {
    case DATA_MAPPING_TYPES.PATIENT:
      return formatPatiantData(source);
    case DATA_MAPPING_TYPES.CLINIC:
      return formatClinicData(source);
  }

  const exhaustiveCheck: never = type;
  return exhaustiveCheck;
};

const formatPatiantData = (
  data: Array<PatientTypeSource>
): Array<PatientTypeGraph> => {
  return data.map((datum) => {
    return {
      id: `${datum.clinic_id}_${datum.id}`,
      originId: datum.id,
      clinicId: datum.clinic_id,
      firstName: datum.first_name,
      lastName: datum.last_name,
      dateOfBirth: new Date(datum.date_of_birth),
    };
  });
};

const formatClinicData = (
  data: Array<ClinicTypeSource>
): Array<ClinicTypeGraph> => {
  return data.map((datum) => {
    return {
      id: datum.id,
      originId: datum.id,
      name: datum.name,
    };
  });
};
