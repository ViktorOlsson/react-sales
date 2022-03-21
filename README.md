
To start application locally run in the root folder:
docker build -t sales-ui . && docker run --name sales-ui -p 3000:3000 sales-ui

## This application is built to display sales data to a logged in store manager.

A user must register and login to view relevant sales data.

There are four major view in the application

    1. The register view
        - User routes and registers with a name, email and password
        - The account is then created and the user is redirected to the login page
    2. The login view
        - User form that given a valid user will request a jwt token from the server
        - Redirects the user to the sales-data view
    3. Sales data view
        - User enters from date, to date and id to view relevant sales data for a product
        - Data is fetched with axios from the server and displayed below the form
        - The user may export the data to a CSV file.
    4. Aggregated data view
        - User enters same parameters as above but it is a city ID as the last parameter
        - Data is again fetched from server and displayed in a react-table since there 
          are more columns.
