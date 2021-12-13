function SongContainer(props) {
    const textWidth = (window.innerWidth - 80) / 2 - 10
    if (props.data) {
        return (
            <div className="SongContainer">
                <p className="songPersonalRanking">{props.ranking + 1}</p>
                <img className="songImage" src={props.data[2]}></img>
                <p className="songTitle" style={{ width: textWidth }}>{props.data[0]}</p>
                <p className="albumTitle" style={{ width: textWidth }}>{props.data[1]}</p>
            </div>
        )
    }
    return (<div></div>)
}

export default SongContainer;