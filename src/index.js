import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import * as ReactBootStrap from 'react-bootstrap'


import './css/index.css'
import './css/genres.css'
import './css/ArtistContainer.css'
import './css/HomeContainer.css'
import './css/SongContainer.css'
import './css/AboutContainer.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import SongContainer from './components/SongContainer.js'
import GenreContainer from './components/GenreContainer.js'
import ArtistContainer from './components/ArtistContainer.js'
import RecentlyPlayedContainer from './components/RecentlyPlayedContainer.js'
import HomeContainer from './components/HomeContainer.js'
import AboutContainer from './components/AboutContainer.js'

const SpotifyWebApi = require('spotify-web-api-node')
const spotifyAPI = new SpotifyWebApi()




function App() {
    const [dataObject, setDataObject] = useState('')
    const myParam = new URLSearchParams(window.location.search).get('access_token')
    if (!myParam) window.location.href = "https://serene-temple-40989.herokuapp.com/login"
    spotifyAPI.setAccessToken(myParam)
    if (!dataObject) handleData(setDataObject)

    return (dataObject ? <SpotifyDataComponent data={dataObject} /> : 
     <div className="spinnerContainer">
         <ReactBootStrap.Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
         </ReactBootStrap.Spinner> 
     </div>
    )
}


/* Holding everything relating to the Spotify data we fetch */
function SpotifyDataComponent(props) {
    const [currentCategory, setCurrentCategory] = useState('Home')
    const [currentTimeInterval, setCurrentTimeInterval] = useState(0)
    console.log(props.data['__id'])


    // TODO: Fetch all time interals at the same time.
    // const [personalTopTracks, setpersonalTopTracks] = usePersonalTopTracks(currentTimeInterval)
    // const [personalTopArtists, setPersonalTopArtists] = usePersonalTopArtist(currentTimeInterval)
    // const [personalTopGenres, setPersonalTopGenres] = usePersonalTopGenres(currentTimeInterval)
    // const [recentlyPlayed, setRecentlyPlayed] = useRecentlyPlayed()

    function renderCategory(currentCategory) {
        switch (currentCategory) {
            case 'Top Tracks': return [...Array(props.data['tracks'][currentTimeInterval].length)].map((_, i) => <SongContainer ranking={i} data={props.data['tracks'][currentTimeInterval][i]} />)
            case 'Top Artists': return [...Array(props.data['artists'][currentTimeInterval].length)].map((_, i) => <ArtistContainer ranking={i} data={props.data['artists'][currentTimeInterval]} />)
            case 'Top Genres': return [...Array(props.data['genres'][currentTimeInterval].length)].map((_, i) => <GenreContainer ranking={i} data={props.data['genres'][currentTimeInterval][i]} />)
            case 'Recently Played Tracks': return <RecentlyPlayedContainer data={props.data['recentlyPlayed']} />
            case 'Home': return <HomeContainer stateProps={setCurrentCategory} loggedIn={props} />
            case 'About': return <AboutContainer data={props.data} />
        }
    }

    function assignCSS(currentCategory) {
        switch (currentCategory) {
            case "Top Artists": return 'dataContainer'
            case 'Top Genres': return 'containingGenres'
            default: return 'containingGenres'
        }
    }

    let focusedTimeContainer = {
        borderRadius: "5px 5px 5px 5px",
        borderTop: 'none',
        borderColor: '#121212',
        color: 'white',
        fontWeight: 'bold',
        height: '100%'
        , backgroundColor: 'rgba(133, 127, 114, 0.44)', color: 'white', cursor: 'default', userSelect: 'none'
    }


    let decideIntervalStyle = () => {

        let focusedIntervalContainer = {
            border: "1px solid black",
            borderBottom: "none",
            borderRadius: "5px 5px 5px 5px",
            borderColor: '#121212',
            fontWeight: 'bold',
            height: '24px',
            userSelect: 'none'
        }

        switch (currentCategory) {
            case 'Top Tracks': {
                focusedIntervalContainer = { ...focusedIntervalContainer, color: '#984447' }
                break;
            }
            case 'Top Artists': {
                focusedIntervalContainer = { ...focusedIntervalContainer, color: '#468C98' }
                break;
            }
            case 'Top Genres': {
                focusedIntervalContainer = { ...focusedIntervalContainer, color: '#476C9B' }
                break;
            }
        }

        return focusedIntervalContainer
    }

    useEffect(() => {
        checkWidth()
    })

    let checkWidth = () => {
        if (currentCategory === "Top Artists" && document.getElementById('artistContainer') && window.innerWidth < 992 && window.innerWidth >= 576) {
            document.getElementById("artistContainer").style.height = 250 * (Math.floor(props.data['artists'][currentTimeInterval].length / 3) + 1) + "px"
        }

        else if (currentCategory === "Top Artists" && document.getElementById('artistContainer') && window.innerWidth >= 992) {
            document.getElementById("artistContainer").style.height = 400 * (Math.floor(props.data['artists'][currentTimeInterval].length / 3) + 1) + "px"
        }

        else if (currentCategory === "Top Artists" && document.getElementById('artistContainer') && window.innerWidth < 576) {
            document.getElementById("artistContainer").style.height = 185 * (Math.floor(props.data['artists'][currentTimeInterval].length / 3) + 1) + "px"
        }
    }

    window.addEventListener("resize", () => {
        if (currentCategory === "Top Artists" && document.getElementById('artistContainer') && window.innerWidth < 992 && window.innerWidth >= 576) {
            document.getElementById("artistContainer").style.height = 250 * (Math.floor(props.data['artists'][currentTimeInterval].length / 3)) + "px"
        }

        else if (currentCategory === "Top Artists" && document.getElementById('artistContainer') && window.innerWidth >= 992) {
            document.getElementById("artistContainer").style.height = 400 * (Math.floor(props.data['artists'][currentTimeInterval].length / 3) + 1) + "px"
        }

        else if (currentCategory === "Top Artists" && document.getElementById('artistContainer') && window.innerWidth < 576) {
            document.getElementById("artistContainer").style.height = 185 * (Math.floor(props.data['artists'][currentTimeInterval].length / 3) + 1) + "px"
        }
    })

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight && currentCategory === "Top Genres") {
            document.getElementsByClassName('scrollToTheTop')[0].style.opacity = '1'
            document.getElementsByClassName('scrollToTheTop')[0].style.cursor = 'pointer'
        }
        else {
            document.getElementsByClassName('scrollToTheTop')[0].style.opacity = '0'
            document.getElementsByClassName('scrollToTheTop')[0].style.cursor = 'unset'
        }
    })



    return (
        <div id="SpotifyDataComponent">

            <div className="header" style={currentCategory === 'Home' ? { display: 'none' } : { borderBottom: 'none' }}>
                <div className="headerElement"
                    onClick={() => setCurrentCategory('Home')}
                    style={currentCategory === 'Home' ? focusedTimeContainer : { color: "rgba(255,255,255, 0.44" }}>
                    Home
                </div>
                <div
                    className="headerElement"
                    onClick={() => { setCurrentCategory('Top Tracks') }}
                    style={currentCategory === 'Top Tracks' ? focusedTimeContainer : { color: "rgba(255,255,255, 0.44)" }}>
                    Top Tracks
                </div>
                <div
                    className="headerElement"
                    onClick={() => { setCurrentCategory('Top Artists') }}
                    style={currentCategory === 'Top Artists' ? focusedTimeContainer : { color: "rgba(255,255,255, 0.44)" }}>
                    Top Artists
                </div>
                <div
                    className="headerElement"
                    onClick={() => { setCurrentCategory('Top Genres') }}
                    style={currentCategory === 'Top Genres' ? focusedTimeContainer : { color: "rgba(255,255,255, 0.44)" }}>
                    Top Genres
                </div>
                <div
                    className="headerElement"
                    onClick={() => { setCurrentCategory('Recently Played Tracks') }}
                    style={currentCategory === 'Recently Played Tracks' ? focusedTimeContainer : { color: "rgba(255,255,255, 0.44)" }}>
                    Recently Played Tracks
                </div>
                {/* <div
                    className="headerElement"
                    onClick={() => { setCurrentCategory('Your Account') }}
                    style={currentCategory === 'Your Account' ? focusedTimeContainer : {}}>
                    Your Account
                </div> */}
                <div
                    className="headerElement"
                    onClick={() => { setCurrentCategory('About') }}
                    style={currentCategory === 'About' ? focusedTimeContainer : { color: "rgba(255,255,255, 0.44)" }}>
                    About
                </div>
            </div>

            <p id="currentCategory">{currentCategory === 'Home' ? 'What are you interested in seeing?' : currentCategory === 'About' ? '' : currentCategory}</p>

            <div id="timeIntervalChanger" style={currentCategory === 'Recently Played Tracks' || currentCategory === 'Home' || currentCategory === 'About' ? { display: 'none' } : {}}>
                <div style={currentTimeInterval === 0 ? decideIntervalStyle() : { color: '#CAE4F1' }} className={currentTimeInterval !== 0 ? 'changerDiv' : 'focused'} onClick={() => { setCurrentTimeInterval(0) }}>last 4 weeks</div>
                <div style={currentTimeInterval === 1 ? decideIntervalStyle() : { color: '#CAE4F1' }} className={currentTimeInterval !== 1 ? 'changerDiv' : 'focused'} onClick={() => { setCurrentTimeInterval(1) }}>last 6 months</div>
                <div style={currentTimeInterval === 2 ? decideIntervalStyle() : { color: '#CAE4F1' }} className={currentTimeInterval !== 2 ? 'changerDiv' : 'focused'} onClick={() => { setCurrentTimeInterval(2) }}>years back</div>
            </div>

            <div id={currentCategory === "Top Artists" ? "artistContainer" : ''} className={assignCSS(currentCategory)} style={currentCategory !== 'Top Artists' && currentCategory === 'Top Genres' ? { height: 'unset', opacity: '0' } : currentCategory !== 'Top Artists' ? { height: 'unset' } : {}}>
                {props.data['__id'] ? renderCategory(currentCategory) : ''}
                <div onClick={() => { window.scrollTo(0, 0); }} className="scrollToTheTop">&#8593;</div>
            </div>

            <div style={currentCategory !== 'Home' && currentCategory !== "Top Genres" ? { width: "100%", height: "20px", borderTop: "1px solid #1F1B24", marginTop: '10px' } : {}}></div>






        </div>
    );
}


