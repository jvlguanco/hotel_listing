import { useState } from 'react'
import { useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import './rating.css'

const Rating = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const handleClick = () => {
        axios.post(`/hotels/review`, {rating: rating, hotelId: id})
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <div className="rating">
            <h1>Rate this hotel</h1>
            <div className="rStar">
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                        <label>
                            <input type="radio" className="rRadio" value={ratingValue} onClick={() => setRating(ratingValue) }/>
                            <FontAwesomeIcon icon={faStar} className="star" color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} size="2x" onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)}/>
                        </label>
                    );
                })}
            </div>
            <button onClick={handleClick} className="rBtn">Submit Rating</button>
        </div>
    )
}

export default Rating