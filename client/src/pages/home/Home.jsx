import './home.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertyList/PropertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import Footer from '../../components/footer/Footer'
import Divider from '../../components/divider/Divider'

const Home = () => {
    return (
        <div>
            <Navbar/>
            <Header/>
            <div className="homeContainer">
                <Featured/>
                <h1 className="homeTitle">
                    Browse
                    <PropertyList/>
                </h1>
                <h1 className="homeTitle">
                    Featured Properties and Location
                    <FeaturedProperties/>
                </h1>
                <Divider/>
                <Footer/>
            </div>
        </div>
    )
}

export default Home