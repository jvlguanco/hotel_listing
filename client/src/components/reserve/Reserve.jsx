import './reserve.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { useState, useContext } from 'react'
import { SearchContext } from '../../components/context/SearchContext'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({setOpen, hotelId}) => {
  const {data, loading, error} = useFetch(`/hotels/room/${hotelId}`);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const {dates} = useContext(SearchContext);
  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    const list = [];

    while(date <= end){
      list.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return list;
  }

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some(date => 
      alldates.includes(new Date(date).getTime()));

      return !isFound;
  }


  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRoom(checked ? [...selectedRoom, value] : selectedRoom.filter(item => item !== value));
  }

  const handleClick = async () => {
    try{
      selectedRoom.map((roomId) => {
        const res = axios.put(`/rooms/availability/${roomId}`, {dates: alldates})
        return res.date;
        });

        setOpen(false);
        navigate('/')
    }catch(err){

    }
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)}/>
        <span>Select your rooms: </span>
        {data.map(item=>(
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">
                {item.title}
              </div>
              <div className="rDesc">
              {item.description}
              </div>
              <div className="rMax">
              Max People: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">
              ₱{item.price}
              </div>
            </div>
            <div className="rSelectRoom">
            {item.roomNumber.map(roomNumber=>(
              <div className="room">
                  <label>{roomNumber.number}</label>
                  <input type="checkbox" disabled={!isAvailable(roomNumber)} value={roomNumber._id} onChange={handleSelect}/>
              </div>
            ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">Reserve Now!</button>
      </div>
    </div>
  )
}

export default Reserve