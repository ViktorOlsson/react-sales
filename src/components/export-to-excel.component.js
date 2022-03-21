import { Component } from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";

export default class ExportToExcel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // Function for exporting file as CSV.
  exportToCSV() {
    let propsData;
    if (this.props.isFromSales) {
      propsData = [
        {
          sales: this.props.sales,
          revenue: this.props.revenue,
        },
      ];
    } else if (!this.props.isFromSales) {
      propsData = this.props.aggregatedData;
      console.log(propsData);
    }

    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(propsData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "sales" + fileExtension);
  }

  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-block mt-3 mb-3"
          onClick={(e) => this.exportToCSV()}
        >
          <span>Export to excel</span>
        </button>
      </div>
    );
  }
}
