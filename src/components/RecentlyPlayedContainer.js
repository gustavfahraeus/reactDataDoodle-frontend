function RecentlyPlayedContainer(props) {
    return (
        <div className="RecentlyPlayedContainer">
            <div style={{ display: 'flex', textAlign: 'left' }}>
                <p className="recentlyPlayedCategory" style={{ maxWidth: '450px', paddingLeft: '4px', fontSize: '20px' }}>Track</p>
                <p className="recentlyPlayedCategory" style={{ maxWidth: '450px', paddingLeft: '4px', fontSize: '20px' }}>Artist(s)</p>
                <p className="recentlyPlayedCategory" style={{ maxWidth: '125px', paddingLeft: '4px', fontSize: '20px', borderRight: '1px solid black' }}>Played at</p>
            </div>

            <div style={{display: 'grid'}}>
                {[...Array(props.data.length)].map((_, i) => <div className="someShit" >
                    <p id={ i === 0 ? 'topRecent' : ''} className = 'recentlyPlayedData' style={{ wordWrap: 'break-word', maxWidth: '450px', minWidth: '33%', marginLeft: '4px'}}>{props.data[i][0]}</p>
                    <p id={ i === 0 ? 'topRecent' : ''} className = 'recentlyPlayedData' style={{ wordWrap: 'break-word', maxWidth: '450px', minWidth: '33%'}}>{props.data[i][1]}</p>
                    <p id={ i === 0 ? 'topRecent' : ''} className = 'recentlyPlayedData' style={{ wordWrap: 'break-word', maxWidth: '125px', minWidth: '33%'}}>{props.data[i][2]}</p>
                </div>)}
            </div>
        </div>
    )
}

export default RecentlyPlayedContainer;