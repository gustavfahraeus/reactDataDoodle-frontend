/**
 * Gets the personal top track data from Spotify.
 * @param {'short_term', 'medium_term', 'long_term'} timeInterval 
 * @returns [[trackName, artistName, imageURL], ...] 
 */
 function usePersonalTopTracks(timeInterval) {
    const [personalTopTracks, setpersonalTopTracks] = useState([])

    spotifyAPI.getMyTopTracks({ limit: '50', time_range: timeInterval }).then(
        (response) => {
            let trackNames = response.body.items.map((item) => item.name)
            let artistNames = response.body.items.map((item) => item.artists[0].name)
            let imageURLs = response.body.items.map((item) => item.album.images[2].url)
            let newState = trackNames.map((item, i) => [item, artistNames[i], imageURLs[i]])

            if (JSON.stringify(personalTopTracks) !== JSON.stringify(newState)) setpersonalTopTracks(newState)
        }
    )
    return [personalTopTracks, setpersonalTopTracks]
}

/**
 * Gets the personal top artist data from Spotify.
 * @param {'short_term', 'medium_term', 'long_term'} timeInterval 
 * @returns [[artistName, imageURL], ...]
 */
function usePersonalTopArtist(timeInterval) {
    const [personalTopArtists, setPersonalTopArtists] = useState([])

    spotifyAPI.getMyTopArtists({ limit: '50', time_range: timeInterval }).then(
        (response) => {
            let artistNames = response.body.items.map((item) => item.name)
            let imageURLs = response.body.items.map((item) => item.images[1].url)
            let newState = artistNames.map((item, i) => [item, imageURLs[i]])

            if (JSON.stringify(personalTopArtists) !== JSON.stringify(newState)) setPersonalTopArtists(newState)
        }
    )
    return [personalTopArtists, setPersonalTopArtists]
}

/**
 * Calculates personal top genre data based on the personal top artist data.
 * @param {'short_term', 'medium_term', 'long_term'} timeInterval 
 * @returns [genre, [[artistName, imageURLs], ...]]
 */
function usePersonalTopGenres(timeInterval) {
    const [personalTopGenres, setPersonalTopGenres] = useState([])

    let topGenresDescending = [];
    spotifyAPI.getMyTopArtists({ limit: '50', time_range: timeInterval }).then(
        (response) => {
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



            if (JSON.stringify(topGenresDescending) !== JSON.stringify(personalTopGenres)) setPersonalTopGenres(topGenresDescending)
        })
    return [personalTopGenres, setPersonalTopGenres]
}

/**
 * 
 * @returns Gets the personal recently played data from Spotify.
 */
function useRecentlyPlayed() {
    const [recentlyPlayed, setRecentlyPlayed] = useState([])
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
            if (JSON.stringify(newState) !== JSON.stringify(recentlyPlayed)) setRecentlyPlayed(newState)
        })
    return [recentlyPlayed, setRecentlyPlayed]
}