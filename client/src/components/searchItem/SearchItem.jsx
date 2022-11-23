import './searchItem.css'
import {Link} from 'react-router-dom'

const SearchItem = ({item}) => {
    const round = (value, decimals) => {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    return (
        <div className="searchItem">
            <img src={item.photos[0]} alt="" className="siImg" />
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">{item.distance}</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                Studio Apartment with Air conditioning
                </span>
                <span className="siFeatures">{item.description}</span>
                <span className="siCancelOp">Free cancellation </span>
                <span className="siCancelOpSubtitle">
                You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="siDetails">
                {item.ratings &&
                    <div className="siRate">
                        <button>{round(item.ratings, 0)}/5</button>
                        <h6>Rating</h6>
                    </div>
                }
                <div className="siDetailText">
                    <span className="siPrice">₱{item.cheapestPrice}</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <Link to={`/hotels/${item._id}`}>
                    <button className="siCheckBtn">See Availability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchItem