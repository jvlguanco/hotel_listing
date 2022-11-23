import './featuredProperties.css'
import useFetch from '../../hooks/useFetch'

const FeaturedProperties = () => {
    const {data, loading, error} = useFetch(`/hotels?featured=true&limit=4`);

    const round = (value, decimals) => {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }

    return (
        <div className="fp">
            {loading ? ("Loading...") : error ? "Error" : (
                <>
                    {data.map(item=>(
                        <div className="fpItem" key={item._id}>
                            <img src={item.photos[0]} alt="" className="fpImg" />
                            <span className="fpName">{item.name}</span>
                            <span className="fpCity">{item.city}</span>
                            <span className="fpPrice">Starting from ₱{item.cheapestPrice}</span>
                            {item.ratings &&
                                <div className="fpRate">
                                    <button>{round(item.ratings, 0)}/5</button>
                                    <span>Rating</span>
                                </div>
                            }
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default FeaturedProperties