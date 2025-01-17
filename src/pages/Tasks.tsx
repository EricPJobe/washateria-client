import { useEffect, useState } from "react";
import DataGrid from "../components/common/DataGrid";
import { Link as RouterLink } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import "../styles/layout.css"

interface RowData {
    name: string;
    description: string;
    status: string;
    tags: string; // TODO: convert to array
    due_ts: string;
    created_ts: string;
    updated_ts: string;
    is_active: string;
}

export function Tasks () {
    const [rows, setRows] = useState<RowData[]>([]);
    const url = "http://localhost:4001/api/v1/task";

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
                        to="/tasks/0">Add New
                    </Button>
                </div>
            </div>
            <div className={'list-container'}>
                { rows.length > 0 && <DataGrid 
                                        title="Tasks"
                                        data={rows}
                                     />}
                 { rows.length === 0 && <Typography component="h3">No Tasks found</Typography> }
            </div>
        </div> 
    );
}