// This looks disgusting right now, but basically what we are doing is getting all
// the data in all the different categories that we need, and then we set the appropriate
// state. So the state only changes once when the site loads, and then on refresh i guess.
// !! I saw that some entries being uploaded to the database were missing some property,
//  I think that the reason is that the promises do not necessary resolve in the same 
// order that they are done in. I think I remember that I once used something that waited
// for all promises to resolve. 
function handleData(setter) {
    let myDataObject = {}
    let combinedTracksState = []


    spotifyAPI.getMe().then(response => myDataObject['__id'] = response['body']['id'])

    let today = new Date();
    myDataObject['uploadDate'] = today

    spotifyAPI.getMyTopTracks({ limit: '50', time_range: 'short_term' }).then(
        (response) => {
            let trackNames = response.body.items.map((item) => item.name)
            let artistNames = response.body.items.map((item) => item.artists[0].name)
            let imageURLs = response.body.items.map((item) => item.album.images[2].url)
            let newState = trackNames.map((item, i) => [item, artistNames[i], imageURLs[i]])
            combinedTracksState = [...combinedTracksState, newState]
        }).catch(() => window.location.href = "https://serene-temple-40989.herokuapp.com/login")
    spotifyAPI.getMyTopTracks({ limit: '50', time_range: 'medium_term' }).then(
        (response) => {
            let trackNames = response.body.items.map((item) => item.name)
            let artistNames = response.body.items.map((item) => item.artists[0].name)
            let imageURLs = response.body.items.map((item) => item.album.images[2].url)
            let newState = trackNames.map((item, i) => [item, artistNames[i], imageURLs[i]])
            combinedTracksState = [...combinedTracksState, newState]
        }).catch(() => window.location.href = "https://serene-temple-40989.herokuapp.com/login")
    spotifyAPI.getMyTopTracks({ limit: '50', time_range: 'long_term' }).then(
        (response) => {
            let trackNames = response.body.items.map((item) => item.name)
            let artistNames = response.body.items.map((item) => item.artists[0].name)
            let imageURLs = response.body.items.map((item) => item.album.images[2].url)
            let newState = trackNames.map((item, i) => [item, artistNames[i], imageURLs[i]])
            combinedTracksState = [...combinedTracksState, newState]
            myDataObject['tracks'] = combinedTracksState
        }).catch(() => window.location.href = "https://serene-temple-40989.herokuapp.com/login")

    let combinedArtistState = []
    spotifyAPI.getMyTopArtists({ limit: '50', time_range: 'short_term' }).then(
        (response) => {
            let artistNames = response.body.items.map((item) => item.name)
            let imageURLs = response.body.items.map((item) => item.images[1].url)
            let newState = artistNames.map((item, i) => [item, imageURLs[i]])
            combinedArtistState = [...combinedArtistState, newState]
        }).catch(() => window.location.href = "https://serene-temple-40989.herokuapp.com/login")
    spotifyAPI.getMyTopArtists({ limit: '50', time_range: 'medium_term' }).then(
        (response) => {
            let artistNames = response.body.items.map((item) => item.name)
            let imageURLs = response.body.items.map((item) => item.images[1].url)
            let newState = artistNames.map((item, i) => [item, imageURLs[i]])
            combinedArtistState = [...combinedArtistState, newState]
        }).catch(() => window.location.href = "https://serene-temple-40989.herokuapp.com/login")
    spotifyAPI.getMyTopArtists({ limit: '50', time_range: 'long_term' }).then(
        (response) => {
            let artistNames = response.body.items.map((item) => item.name)
            let imageURLs = response.body.items.map((item) => item.images[1].url)
            let newState = artistNames.map((item, i) => [item, imageURLs[i]])
            combinedArtistState = [...combinedArtistState, newState]
            myDataObject['artists'] = combinedArtistState
        }).catch(() => window.location.href = "https://serene-temple-40989.herokuapp.com/login")

    let aggregatedGenres = []
    spotifyAPI.getMyTopArtists({ limit: '50', time_range: 'short_term' }).then(
        (response) => {
            let topGenresDescending = []
            let genresAndScores = {}
            let genresAndArtists = {} // The value of genresAndArtists is an array containing the names and the imageURLs of the artists. Genre is the key.

            for (let i = 0; i < response.body.items.length; i++) {
                let artistGenres = response.body.items[i].genres
                for (let j = 0; j < artistGenres.length; j++) {
                    let specficGenre = artistGenres[j]
                    if (specficGenre in genresAndScores) {
                        genresAndScores[specficGenre]++
                        genresAndArtists[specficGenre].push([response.body.items[i].name, response.body.items[i].images[2].url])
                    }
                    else {
                        genresAndScores[specficGenre] = 1
                        genresAndArtists[specficGenre] = [[response.body.items[i].name, response.body.items[i].images[2].url]]
                    }
                }
            }

            for (let genre in genresAndScores) topGenresDescending.push([genre, genresAndScores[genre]]);

            topGenresDescending.sort((a, b) => b[1] - a[1])

            for (let i = 0; i < topGenresDescending.length; i++) {
                let genre = topGenresDescending[i][0]
                topGenresDescending[i][1] = []
                genresAndArtists[genre] ? topGenresDescending[i][1].push(genresAndArtists[genre]) : topGenresDescending[i][1] = [genresAndArtists[i][genre]]
            }

            aggregatedGenres = [...aggregatedGenres, topGenresDescending]
        })
    spotifyAPI.getMyTopArtists({ limit: '50', time_range: 'medium_term' }).then(
        (response) => {
            let topGenresDescending = []
            let genresAndScores = {}
            let genresAndArtists = {} // The value of genresAndArtists is an array containing the names and the imageURLs of the artists. Genre is the key.

            for (let i = 0; i < response.body.items.length; i++) {
                let artistGenres = response.body.items[i].genres
                for (let j = 0; j < artistGenres.length; j++) {
                    let specficGenre = artistGenres[j]
                    if (specficGenre in genresAndScores) {
                        genresAndScores[specficGenre]++
                        genresAndArtists[specficGenre].push([response.body.items[i].name, response.body.items[i].images[2].url])
                    }
                    else {
                        genresAndScores[specficGenre] = 1
                        genresAndArtists[specficGenre] = [[response.body.items[i].name, response.body.items[i].images[2].url]]
                    }
                }
            }

            for (let genre in genresAndScores) topGenresDescending.push([genre, genresAndScores[genre]]);

            topGenresDescending.sort((a, b) => b[1] - a[1])

            for (let i = 0; i < topGenresDescending.length; i++) {
                let genre = topGenresDescending[i][0]
                topGenresDescending[i][1] = []
                genresAndArtists[genre] ? topGenresDescending[i][1].push(genresAndArtists[genre]) : topGenresDescending[i][1] = [genresAndArtists[i][genre]]
            }

            aggregatedGenres = [...aggregatedGenres, topGenresDescending]
        })
    spotifyAPI.getMyTopArtists({ limit: '50', time_range: 'long_term' }).then(
        (response) => {
            let topGenresDescending = []
            let genresAndScores = {}
            let genresAndArtists = {} // The value of genresAndArtists is an array containing the names and the imageURLs of the artists. Genre is the key.

            for (let i = 0; i < response.body.items.length; i++) {
                let artistGenres = response.body.items[i].genres
                for (let j = 0; j < artistGenres.length; j++) {
                    let specficGenre = artistGenres[j]
                    if (specficGenre in genresAndScores) {
                        genresAndScores[specficGenre]++
                        genresAndArtists[specficGenre].push([response.body.items[i].name, response.body.items[i].images[2].url])
                    }
                    else {
                        genresAndScores[specficGenre] = 1
                        genresAndArtists[specficGenre] = [[response.body.items[i].name, response.body.items[i].images[2].url]]
                    }
                }
            }

            for (let genre in genresAndScores) topGenresDescending.push([genre, genresAndScores[genre]]);

            topGenresDescending.sort((a, b) => b[1] - a[1])

            for (let i = 0; i < topGenresDescending.length; i++) {
                let genre = topGenresDescending[i][0]
                topGenresDescending[i][1] = []
                genresAndArtists[genre] ? topGenresDescending[i][1].push(genresAndArtists[genre]) : topGenresDescending[i][1] = [genresAndArtists[i][genre]]
            }

            aggregatedGenres = [...aggregatedGenres, topGenresDescending]
            myDataObject['genres'] = aggregatedGenres
        })
        .then(() => {
            fetch('https://gustavfahraeus.eu.pythonanywhere.com/hello', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(myDataObject),
            })
        })
    let newState = []
    spotifyAPI.getMyRecentlyPlayedTracks({ limit: '50' }).then(
        (response) => {
            for (let i = 0; i < response.body.items.length; i++) {
                let trackName = response.body.items[i].track.name
                let artistNames = response.body.items[i].track.artists.map((item, i) => item.name)
                for (let j = 0; j < artistNames.length - 1; j++) artistNames[j] += ", "

                let timeData = response.body.items[i].played_at
                let date = timeData.slice(0, 10) + ': '
                let time = timeData.slice(11, 16)
                newState.push([trackName, artistNames, [date, time]])
            }
            myDataObject['recentlyPlayed'] = newState
            setter(myDataObject)
        })
}


// 🦚🦚🦚🦚🦚🦚🦚🦚🦚🦚


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
