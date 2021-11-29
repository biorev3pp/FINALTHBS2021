import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

export default [
    {
        name: "First Name",
        selector: (row) => row.first_name,
        sortable: false
    },
    {
        name: "Last Name",
        selector: (row) => row.last_name,
        sortable: false
    },
    {
        name: "Company",
        selector: (row) => row.company,
        sortable: false
    },
    {
        name: "Segment",
        selector: (row) => row.segment,
        sortable: false
    },
    {
        name: "Contact No",
        selector: (row) => row.mobile,
        sortable: false
    },
    {
        name: "Visit Date",
        selector: (row) => row.predefined_date,
        sortable: false
    },
    {
        name: "Start Time",
        selector: (row) => row.start_time,
        sortable: false
    },
    {
        name: "End Time",
        selector: (row) => row.end_time,
        sortable: false
    },
    {
        name: "Actual Time",
        selector: (row) => row.actual_date,
        cell: row => {return (row.actual_date === null)?'--':<><Moment tz="America/Phoenix" format="MMM D, HH:mm A" titleFormat="D MMM YYYY, HH:mm A" withTitle>{row}</Moment> </>},
        sortable: false
    },
];