import { Link } from 'react-router-dom'

interface LogoProps {
    className?: string
}

const Logo = ({ className = 'h-10 rounded-xl' }: LogoProps) => {
    return (
        <Link to='/'>
            <img src='/logo.jpg' alt='Logo' className={className} />
        </Link>
    )
}

export default Logo
