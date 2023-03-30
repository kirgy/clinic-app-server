import { type PatientTypeSource } from "@/lib/dataMapping";
import { getCSVData } from "@/lib/getCSVData";

const patientsByOriginClinicId: Record<string, string> = {
  _1: "patients-1.csv",
  _2: "patients-2.csv",
};

export const getPatientData = async (clinicId?: string) => {
  const allPatiantSources = [];

  if (clinicId !== undefined) {
    const patiantSource = await getCSVData<PatientTypeSource>(
      patientsByOriginClinicId[`_${clinicId}`]
    );

    allPatiantSources.push(...patiantSource.content);
  } else {
    const recordKeys = Object.keys(patientsByOriginClinicId);
    for (let i = 0; i < recordKeys.length; i++) {
      const patiantSource = await getCSVData<PatientTypeSource>(
        patientsByOriginClinicId[recordKeys[i]]
      );

      allPatiantSources.push(...patiantSource.content);
    }
  }

  return allPatiantSources;
};
