import { type ClinicTypeSource } from "@/lib/dataMapping";
import { getCSVData } from "@/lib/getCSVData";

const clinicsByOriginClinicId: Record<string, string> = {
  _1: "clinics.csv",
};

export const getClinicData = async () => {
  const allClinicSources = [];

  const recordKeys = Object.keys(clinicsByOriginClinicId);
  for (let i = 0; i < recordKeys.length; i++) {
    const clinicSource = await getCSVData<ClinicTypeSource>(
      clinicsByOriginClinicId[recordKeys[i]]
    );

    allClinicSources.push(...clinicSource.content);
  }

  return allClinicSources;
};
