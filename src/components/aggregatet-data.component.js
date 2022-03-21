import React, { Component } from "react";
import UserService from "../services/user.service";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import "bootstrap/dist/css/bootstrap.min.css";
import AggregatedTable from "./aggregated-table.component";
import ExportToExcel from "./export-to-excel.component";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export default class AggregatedData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      fromDate: "",
      toDate: "",
      cityId: "",
      data: [],
      dataIsFetched: false,
    };
    this.onChangeFromDate = this.onChangeFromDate.bind(this);
    this.onChangeToDate = this.onChangeToDate.bind(this);
    this.onChangeCityId = this.onChangeCityId.bind(this);
    this.getAggregatedData = this.getAggregatedData.bind(this);
  }
  componentDidMount() {}

  // Gets data from API with axios.
  getAggregatedData(e) {
    e.preventDefault();
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      UserService.getAggregatedSalesData(
        this.state.fromDate,
        this.state.toDate,
        this.state.cityId
      ).then(
        (response) => {
          this.setState({ data: response.data.data });
          this.setState({ dataIsFetched: true });
        },
        (error) => {
          this.setState({
            content:
              (error.response && error.response.data) ||
              error.message ||
              error.toString(),
          });
        }
      );
    }
  }
  // Sets state based on input.
  onChangeFromDate(e) {
    this.setState({
      fromDate: e.target.value,
    });
  }

  onChangeToDate(e) {
    this.setState({
      toDate: e.target.value,
    });
  }

  onChangeCityId(e) {
    this.setState({
      cityId: e.target.value,
    });
  }
  render() {
    return (
      <div>
        <div className="card card-container">
          <header className="jumbotron">
            <h3>Please fill out the form to watch aggregated data</h3>
          </header>
          <Form
            onSubmit={this.getAggregatedData}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="fromDate">From</label>
              <Input
                type="text"
                className="form-control"
                name="fromDate"
                value={this.state.fromDate}
                onChange={this.onChangeFromDate}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fromDate">To</label>
              <Input
                type="text"
                className="form-control"
                name="fromDate"
                value={this.state.toDate}
                onChange={this.onChangeToDate}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cityId">City ID</label>
              <Input
                type="text"
                className="form-control"
                name="cityId"
                value={this.state.cityId}
                onChange={this.onChangeCityId}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary btn-block mt-3 mb-3"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Get data</span>
              </button>
            </div>
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
        {this.state.content.message ? (
          <div>{this.state.content.message}</div>
        ) : (
          <div></div>
        )}
        {this.state.dataIsFetched ? (
          <div>
            <ExportToExcel
              aggregatedData={this.state.data}
              isFromSales={false}
            />
            <AggregatedTable apiData={this.state.data} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
