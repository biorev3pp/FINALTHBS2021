import {React, useState, useEffect, useMemo} from 'react';
import { useSelector } from 'react-redux';
import DataTable from "react-data-table-component";
import columns from './Columns';

const ExpandedComponent = ({ data }) => <><div className="row my-2">
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 ">
            <table className="table table-bordered table-condensed table-striped">
                <tbody>
                    <tr><th style={{width:'50%'}}>First Name</th><td>{ data.first_name }</td></tr>
                    <tr><th>Last Name</th><td>{ data.last_name }</td></tr>
                    <tr><th>Company Name</th><td>{ data.company }</td></tr>
                    <tr><th>Segment Name</th><td>{ data.segment }</td></tr>
                    <tr><th>Email Name</th><td>{ data.email }</td></tr>
                    <tr><th>Contact No</th><td>{ data.mobile }</td></tr>
                </tbody>
            </table>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 ">
            <table className="table table-bordered table-condensed table-striped">
                <tbody>
                    <tr><th style={{width:'50%'}}>Interest</th><td>{ data.products }</td></tr>
                    <tr><th>Contact Mode</th><td>{ data.contact_mode }</td></tr>
                    <tr><th>Contact Time</th><td>{ data.contact_after }</td></tr>
                    <tr><th>Comments</th><td>{ data.comments }</td></tr>
                    <tr><th>Agent Comments</th><td>{ data.agent_comment }</td></tr>
                    <tr><th>Tags</th><td>{ data.tags }</td></tr>
                </tbody>
            </table>
        </div>
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 ">
            <table className="table table-bordered table-condensed table-striped">
                <tbody>
                    <tr><th style={{width:'50%'}}>Date</th><td>{ data.predefined_date }</td></tr>
                    <tr><th>Start Time</th><td>{ data.start_time }</td></tr>
                    <tr><th>End Time</th><td>{ data.end_time }</td></tr>
                    <tr><th>Actual Date</th><td>{ data.actual_date }</td></tr>
                </tbody>
            </table>
        </div>
    </div></>;



const Posts = () => {
    const [pending, setPending] = useState(true);
	const [rows, setRows] = useState([]);
    const posts = useSelector((state) => state.posts);

    useEffect(() => {
		const timeout = setTimeout(() => {
			setRows(posts);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

    const CustomLoader = () => (
        <div className="fullpage-loader "> 
            <div className="spinner-grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    const convertArrayOfObjectsToCSV = (array) => {
        let result;
    
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(posts[0]);
    
        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;
    
        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;
    
                result += item[key];
                
                ctr++;
            });
            result += lineDelimiter;
        });
    
        return result;
    }
    
    const downloadCSV = (array) => {
        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;
    
        const filename = 'export.csv';
    
        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }
    
        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }
    
    
    const Export = ({ onExport }) => <button className="btn btn-sm btn-primary me-2" onClick={e => onExport(e.target.value)}>Export</button>;

    const paginationComponentOptions = {
        rangeSeparatorText: ' Out of ',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'All',
    };

    const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(posts)} />, []);

    const conditionalRowStyles = [
        {
            when: row => row.__v >= 1,
            style: {
                backgroundColor: 'rgba(63, 195, 128, 0.95)',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
    ];

    return (
        !posts.length ? 
            <div className="fullpage-loader "> 
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        : (
            <div className="data-list">
                <DataTable
                    title="Prospects"
                    columns={columns}
                    data={posts}
                    defaultSortFieldID={1}
                    pagination
                    selectableRows
                    dense
                    highlightOnHover
                    expandableRows 
                    fixedHeader={true}
                    progressPending={pending}
			        progressComponent={<CustomLoader />}
                    paginationPerPage={25}
                    paginationComponentOptions={paginationComponentOptions}
                    expandableRowsComponent={ExpandedComponent}
		            fixedHeaderScrollHeight={`calc(100vh - 170px)`}
                    actions={actionsMemo}
                    conditionalRowStyles={conditionalRowStyles}
                />
            </div>
        )
    );
};

export default Posts;
