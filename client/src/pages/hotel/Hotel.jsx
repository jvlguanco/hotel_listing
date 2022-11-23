import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import './hotel.css'
import Divider from '../../components/divider/Divider'
import Footer from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { SearchContext } from '../../components/context/SearchContext'
import { AuthContext } from '../../components/context/AuthContext'
import Reserve from '../../components/reserve/Reserve'
import Rating from '../../components/ratings/Rating'

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const {data, loading, error} = useFetch(`/hotels/find/${id}`);
  const [open, setOpen] = useState(false);

  const {dates, option} = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(startDate, endDate) {
    const timeDiff = Math.abs(startDate.getTime() - endDate.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = (dayDifference(dates[0].endDate, dates[0].startDate));

  const handleClick = () => {
      if(user){
        setOpen(true);
      }else{
        navigate('/login');
      }
    }

  return (
    <div>
      <Navbar/>
      <Header type='list'/>
      {loading ? ("Loading...") : error ? "Error" : (
        <>
          <div className="hotelContainer">
            <div className="hotelWrapper">
              <button onClick={handleClick} className="bookNow">Reserve or Book Now!</button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot}/>
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">
                {data.distance}
              </span>
              <span className="hotelPricing">
                Book a stay for ₱{data.cheapestPrice}/night
              </span>
              <div className="hotelImages">
                {data.photos?.map((photo) => (
                  <div className="hotelImgWrapper">
                    <img src={photo} alt="" className='hotelImg'/>
                  </div>
                  ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailText">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">{data.description}</p>
                </div>
                <div className="hotelDetailPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Book now in order to reserve your stay at {data.name}! Thank you and have a safe trip!
                  </span>
                  <h2>
                    <b>₱{days * data.cheapestPrice * option.room}</b> ({days} night)
                  </h2>
                  <button onClick={handleClick}>Reserve Or Book Now!</button>
                </div>
              </div>
            </div>
            <Rating/>
            <Divider/>
            <Footer/>
          </div> 
      </>)}
      {open && <Reserve open={open} setOpen={setOpen} hotelId={id}/>}
    </div>
  )
}

export default Hotel