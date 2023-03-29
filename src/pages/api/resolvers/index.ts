import { dateScalar } from "@/pages/api/schemas/scalars";
import { promises as fs } from "fs";
import path from "path";
import * as csv from "fast-csv";
import { getCSVData } from "@/lib/getCSVData";
import {
  DATA_MAPPING_TYPES,
  mapData,
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
    getPatient: async () => {
      const patiant = await getCSVData<PatientTypeSource>("patients-1.csv");

      return mapData({
        type: DATA_MAPPING_TYPES.PATIENT,
        source: patiant.content,
      })[1];
    },
  },
};
