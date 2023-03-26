import {Link} from 'react-router-dom';

const RouteTest = ({children}) => {
    return (
        <div>
            <button> Options </button>
            {children}
            
            <Link to={"/"}> Home </Link>
            <br />
            <Link to={"/room/1"}> Room </Link>
            <br />
            <Link to={"/edit"}> Edit </Link>
            
        </div>
    )
}

export default RouteTest;