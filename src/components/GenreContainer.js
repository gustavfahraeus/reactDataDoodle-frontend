import { useEffect, useState } from "react";

function GenreContainer(props) {
    const [colStyle, setColStyle] = useState({})
    const [amountImages, setAmountImages] = useState(0)


    const handleResize = () => {
        try {
            if (window.innerWidth < 768 && amountImages === 1) {
                let newStyle = { gridTemplateColumns: '75px', paddingLeft: '75px', paddingRight: '75px' }
                setColStyle(newStyle)
            }

            else if (window.innerWidth < 768 && amountImages === 2) {
                let newStyle = { gridTemplateColumns: 'repeat(2,75px)', paddingLeft: '37.5px', paddingRight: '37.5px' }
                setColStyle(newStyle)
            }

            else if (window.innerWidth < 768 && amountImages >= 3) {
                let newStyle = { gridTemplateColumns: 'repeat(3,75px)' }
                setColStyle(newStyle)
            }

            else if (window.innerWidth >= 768 && amountImages === 1) {
                let newStyle = { gridTemplateColumns: '150px', paddingLeft: '150px', paddingRight: '150px' }
                setColStyle(newStyle)
            }

            else if (window.innerWidth >= 768 && amountImages === 2) {
                let newStyle = { gridTemplateColumns: 'repeat(2,150px)', paddingLeft: '75px', paddingRight: '75px' }
                setColStyle(newStyle)
            }

            else if (window.innerWidth >= 768 && amountImages >= 3) {
                let newStyle = { gridTemplateColumns: 'repeat(3,150px)' }
                setColStyle(newStyle)
            }

        }
        catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
    
    }, [])

    useEffect(handleResize, [amountImages])



    function titleCase(str) {
        let splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++)
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        return splitStr.join(' ');
    }

    let genreName = props.data ? props.data[0] : ''
    let genreArtistsAndImages = props.data ? props.data[1][0] : []

    let images = []
    for (let i = 0; i < genreArtistsAndImages.length; i++) images.push(genreArtistsAndImages[i][1])
    if (images.length !== amountImages) {
        setAmountImages(images.length)
    }

    try {
        let result = document.getElementsByClassName("containingGenres")
        setTimeout(() => result[0].style.opacity = 1, 0)
    }
    catch {}


    return (
        <div className="GenreContainer">

            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center' }}>
                <p className="genreName">{props.ranking + 1}</p>
                <p className='genreName'>{titleCase(genreName)}</p>
            </div>

            <div className="genreArtistImageContainer" style={colStyle}>
                {[...Array(images.length)].map((_, i) =>
                    <img className='artistImageGenreContainer' src={images[i]}></img>
                )}
            </div>

        </div>
    )
}

export default GenreContainer;