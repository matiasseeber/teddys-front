import { FC, useState, useEffect, useContext } from 'react';
import { Typography, Container, Link } from '@mui/material';
import { MuiColorInput } from 'mui-color-input'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';
import endpoints from '../resources/endpoints';
import { TokenContext } from '../App';
import Slider from './slider';
import colors from '../resources/colors';
import { useNavigate } from 'react-router-dom';


interface Animal {
    id: string;
    image_url: string;
    description: string;
}

interface Accessory {
    id: string;
    image_url: string;
    description: string;
}

interface Resources {
    animals: Animal[];
    accessories: Accessory[];
}

interface UserTeddyPayload {
    animal_id: string;
    accessory_id: string;
    hex: string;
}

const NewTeddy: FC = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [accessories, setAccessories] = useState<Accessory[]>([]);
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const [selectedAccessory, setSelectedAccessory] = useState<Accessory | null>(null);
    const [hex, setHex] = useState('#ffffff');
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (newValue: string) => {
        setHex(newValue)
    }
    const { token } = useContext(TokenContext);

    const fetchResources = async (): Promise<Resources> => {
        const { method, url } = endpoints.resources;
        const response = await axios.request({ method, url, headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    };

    useEffect(() => {
        const getData = async () => {
            const data = await fetchResources();
            setAnimals(data.animals);
            setAccessories(data.accessories);
            setSelectedAnimal(data.animals[0]);
            setSelectedAccessory(data.accessories[0]);
        };
        getData();
    }, []);

    const handleAnimalChange = (index: number) => {
        setSelectedAnimal(animals[index]);
    };

    const handleAccessoryChange = (index: number) => {
        setSelectedAccessory(accessories[index]);
    };

    const saveUserTeddy = async () => {
        if(message != "") return;

        const payload: UserTeddyPayload = {
            accessory_id: selectedAccessory!.id,
            animal_id: selectedAnimal!.id,
            hex: hex
        };

        const { method, url } = endpoints.createTeddy;

        try {
            await axios.request({ method, url, data: payload, headers: { Authorization: `Bearer ${token}` } });
            setMessage('Peluche creado correctamente, redirigiendo al home en 5 segundos...');
            setTimeout(() => {
                navigate("/");
            }, 5000)
        } catch (error) {
            console.error('Error:', error);
            setError("Hubo un error inesperado creando el peluche.");
        }
    }

    return (
        <Container style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", paddingBottom: "70px" }}>
            <Typography variant="h4" gutterBottom width={"100%"} textAlign={"center"} marginTop={"20px"}>
                Seleccionar Animal, Accesorio y Color
            </Typography>

            <Slider items={animals} onChange={handleAnimalChange} text='Seleccionar un animal' />
            <Slider items={accessories} onChange={handleAccessoryChange} text='Seleccionar un animal' />
            <div style={{ width: "100%" }}>
                <MuiColorInput format='hex8' value={hex} onChange={handleChange} />
            </div>
            <div style={{ width: "100%" }}>
                <Typography variant="h4" gutterBottom textAlign={"center"} marginTop={"20px"}>
                    Resumen:
                </Typography>
                <Typography variant="h5" gutterBottom textAlign={"left"} margin={"20px 0"}>
                    Animal: {selectedAnimal?.description}
                </Typography>
                <Typography variant="h5" gutterBottom textAlign={"left"} margin={"20px 0"}>
                    Accesorio: {selectedAccessory?.description}
                </Typography>
                <Typography variant="h5" gutterBottom textAlign={"left"} margin={"20px 0"}>
                    Color: <span style={{ backgroundColor: hex, width: "fit-content" }}>{hex}</span>
                </Typography>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <Link style={{
                        width: "40%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                        padding: "10px", color: "white", textDecoration: 'none', margin: "0 20px",
                        backgroundColor: colors.backgroundColor
                    }} className="link-btn" onClick={saveUserTeddy}>
                        Guardar
                    </Link>
                </div>
                {
                    message != "" && <p style={{ color: "green", marginTop: "5px", width: "100%", textAlign: "center" }}>{message}</p>
                }
                {
                    error != "" && <p style={{ color: "red", marginTop: "5px", width: "100%", textAlign: "center" }}>{error}</p>
                }
            </div>
        </Container>
    );
};

export default NewTeddy;
