import './featured.css'
import useFetch from '../../hooks/useFetch'

const Featured = () => {

    const {data, loading, error} = useFetch("/hotels/countByIsland?islands=Luzon,Visayas,Mindanao")

    console.log(data);

    return (
        <div className="featured">
            {loading ? ("Loading...") : error ? "Error" : (
                <><div className="featuredItem">
                <img src="http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcQxo7UgRQnqyc8iEdd6EJ6SFw-sC0VCXkUOUzdjuzs5LJ6CVOYOwW2-O8T-URnOAyvB" alt="" className="featuredImg" />
                <div className="featuredTitle">
                    <h1>Luzon</h1>
                    <h2>{data[0]} properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://a.cdn-hotels.com/gdcs/production5/d320/a0c5a994-d99a-4278-a1b1-8a3b652461ac.jpg" alt="" className="featuredImg" />
                <div className="featuredTitle">
                    <h1>Visayas</h1>
                    <h2>{data[1]} properties</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://www.rappler.com/tachyon/r3-assets/5601060ED6E84AE081E3B4A08CB23DD3/img/97AB69B670CB4C1B8C83EE0FE2417DA8/Siargao-2-scaled.jpg" alt="" className="featuredImg" />
                <div className="featuredTitle">
                    <h1>Mindanao</h1>
                    <h2>{data[2]} properties</h2>
                </div>
            </div></>)}
        </div>
    )
}

export default Featured