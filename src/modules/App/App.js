import { BrowserRouter as Router, Routes , Route} from "react-router-dom";
import './app.scss';
import './media.scss';
import { ChoosingCityPage, WeatherPage } from "../Pages";
import Error from "../Error/Error";

const App = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<ChoosingCityPage/>}/>
                <Route path="/:idCity" element={<WeatherPage/>}/>
            </Routes>
        </Router>
    )
}

export default App;