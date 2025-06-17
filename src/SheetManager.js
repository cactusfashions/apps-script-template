// SheetManager class to manage Google Sheet operations with clean error and response handling
class SheetManager {
    constructor(spreadsheetId, sheetName) {
        const spreadsheet = spreadsheetId
            ? SpreadsheetApp.openById(spreadsheetId)
            : SpreadsheetApp.getActiveSpreadsheet();

        this.sheet = sheetName
            ? spreadsheet.getSheetByName(sheetName)
            : spreadsheet.getActiveSheet();

        if (sheetName && !this.sheet) {
            throw new ScriptError(404, `Sheet "${sheetName}" could not be found.`);
        }
    }

    // Get header mapping from a given row (default: row 1)
    getHeaders(row = 1) {
        try {
            const headerRow = this.sheet
                .getRange(row, 1, 1, this.sheet.getLastColumn())
                .getValues()[0];

            const headerMap = headerRow.reduce((obj, header, index) => {
                if (typeof header === "string" && header.length > 0) {
                    obj[header.toLowerCase().trim()] = index;
                }
                return obj;
            }, {});

            return new ScriptResponse(200, headerMap, "Headers fetched successfully");
        } catch (error) {
            throw new ScriptError(500, error.message, error);
        }
    }

    // Get all data mapped with header keys using batch processing
    getDataInBatches(header, batchSize = 500) {
        if (!header || Object.keys(header).length === 0) {
            throw new ScriptError(400, "Header cannot be empty");
        }

        try {
            const lastRow = this.sheet.getLastRow();
            const lastColumn = this.sheet.getLastColumn();
            if (lastRow < 2) {
                return new ScriptResponse(200, [], "No data found");
            }

            const allData = [];
            for (let start = 2; start <= lastRow; start += batchSize) {
                const numRows = Math.min(batchSize, lastRow - start + 1);
                const batchData = this.sheet.getRange(start, 1, numRows, lastColumn).getValues();

                const mappedBatch = batchData.map(row => {
                    const rowData = {};
                    for (const key in header) {
                        rowData[key] = row[header[key]];
                    }
                    return rowData;
                });

                allData.push(...mappedBatch);
            }

            return new ScriptResponse(200, allData, "Data fetched in batches successfully");
        } catch (error) {
            throw new ScriptError(500, error.message, error);
        }
    }

    // Wrapper for backward compatibility
    getData() {
        try {
            const headerResp = this.getHeaders();
            if (!headerResp || !headerResp.data || Object.keys(headerResp.data).length === 0) {
                throw new ScriptError(400, "Header row could not be read or is empty");
            }
            const header = headerResp.data;
            return this.getDataInBatches(header);
        } catch (error) {
            throw new ScriptError(500, error.message, error);
        }
    }

    // Find the first empty row from row 2
    getLastEmptyRow() {
        try {
            const lastRow = this.sheet.getLastRow();
            const lastColumn = this.sheet.getLastColumn();

            const sheetData = this.sheet.getRange(2, 1, lastRow, lastColumn).getValues();

            const rowNumber = sheetData.findIndex((row) => row.every((cell) => cell === null || cell === ""));
            const result = rowNumber === -1 ? lastRow + 1 : rowNumber + 2;

            return new ScriptResponse(200, result, "Next empty row identified");
        } catch (error) {
            throw new ScriptError(500, error.message, error);
        }
    }

    // Append data to sheet using rowData array and optional headers
    appendRowData(rowData, headers = {}) {
        if (!rowData || rowData.length === 0) {
            throw new ScriptError(400, "No data provided to append to sheet");
        }

        if (!headers || Object.keys(headers).length === 0) {
            const headerResp = this.getHeaders();
            if (!headerResp || !headerResp.data || Object.keys(headerResp.data).length === 0) {
                throw new ScriptError(400, "No headers found to append data");
            }
            headers = headerResp.data;
        }

        const headersKey = Object.keys(headers);
        const newRows = [];

        for (let i = 0; i < rowData.length; i++) {
            const tempRow = [];
            for (let j = 0; j < headersKey.length; j++) {
                const headerName = headersKey[j];
                const colIndex = headers[headerName];
                tempRow[colIndex] = rowData[i][headerName] ?? "";
            }
            newRows.push(tempRow);
        }

        try {
            const rowResp = this.getLastEmptyRow();
            const startRow = rowResp.data;

            // Copy formatting and formulas from the row above if it exists
            if (startRow > 2) {
                const formatSource = this.sheet.getRange(startRow - 1, 1, 1, headersKey.length);
                const formatTarget = this.sheet.getRange(startRow, 1, newRows.length, headersKey.length);
                formatSource.copyTo(formatTarget, SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
                formatSource.copyTo(formatTarget, SpreadsheetApp.CopyPasteType.PASTE_FORMULA, false);
            }

            this.sheet.getRange(startRow, 1, newRows.length, headersKey.length).setValues(newRows);
            return new ScriptResponse(200, { startRow }, `Rows appended successfully at row no: ${startRow}`);
        } catch (error) {
            throw new ScriptError(500, error.message, error);
        }
    }

    // Update a single cell
    updateCell(row, column, value) {
        if (typeof row !== "number" || row < 1) {
            throw new ScriptError(400, "Row number must be a positive integer (1-based index)");
        }
        if (typeof column !== "number" || column < 1) {
            throw new ScriptError(400, "Column number must be a positive integer (1-based index)");
        }
        if (value === null || value === undefined) {
            throw new ScriptError(400, "Value is required to update the cell");
        }

        try {
            this.sheet.getRange(row, column).setValue(value);
            SpreadsheetApp.flush();
            return new ScriptResponse(200, value, `Cell updated successfully at row: ${row}, column: ${column}`);
        } catch (error) {
            throw new ScriptError(500, error.message, error);
        }
    }

    // Delete a specific row from the sheet
    deleteRow(row) {
        if (typeof row !== "number" || row < 2) {
            throw new ScriptError(400, "Row number must be greater than or equal to 2 (cannot delete header row)");
        }

        try {
            this.sheet.deleteRow(row);
            SpreadsheetApp.flush();
            return new ScriptResponse(200, row, `Row ${row} deleted successfully.`);
        } catch (error) {
            throw new ScriptError(500, error.message, error);
        }
    }

    // Filter rows by multiple column values
    filterRowsByColumnValues(criteria = {}) {
        try {
            const dataResp = this.getData();
            if (!dataResp.success) throw new ScriptError(500, "Failed to fetch sheet data");

            const filtered = dataResp.data.filter(row => {
                return Object.entries(criteria).every(([key, value]) => {
                    return row[key.toLowerCase()] === value;
                });
            });

            return new ScriptResponse(200, filtered, `Filtered rows by provided criteria`);
        } catch (error) {
            throw new ScriptError(500, error.message, error);
        }
    }
}
