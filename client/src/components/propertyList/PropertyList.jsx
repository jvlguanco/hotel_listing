import './propertyList.css'
import useFetch from '../../hooks/useFetch'

const PropertyList = () => {
    const {data, loading, error} = useFetch("/hotels/countByType");

    const images = [
        "https://media-cdn.tripadvisor.com/media/photo-s/1d/30/3d/5c/diamond-hotel-philippines.jpg",
        "https://pix10.agoda.net/hotelImages/315/315818/315818_14080821480020956947.jpg?ca=2&ce=1&s=768x1024",
        "https://www.crownasia.com.ph/assets/blogs/a40ce49eeb/Condo-shot-in-the-night.jpg",
        "http://cdn.cnn.com/cnnnext/dam/assets/170303105908-siargao-bleu-resort--spa-remote-resorts-philippines.jpg"

    ]

    return (
        <div className="pList">
            { loading ? ("Loading...") : error ? "Error" : (
                <>
                    {data && images.map((img,i) => (
                            <div className="pListItem">
                            <img src={img} alt="" className="pListImg" />
                            <div className="pListTitle">
                                <h1>{data[i]?.type}</h1>
                                <h2>{data[i]?.count} {data[i]?.type}</h2>
                            </div>
                            </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default PropertyList