import './error.scss';
import cloude from '../img/267726269019211.png';
import { Link } from 'react-router-dom';

const Error = () => {
    return(
        <div className="error_wrapper">
            <img src={cloude} alt="cloude"/>
            <h1> 404 </h1>
           <Link to='/'>go back</Link>
        </div>
    )
}

export default Error;