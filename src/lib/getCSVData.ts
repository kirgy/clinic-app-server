import { promises as fs } from "fs";
import path from "path";
import * as csv from "fast-csv";

type GetCSVDataReturnType<DataFormat> = {
  filename: string;
  content: Array<DataFormat>;
};

export async function getCSVData<DataFormat>(
  filename: string
): Promise<GetCSVDataReturnType<DataFormat>> {
  const csvDirectory = path.join(process.cwd(), "./src/data/");
  const filePath = path.join(csvDirectory, filename);
  const fileContents = await fs.readFile(filePath, "utf8");
  const formattedCSVData = await formatCSVData<DataFormat>(fileContents).catch(
    (e) => {
      console.error("Error parsing CSV file", e);
      throw e;
    }
  );

  return {
    filename,
    content: formattedCSVData,
  };
}

const formatCSVData = async <CSVDataFormat>(content: string) => {
  return new Promise<Array<CSVDataFormat>>((resolve, reject) => {
    const rowData: Array<CSVDataFormat> = [];

    csv
      .parseString(content, { headers: true })
      .on("error", (error) => {
        console.error(error);
        reject(error);
      })
      .on("data", (row) => {
        rowData.push(row);
      })
      .on("end", (rowCount: number) => {
        resolve(rowData);
      });
  });
};
