function HomeContainer(props) {
    const changeUpperState = props.stateProps
    
  
    return (
        <div className='HomeContainer'>

            <p style={{marginTop: '5px', marginBottom: '10px'}}>your spotify data - all in one place</p>

            <div className='buttonContainer'>
                <button className='button button1' onClick={() => changeUpperState('Top Tracks')}>My Top Tracks</button>
            </div>
            <div className='buttonContainer'>
                <button className='button button2' onClick={() => changeUpperState('Top Artists')}>My Top Artists</button>
            </div>
            <div className='buttonContainer'>
                <button className='button button3' onClick={() => changeUpperState('Top Genres')}>My Top Genres</button>
            </div>
            <div className='buttonContainer'>
                <button className='button button4' onClick={() => changeUpperState('Recently Played Tracks')}>My Recently Played Tracks</button>
            </div>
            <div className='buttonContainer'>
                <button className='button button5' onClick={() => changeUpperState('About')} style={{paddingBottom: '0px'}}>About</button>
            </div>
        </div>
        
    )}

export default HomeContainer;