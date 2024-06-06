import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import endpoints from '../resources/endpoints';
import { TokenContext } from '../App';

interface Accessory {
    id: string;
    image_url: string;
    description: string;
}

interface Animal {
    id: string;
    image_url: string;
    description: string;
}

interface DataItem {
    id: string;
    hex: string;
    user_id: string;
    animal_id: string;
    accessory_id: string;
    active: boolean;
    accessory: Accessory;
    animal: Animal;
}

const DataTable: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

    const { token } = useContext(TokenContext);

    const fetchResources = async (): Promise<DataItem[]> => {
        const { method, url } = endpoints.userTeddys;
        const response = await axios.request({ method, url, headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    };

    const getData = async () => {
        const response = await fetchResources();
        setData(response);
    }

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async (id: string) => {
        const { method, url } = endpoints.deleteTeddy;
        await axios.request({ method, url: url + `${id}`, headers: { Authorization: `Bearer ${token}` } });
        getData();
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TableContainer component={Paper} style={{ width: "80%", height: "80%" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Hex</TableCell>
                            <TableCell>Animal</TableCell>
                            <TableCell>Accessory</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell style={{ backgroundColor: row.hex }}>{row.hex}</TableCell>
                                <TableCell>
                                    <img src={row.animal.image_url} alt={row.animal.description} width="50" />
                                    {row.animal.description}
                                </TableCell>
                                <TableCell>
                                    <img src={row.accessory.image_url} alt={row.accessory.description} width="50" />
                                    {row.accessory.description}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(row.id)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Peluche eliminado exitosamente!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default DataTable;
