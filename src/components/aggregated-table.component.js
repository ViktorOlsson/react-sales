import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

export default class AggregatedTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
      // Defines what columns should go with what API data.
    const columns = [
        {
            dataField: 'city_id',
            text: 'City ID'
        },
        {
            dataField: 'hierarchy1_id',
            text: 'Hierarchy1 ID'
        },
        {
            dataField: 'sales',
            text: 'Sales',
        },
        {
            dataField: 'year-month',
            text: 'Year and Month'
        }
    ];
    // Sorts data based on hierarchy1_id for easier review of data.
    const sortedData = this.props?.apiData.sort((a, b) => {
        if (a.hierarchy1_id < b.hierarchy1_id) { 
            return -1;
        } else if (a.hierarchy1_id > b.hierarchy1_id) {
            return 1;
        } else {
            return null;
        }
    });
    return (
        // Shows table if there is data else show nothing.
      <div>
        {this.props?.apiData ? (
          <BootstrapTable
          keyField="id"
          data={sortedData}
          columns={columns}
          striped
          hover
          condensed
        />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
