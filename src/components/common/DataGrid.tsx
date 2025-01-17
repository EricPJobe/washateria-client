/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Link as RouterLink } from 'react-router-dom';
import { DateTime } from "luxon";

interface IProps {
    data: any[];
    title: string;
}

export default function DataGrid({ data, title }: IProps) {
    console.log(title);
    console.log(data)
    const tableHeaders = []
    for (const [key, _] of Object.entries<any>(data[0])) {
        const words = key.split('_');

        const formattedWords = words.map((word) => { 
            return word[0].toUpperCase() + word.substring(1); 
        });
        
        const formattedKey = formattedWords.join(' ');
        switch (formattedKey) {
            case 'Id':
                tableHeaders.push(<TableCell>{'ID'}</TableCell>);
                break;
            case 'Last Maintenance Ts':
                tableHeaders.push(<TableCell>{'Date of Last Maintenance'}</TableCell>);
                break;
            case 'Created Ts':
                tableHeaders.push(<TableCell>{'Date Created'}</TableCell>);
                break;
            case 'Updated Ts':
                tableHeaders.push(<TableCell>{'Date Updated'}</TableCell>);
                break;   
            default:
                tableHeaders.push(<TableCell>{formattedKey}</TableCell>);
        }
    }

    const rows = data.map(row => {
        const rowData = [];
        let formattedValue = '';
        for (const [key, value] of Object.entries<any>(row)) {
            if (key.includes("_ts")) {
                formattedValue = DateTime.fromISO(value).toLocaleString()
            } else if (key === 'is_active') {
                formattedValue = value === 'true' ? 'Active' : 'Inactive';
            } else {
                formattedValue = value;
            }
            rowData.push(<TableCell>{value ? formattedValue : ''}</TableCell>)
        }
        return (
            <TableRow
                sx={{textDecoration: "none"}} 
                component={RouterLink} 
                to={`${row.id}`}
                key={row.designation}>
                    {rowData.length > 0 ? rowData : []}
            </TableRow>
        );
    });
    return (
        <div className="grid-container">
            <Title>{title}</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {tableHeaders}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </div>
    );
}