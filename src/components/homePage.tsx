import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import endpoints from "../resources/endpoints";
import colors from "../resources/colors";
import LinkBtn from "./linkBtn";
import { TokenContext } from "../App";

interface DashboardRow {
    id: string;
    image_url: string;
    description: string;
    count: number;
}

const columns = [
    "Animal",
    "Imagen",
    "Cantidad de veces elegido"
]

export const HomePage = () => {
    const [response, setApiResponse] = useState([] as DashboardRow[]);
    const { token: value } = useContext(TokenContext);

    const logged = value != "";

    const title = !logged ? "Inicie sesion para acceder a esta funcionalidad" : "";

    useEffect(() => {
        async function fetchData() {
            try {
                const response: DashboardRow[] = (await axios.request({ method: endpoints.dashboard.method, url: endpoints.dashboard.url })).data;
                setApiResponse(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <div style={{ height: "calc(100vh - 70px)", display: 'flex', justifyContent: 'space-around', alignItems: "center", flexDirection: "column", paddingBottom: "200px" }}>
            <h1 style={{ marginTop: "40px" }}>
                Animales mas elegidos
            </h1>
            <Table style={{ maxWidth: '80%', margin: "60px 0" }}>
                <TableHead>
                    <TableRow>
                        {
                            columns.map((item) => {
                                return <TableCell width={"33%"} align="center">{item}</TableCell>
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {response.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell align="center">{item.description}</TableCell>
                            <TableCell align="center"><img src={item.image_url} alt="" style={{ maxWidth: '100px' }} /></TableCell>
                            <TableCell align="center">{item.count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <LinkBtn backgroundColor={logged ? colors.backgroundColor : "lightGray"} title={title} disabled={!logged} text="Crear un nuevo peluche" to="newTeddy" />
                <LinkBtn backgroundColor={logged ? colors.backgroundColor : "lightGray"} title={title} disabled={!logged} text="Ver mis peluches guardados" to="teddys" />
            </div>
        </div>
    );
}

export default HomePage;
