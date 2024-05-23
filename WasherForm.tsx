/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from "luxon"

import "../styles/layout.css"
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";

interface FormData {
    designation: string;
    manufacturer: string;
    model_number: string;
    is_active: boolean;
}

export default function WasherForm () {
    const navigate = useNavigate();
    const [date, setDate] = useState<DateTime | null>(DateTime.now().setZone('America/Chicago'));
    const [formData, setFormData] = useState<FormData>({
        designation: '',
        manufacturer: '',
        model_number: '',
        is_active: true,
      });
    const {id} = useParams();
    const isNew = id === '0' ? true : false ;

    useEffect(() => {
        (async() => {
            try {
                if (!isNew) {
                    const response = await fetch(`http://localhost:4001/api/v1/washer/${id}`);
                    const resp = await response.json();
                    const data = resp.data;
                    setFormData({
                        designation: data.designation,
                        manufacturer: data.manufacturer,
                        model_number: data.model_number,
                        is_active: data.is_active,
                    });
                    setDate(DateTime.fromISO((data.last_maintenance_ts)));
                }
            } catch (err) {
                console.error('Error retrieving data: ', err);
            }
        })();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        //console.log(e.target);
        setFormData({
          ...formData,
          [name]: value,
        });
        // console.log(formData);
      };
    
      const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id === '0') {
            createNewWasher();
        } else {
            editWasher();
        }
      };

    const createNewWasher = async () => {
        const payload = {
           ...formData,
           last_maintenance_ts: date,
        };
        console.log(payload);
        const response = await fetch('http://localhost:4001/api/v1/washer', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        console.log(response);
        navigate("/washers");
    }

    const editWasher = async () => {
        const payload = {
            id,
            ...formData,
            last_maintenance_ts: date,
         };
         console.log(payload);
         const response = await fetch(`http://localhost:4001/api/v1/washer/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        console.log(response);
        navigate("/washers");
    }

    return (
        <div className="form-container">
            <div className="form-header">
                <div>
                    {
                        isNew 
                            ? <Typography variant="h4" gutterBottom>New Washer</Typography> 
                            : <Typography variant="h4" gutterBottom>Washer # {id}</Typography>
                    }
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-body">
                    <TextField
                        required
                        name="designation"
                        label="Designation"
                        value={formData.designation}
                        onChange={handleChange}
                        variant="outlined"
                        color="primary"
                        sx={{width: '400px', margin: '10px'}}
                    />
                    <TextField
                        required
                        name="manufacturer"
                        label="Manufacturer"
                        value={formData.manufacturer}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{width: '400px', margin: '10px'}}
                    />
                    <TextField
                        required
                        name="model_number"
                        label="Model Number"
                        value={formData.model_number}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{width: '400px', margin: '10px'}}
                    />
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                        <DatePicker 
                            sx={{width: '400px', margin: '10px'}}
                            label="Date of Last Maintenance"
                            value={date}
                            onChange={(newDate: DateTime | null) => setDate(newDate)}
                        />
                    </LocalizationProvider>
                    <FormControl>
                        <RadioGroup 
                            row 
                            name="is_active" 
                            value={formData.is_active}
                            onChange={handleChange}
                        >
                            <FormControlLabel value={true} control={<Radio />} label="Active" />
                            <FormControlLabel value={false} control={<Radio />} label="Inactive" />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="form-footer">
                    <Button 
                        type="submit"
                        variant="contained" 
                        sx={{m: 1}}
                        onClick={() => isNew ? createNewWasher : editWasher}>Save</Button>
                    <Button 
                        variant="contained"
                        color="error"
                        sx={{m: 1}}
                        component={RouterLink} 
                        to="/washers">Cancel</Button>
                </div>
            </form>
        </div>
    );
}
