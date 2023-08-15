import { getAllStoreDataThunk } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./HomePage.css"

function HomePage() {

    const dispatch = useDispatch()
    const allStoreData = useSelector((store) => store.store);

    const [activeIndex, setActiveIndex] = useState(0);


    const carouselPhotos = [
        "https://assets-global.website-files.com/624de812dd74b622858823f2/643f0d2c60e7071f9004133c_slideshow-presets.webp",
        "https://assets-global.website-files.com/624de812dd74b622858823f2/643f0d9244b77e2127359dce_slideshow-pro-presets.webp",
        "https://assets-global.website-files.com/624de812dd74b622858823f2/646289e797cffe7a8e7085f1_ss_Studio--opt.webp",
        "https://assets-global.website-files.com/624de812dd74b622858823f2/646289fb33290b47b6fcab13_ss_Spaces--opt.webp"
    ]

    useEffect(() => {
        if (!allStoreData.posts.length || !allStoreData.user.length || !allStoreData.comments.length || !allStoreData.journals.length) {
            async function fetchData() {
                await dispatch(getAllStoreDataThunk())
            }
            fetchData()
        }
    }, [dispatch, allStoreData]);


    useEffect(() => {
        function checkScroll() {
            const fadeInImages = document.querySelectorAll('.fade-in');
            fadeInImages.forEach(image => {
            const imageTop = image.getBoundingClientRect().top;
            if (imageTop <= window.innerHeight * 0.5 && imageTop >= -image.height) {
                image.classList.add('active');
            } else {
                image.classList.remove('active');
            }
            });
        }

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        checkScroll(); // Initial check when the page loads

        return () => {
            window.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);


    useEffect(() => {
        const intervalId = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex < carouselPhotos.length - 1 ? prevIndex + 1 : 0));
        }, 4000);

        return () => {
        clearInterval(intervalId);
        };
    }, [carouselPhotos.length]);


    const cyclePhotos = () => {
        return (
            <ul className="carousel-ul">
            {carouselPhotos.map((photo, index) => (
                <>
                    <li className={index === activeIndex ? 'active' : ''} key={index}>
                        <img alt={index} src={photo} width="350" height="600" />
                    </li>
                </>
            ))}
            </ul>
        );
    };


    return (
        <div id="home-page-main-component">

            <div id="logo-spacing-container">
                <div id="logo-container">
                    <h2>INTRODUCING</h2>
                    <h2>WSCO</h2>
                </div>
            </div>

            <div id="sub-logo-container">
                <h3>Your trusted photo and video editor for premium filters, <br/> professional quality tools, and creative community</h3>
                <div id="sub-logo-text-containers">
                    <div>
                        <h4>Experiment <br/> With Confidence</h4>
                        <p>A safe place to share early drafts and <br/> get feedback from creatives of all skills <br/> and perspectives</p>
                    </div>
                    <div>
                        <h4>Multimedia <br/> editing suite</h4>
                        <p>All-in-one photo, video, collage, GIF <br/> editor to support your personal <br/> and professional workflows</p>
                    </div>
                    <div>
                        <h4>Curated <br/> global gallery</h4>
                        <p>Endless inspiration from one of the <br/> largest craetive communities in <br/> the world</p>
                    </div>
                </div>
            </div>

            <div id="photos-container-transition">
                <img src="https://assets-global.website-files.com/624de812dd74b622858823f2/643ef1902a538a709bc9b214_wall-1-before.webp" className="fade-in" />
                <img src="https://assets-global.website-files.com/624de812dd74b622858823f2/643efc128341be67afc4b089_wall-2-before.webp" className="fade-in" />
                <img src="https://assets-global.website-files.com/624de812dd74b622858823f2/643efc1a6e15076460a3e2dc_wall-3-before.webp" className="fade-in" />
            </div>

            <div id="hold-carosel">
                <div id="carousel-div">
                    <div id="WSCO-mobile-container">
                        <h3>Join WSCO Mobile</h3>
                        <p>Download the app to start your <br /> Free 7-Day Trial</p>
                        <img src="https://sebass-projects-bucket.s3.amazonaws.com/8dd0d6d90dc14b0a95deb917ee922f57.png" />
                    </div>
                    {cyclePhotos()}
                </div>
            </div>

            <footer>
                <div id='footer-container'>
                    <div id='footer-title'>
                        <h1>WSCO</h1>
                    </div>
                        <ul id="footer-list">
                            <li>
                                @2023 WSCO
                            </li>
                        </ul>
                    </div>
            </footer>

        </div>
    )

}

export default HomePage
