import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

export default class AggregatedTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props.apiData);
  }

  render() {
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
