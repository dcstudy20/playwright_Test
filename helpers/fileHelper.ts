import fs from "fs";
import path from "path";
import{ parse } from "csv-parse/sync";

/**
 * This function reads a CSV file from the specified path and parses its content into an array of objects.
 * @param {string} filePath - The relative path to the CSV file.
 * @returns {Array<Object>} - An array of objects representing the parsed CSV data.
 */

// const csvFilePath = path.resolve(`${process.cwd()}/data/testdata.csv`);
// const csvDataStr = fs.readFileSync(csvFilePath,{ encoding: "utf-8"});

// const csvData = parse(csvDataStr, {
//     columns: true,
//     skip_empty_lines: true,
//     trim: true,
// })

// console.log(csvData);

//Making above code reusable i.e. creating a function to read csv file and return data in array of objects format
export function readCSVFile(filePath: string): any[] {
    const csvFilePath = path.resolve(`${process.cwd()}/data/${filePath}`);
    const csvDataStr = fs.readFileSync(csvFilePath, { encoding: "utf-8" });
    const csvData = parse(csvDataStr, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });
    return csvData;
}
