import { dateScalar } from "@/pages/api/schemas/scalars";
import { getCSVData } from "@/lib/getCSVData";
import {
  DATA_MAPPING_TYPES,
  mapData,
  PatientTypeGraph,
  type ClinicTypeGraph,
  type ClinicTypeSource,
} from "@/lib/dataMapping";
import { getPatientData } from "@/lib/patientData";
import { getClinicData } from "@/lib/clinicData";

export const resolvers = {
  Date: dateScalar,
  Clinic: {
    patients: async (clinic: ClinicTypeGraph) => {
      const clinicPatientData = await getPatientData(clinic.id);

      return mapData({
        type: DATA_MAPPING_TYPES.PATIENT,
        source: clinicPatientData,
      });
    },
  },
  Patient: {
    clinic: async (patient: PatientTypeGraph) => {
      const allClinicData = await getClinicData();
      const formattedClinicData = mapData({
        type: DATA_MAPPING_TYPES.CLINIC,
        source: allClinicData,
      });

      const foundClinic = formattedClinicData.find((clinic) => {
        return clinic.id === patient.clinicId;
      });

      return foundClinic;
    },
  },
  Query: {
    getPatient: async (_: never, args: { id: string }) => {
      const allPatientData = await getPatientData();
      return mapData({
        type: DATA_MAPPING_TYPES.PATIENT,
        source: allPatientData,
      }).find((patient) => {
        return patient.id === args.id;
      });
    },

    getClinic: async (_: never, args: { id: string }) => {
      const clinics = await getCSVData<ClinicTypeSource>("clinics.csv");

      return mapData({
        type: DATA_MAPPING_TYPES.CLINIC,
        source: clinics.content,
      }).find((clinic) => {
        return clinic.id === args.id;
      });
    },

    getClinics: async () => {
      const clinics = await getCSVData<ClinicTypeSource>("clinics.csv");

      return mapData({
        type: DATA_MAPPING_TYPES.CLINIC,
        source: clinics.content,
      });
    },
  },
};
