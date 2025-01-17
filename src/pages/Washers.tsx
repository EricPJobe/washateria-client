import { useEffect, useState } from "react";
import DataGrid from "../components/common/DataGrid";
import { Link as RouterLink } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import "../styles/layout.css"

interface RowData {
    designation: string;
    manufacturer: string;
    model_number: string;
    last_maintenance_ts: string;
    created_ts: string;
    updated_ts: string;
    is_active: string;
}

export function Washers () {
    const [rows, setRows] = useState<RowData[]>([]);
    const url = "http://localhost:4001/api/v1/washer";

    useEffect(() => {
        (async() => {
            try {
                const response = await fetch(url)
                const jsonResponse = await response.json();
                const data = jsonResponse.data
                console.log(data)
                setRows(data);
            } catch (err) {
                console.error("An Error occurred: ", err);
            }
        })();
    }, []);

    return (
        <div className={'flex-container'}>
            <div className={'new-button-row'}>
                <div>
                    <Button 
                        variant="contained"
                        component={RouterLink} 
                        to="/washers/0">Add New
                    </Button>
                </div>
            </div>
            <div className={'list-container'}>
                { rows.length > 0 && <DataGrid 
                                        title="Washers"
                                        data={rows}
                                     /> }
                { rows.length === 0 && <Typography component="h3">No washers found.</Typography> }
            </div>
        </div> 
    );
}