function ArtistContainer(props) {
    return (
        <div style={{ display: 'flex', margin: 'auto'}}>
            <div className="ArtistContainer">
                <img className="artistImage" src={props.data[props.ranking][1]}></img>
                <div>
                    <p className="artistRanking">{props.ranking + 1 + '. ' + props.data[props.ranking][0]}  </p>
                </div>

            </div>
        </div>
    )
}

export default ArtistContainer;