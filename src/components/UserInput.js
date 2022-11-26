import React from "react";


export default function UserInput() {

    // state object for complete meme
    const [memeImage, setMemeImage] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    });

    
    const [allMemes, setAllMemes] = React.useState([]);

    function getRandomImage() {
        const randNo = Math.floor(Math.random() * allMemes.length);
        let image = allMemes[randNo].url;
        setMemeImage(prevMeme => ({
            ...prevMeme,
            randomImage: image
        }))
    }

    
    function handleChange(event) {
        const { name, value } = event.target;
        setMemeImage(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    React.useEffect(() => {
        console.log("api call");
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    return (
        <div id="user-inputs">
            <div id="user-input-wrapper">
                <input
                    type="text"
                    placeholder="Top Text"
                    onChange={handleChange}
                    name="topText"
                    value={memeImage.topText}
                />
                <input
                    type="text"
                    placeholder="Bottom Text"
                    onChange={handleChange}
                    name="bottomText"
                    value={memeImage.bottomText}
                />
            </div>
            <button className="button" onClick={getRandomImage}>Get New Meme Image</button>
            <div id="user-inputs--image-container">
                <img src={memeImage.randomImage} alt="" />
                <h1 className="user-inputs--image-topText">{memeImage.topText}</h1>
                <h1 className="user-inputs--image-bottomText">{memeImage.bottomText}</h1>
            </div>
        </div>
    )
}