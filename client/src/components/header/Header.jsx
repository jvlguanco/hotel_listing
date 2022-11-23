import './header.css'
import {useState, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faLocationDot, faHotel, faPerson, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {format} from 'date-fns'
import { useNavigate } from 'react-router-dom'
import {SearchContext} from '../context/SearchContext'
import { AuthContext } from '../context/AuthContext'


const Header = ({type}) => {
    const [destination, setDestination] = useState("")
    
    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [openOption, setOpenOption] = useState(false);
    const [option, setOption] = useState({
        adult:1,
        child:0,
        room:1
    });

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleOption = (name, operation) => {
        setOption((prev) =>{
            return{
                ...prev,
                [name]: operation === 'i' ? option[name] + 1 : option[name] - 1
            };
        });
    };

    const {dispatch} = useContext(SearchContext);
    
    const handleSearch = () => {
        dispatch({type: "NEW_SEARCH", payload:{destination, dates, option}});
        navigate('/hotels', {state: {destination, dates, option}});
    };

    return (
        <div className='header'>
            <div className={type === 'list' ? 'headerContainer listMode' : 'headerContainer'}>
                {/* <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faHotel} />
                        <span>Hotel</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Rooms</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>Location</span>
                    </div>
                </div> */}
                {type !== 'list' &&
                    <>
                        <h1 className="headerTitle">Hotel Listing</h1>
                        <p className="headerDesc">This is my final submission for the BPI Techvoc Backend Web Development. This project is made using MERN Stack. This contains the client folder, api folder, and the admin folder. You are currently in the client side folder. The list contains a total of 8 listing. 2 Hotels, 2 Apartments, 2 Resorts, 2 Condominium.</p>
                        {!user && (
                            <button onClick={()=>{navigate('/register')}} className="headerBtn">Sign in / Register</button>
                        )}
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faHotel} className="headerIcon"/>
                                <input 
                                type="text" 
                                placeholder='Search for a Place' 
                                className='headerSearchInput'
                                onChange={e=>setDestination(e.target.value)}
                                />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
                                <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    midDate={new Date()}
                                    className='headerDate'
                                />}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                                <span onClick={()=>setOpenOption(!openOption)} className="headerSearchText">{`${option.adult} Adult | ${option.child} Children | ${option.room} Room`}</span>
                                {openOption && <div className="options">
                                    <div className="optionItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCtn">
                                            <button disabled={option.adult <= 1} className="optionCntBtn" onClick={()=> handleOption("adult", "d")}>-</button>
                                            <span className="optionCtnNum">{option.adult}</span>
                                            <button className="optionCntBtn" onClick={()=> handleOption("adult", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCtn">
                                            <button disabled={option.child <= 0}  className="optionCntBtn" onClick={()=> handleOption("child", "d")}>-</button>
                                            <span className="optionCtnNum">{option.child}</span>
                                            <button className="optionCntBtn" onClick={()=> handleOption("child", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCtn">
                                            <button disabled={option.room <= 1}  className="optionCntBtn" onClick={()=> handleOption("room", "d")}>-</button>
                                            <span className="optionCtnNum">{option.room}</span>
                                            <button className="optionCntBtn" onClick={()=> handleOption("room", "i")}>+</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="headerSearchItem">
                                <button className="headerSearchBtn" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Header