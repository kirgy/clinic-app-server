export enum DATA_MAPPING_TYPES {
  PATIENT = "PATIENT",
}

export type PatientTypeSource = {
  id: string;
  clinic_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
};

type DataMappingInput = {
  type: DATA_MAPPING_TYPES.PATIENT;
  source: Array<PatientTypeSource>;
};

type PatientTypeGraph = {
  id: string;
  clinicId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};

export const mapData = ({ type, source }: DataMappingInput) => {
  switch (type) {
    case DATA_MAPPING_TYPES.PATIENT:
      return formatPatiantData(source);
  }

  return type as never;
};

const formatPatiantData = (
  data: Array<PatientTypeSource>
): Array<PatientTypeGraph> => {
  return data.map((datum) => {
    return {
      id: datum.id,
      clinicId: datum.clinic_id,
      firstName: datum.first_name,
      lastName: datum.last_name,
      dateOfBirth: new Date(datum.date_of_birth),
    };
  });
};
