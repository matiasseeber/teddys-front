import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const LinkBtn = ({ to, text, disabled, title, backgroundColor }: { to: string, text: string, disabled: boolean, backgroundColor: string, title?: string }) => {
    return (
        <Link to={to} style={{
            width: "40%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            padding: "10px 20px", color: "white", textDecoration: 'none', margin: "0 20px",
            backgroundColor: backgroundColor
        }}
            className={!disabled ? "link-btn" : ""}
            onClick={(e) => {
                if (disabled) e.preventDefault();
            }}
            title={title}
        >
            <Typography textAlign="center">{text}</Typography>
        </Link>
    )
}

export default LinkBtn