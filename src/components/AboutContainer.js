const SpotifyWebApi = require('spotify-web-api-node')
const spotifyAPI = new SpotifyWebApi()

function AboutContainer(props) {

    let deleteMyEntry = () => {

       
        fetch('http://127.0.0.1:5000/helloworld', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props.data)
        }).then( response => {
            if (response.status === 200) 
                alert("Successfully deleted all traces of you.")
        
        })
    }

    return (
        <div className='AboutContainer'>
            <p className="aboutHeader">Hi there!😌</p>
            <p className="aboutParagraph">This is a project I built to learn the ropes of React and to have an aggregated & good looking place to look at some of my own Spotify stats.</p>
            <p className="aboutParagraph">If you find the website to be buggy in any way please send me a message on <a target="_blank"  href="https://twitter.com/flushthefishes" style={{display: 'inline',color: "#00acee", fontWeight: '900', fontSize: '16px', cursor: 'pointer'}}>Twitter</a>.</p>
            <p className="aboutParagraph" style={{paddingTop: '10px'}}>My intention is to extend this project to be able to visualize more time periods, more user specific data, and also
             to make some (hopefully) useful predicitions about other cool things. </p>
             <p className="aboutParagraph" style={{paddingTop: '10px'}}>If you are at all interested in the code you can find it <a target="_blank"  href="https://github.com/gustavfahraeus" style={{display: 'inline',color: "#00acee", fontWeight: '900', fontSize: '16px', cursor: 'pointer'}}>here</a>.</p>
             <p className="aboutEnding" style={{paddingTop: '10px'}}>Peace and Love</p>
        </div>
        
    )}

export default AboutContainer;