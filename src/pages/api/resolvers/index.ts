import { dateScalar } from "@/pages/api/schemas/scalars";
import { getCSVData } from "@/lib/getCSVData";
import {
  DATA_MAPPING_TYPES,
  mapData,
  type ClinicTypeSource,
  type PatientTypeSource,
} from "@/lib/dataMapping";

export const resolvers = {
  Date: dateScalar,
  Query: {
    getUser: async () => {
      return {
        id: "1",
        login: "kirgy",
        avatar_url: "https://avatars.githubusercontent.com/u/3931356?v=4",
      };
    },
    getPatient: async (_, args: { id: string }) => {
      const patiantSource1 = await getCSVData<PatientTypeSource>(
        "patients-1.csv"
      );

      const patiantSource2 = await getCSVData<PatientTypeSource>(
        "patients-2.csv"
      );
      const allPatiantSources = [];
      allPatiantSources.push(...patiantSource1.content);
      allPatiantSources.push(...patiantSource2.content);

      return mapData({
        type: DATA_MAPPING_TYPES.PATIENT,
        source: allPatiantSources,
      }).find((patient) => {
        return patient.id === args.id;
      });
    },

    getClinic: async (_, args: { id: string }) => {
      const clinic = await getCSVData<ClinicTypeSource>("clinics.csv");

      return mapData({
        type: DATA_MAPPING_TYPES.CLINIC,
        source: clinic.content,
      }).find((clinic) => {
        return clinic.id === args.id;
      });
    },
  },
};
