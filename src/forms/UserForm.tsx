/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";

import "../styles/layout.css"

export default function UserForm () {
    const {id} = useParams();
    const isNew = id === '0' ? true : false ;

    const createNewWasher = async () => {

    }

    const editWasher = async () => {

    }
    
    return (
        <div className="">
            {isNew ? <h1>New Washer</h1> : <h1>Washer # {id}</h1>}
            <div className="form-footer">
                <Button onClick={() => isNew ? createNewWasher : editWasher}>Save</Button>
                <Button className="cancel-botton" component={RouterLink} to="washer">Cancel</Button>
            </div>
        </div>
    );
}