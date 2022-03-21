import React, { Component } from "react";
import UserService from "../services/user.service";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import "bootstrap/dist/css/bootstrap.min.css";
import  ExportToExcel  from './export-to-excel.component'
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class SalesData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      sumRevenue: null,
      sumSalesQy: null,
      fromDate: "",
      toDate: "",
      h1Id: "",
      loading: false,
    };
    this.onChangeFromDate = this.onChangeFromDate.bind(this);
    this.onChangeToDate = this.onChangeToDate.bind(this);
    this.onChangeHeirarchy1Id = this.onChangeHeirarchy1Id.bind(this);
    this.getSalesData = this.getSalesData.bind(this);
  }
  componentDidMount() {}

  // Gets sales data with axios and displays in UI.
  getSalesData(e) {
    e.preventDefault();
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      UserService.getSalesData(
        this.state.fromDate,
        this.state.toDate,
        this.state.h1Id
      ).then(
        (response) => {
          console.log(response.data);
          this.setState({
            sumRevenue: response.data[0].sum_revenue,
            sumSalesQy: response.data[0].sum_sales_qy,
          });
          console.log(this.state.sumRevenue);
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

  onChangeHeirarchy1Id(e) {
    this.setState({
      h1Id: e.target.value,
    });
  }

  render() {
    const { sumRevenue, sumSalesQy } = this.state;
    return (
      <div className="card card-container">
        <header className="jumbotron">
          <h3>Please enter the form to get total sales and revenue</h3>
        </header>
        <Form
          onSubmit={this.getSalesData}
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
            <label htmlFor="h1Id">Heiarchy1 ID</label>
            <Input
              type="text"
              className="form-control"
              name="h1Id"
              value={this.state.h1Id}
              onChange={this.onChangeHeirarchy1Id}
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
              <span>Get sales</span>
            </button>
          </div>
          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
        </Form>
        {sumRevenue && sumSalesQy ? (
          <div>
          <div className="list-group">
              <h4 className="list-group-item-heading">Total Revenue</h4>
              <p className="list-group-item-text">
                {this.state?.sumRevenue}   
              </p>
          </div>
          <div className="list-group">
              <h4 className="list-group-item-heading">Total Sales</h4>
              <p className="list-group-item-text">
              {this.state?.sumSalesQy}   
              </p>
          </div>
          <ExportToExcel 
            revenue={this.state.sumRevenue}
            sales={this.state.sumSalesQy}
            isFromSales={true}
          />
        </div>
        ) : (
          <div></div>
        )}
        
      </div>
    );
  }
}

