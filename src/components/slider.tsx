import { Typography, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Item {
    id: string;
    image_url: string;
    description: string;
}

const Slider = ({ items, onChange, text, width }: { width: string, text: string ,items: Item[], onChange: (index: number) => void }) => {
    return (
        <Box my={4} width={width}>
            <Typography variant="h6" gutterBottom textAlign={"center"}>
                {text}
            </Typography>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSlideChange={(swiper) => onChange(swiper.activeIndex)}
                style={{ width: "100%", margin: "0" }}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Box textAlign="center">
                            <img src={item.image_url} alt={item.description} style={{ maxWidth: '300px', height: '300px' }} />
                            <Typography style={{ marginBottom: "30px" }}>{item.description}</Typography>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}

export default Slider