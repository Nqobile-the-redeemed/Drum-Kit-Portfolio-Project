import { useState, useEffect, useRef } from 'react';
import './App.css';

const soundHolder = [
  {
    ID: "Q",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyDown: 69,
    soundDescription: "Heater 1",
    secondSoundDescription: "Heater 2",
    bgColor: "#E2EB98",
    fontColor: "black"
  },
  {
    ID: "W",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    keyDown: 70,
    soundDescription: "Heater 3",
    secondSoundDescription: "Heater 4",
    bgColor: "#216869",
    fontColor: "white"
  },
  {
    ID: "E",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyDown: 71,
    soundDescription: "Heater 1",
    secondSoundDescription: "Heater 2",
    bgColor: "#CEA07E",
    fontColor: "black"
  },
  {
    ID: "A",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    keyDown: 72,
    soundDescription: "disc",
    secondSoundDescription: "Heater 6",
    bgColor: "#FAD4C0",
    fontColor: "black"
  },
  {
    ID: "S",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    keyDown: 73,
    soundDescription: "kick and hat",
    secondSoundDescription: "kick 2",
    bgColor: "#6D4C3D",
    fontColor: "white"
  },
  {
    ID: "D",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    keyDown: 74,
    soundDescription: "Cev H2",
    secondSoundDescription: "Kick",
    bgColor: "#002400",
    fontColor: "white"
  },
  {
    ID: "Z",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyDown: 75,
    soundDescription: "Heater 2",
    secondSoundDescription: "Heater 2",
    bgColor: "#BAD9A2",
    fontColor: "black"
  },
  {
    ID: "X",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyDown: 76,
    soundDescription: "Heater 1",
    secondSoundDescription: "Heater 2",
    bgColor: "#ADBF97",
    fontColor: "black"
  },
  {
    ID: "C",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyDown: 77, 
    soundDescription: "Heater 1",
    secondSoundDescription: "Heater 2",
    bgColor: "#93A392",
    fontColor: "white"
  }
];

function StatusSwitch({ drumKitVisibility, setDrumKitVisibility}) {
 

  const toggle = () => {
    setDrumKitVisibility(!drumKitVisibility);
  };

  return (
    <button id = "visibilityButton" onClick={toggle}>
      {drumKitVisibility ? 'ON' : 'OFF'}
    </button>
  );
}

function ToggleButton({ isOn, setIsOn}) {
 

  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <button id = "music-switch" onClick={toggle}>
      {isOn ? 'Hard Music' : 'Soft Music'}
    </button>
  );
}

function VolumeSlider({ volume, setVolume }) {
  

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    // Do something with the volume value, such as update an audio player
  };

  return (
    <div className = "volumeBox">
      {/* <label htmlFor="volume-slider">Volume</label> */}
      <input
        type="range"
        id="volume-slider"
        name="volume-slider"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
      />
      {/* <p>Volume: {volume}</p> */}
    </div>
  );
}


const KeyboardScreen = ({ phrase }) => {

  return (
    <div className='screen-space'>
      <p className='phrse'>{phrase}</p>
      
    </div>
    
  )

}

const KeyboardButtons = ({ sound, setPhrase, volume, setVolume, isOn, isSwitchedOn, setIsSwitchedOn }) => {
  const [currentSound, setSound] = useState("");
  

  const buttonRef = useRef(null);
    
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toUpperCase() === sound.ID) {
        buttonRef.current.click();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    
  }, [sound]);

  useEffect(() => {
    setPhrase("");
  }, [sound, setPhrase]);

  const soundPlayer = () => {
    if (isOn) {
      setSound(sound.firstSound);
      const audio = new Audio(sound.firstSound);
      audio.play();
      audio.volume = volume / 100;
      setPhrase(sound.soundDescription);
    } else {
      setSound(sound.secondSound);
      const audio = new Audio(sound.secondSound);
      audio.play();
      audio.volume = volume / 100;
      setPhrase(sound.secondSoundDescription);
    }
  };

  

  return (
    <div className = "button-holder">
      <button ref={buttonRef} id={sound.ID} key={sound.ID} onClick={soundPlayer} className="drum-pad" style={{ backgroundColor: sound.bgColor, color: sound.fontColor }}>
      {sound.ID}
      </button>
      
    </div>
    
  )
}

const DrumKit = ({ drumKitVisibility, setDrumKitVisibility }) => {

  const [currentPhrase, setPhrase] = useState("");
  const [volume, setVolume] = useState(50);
  const [isOn, setIsOn] = useState(false);
  


  return (

    <div className="App" id="drum-machine">
          <div className = "full-holder">
            <div id="display">
              <KeyboardScreen phrase={currentPhrase} />
            </div>
            <div id = "keyboard">
              {soundHolder.map((sound) => (
                <KeyboardButtons key = {sound.ID} sound = {sound} setPhrase={setPhrase} volume={volume} setVolume = {setVolume} isOn={isOn} setIsOn={setIsOn} drumKitVisibility={drumKitVisibility} setDrumKitVisibility={setDrumKitVisibility}/>
              ))}
            </div>
              <div id = "controls">
                <VolumeSlider volume={volume} setVolume = {setVolume} drumKitVisibility={drumKitVisibility} setDrumKitVisibility={setDrumKitVisibility} />
              </div>
            <div id = "switch">
                <ToggleButton isOn={isOn} setIsOn={setIsOn} drumKitVisibility={drumKitVisibility} setDrumKitVisibility={setDrumKitVisibility} />
            </div>
          </div>
    </div>

  );
}


function App() {

  const [drumKitVisibility, setDrumKitVisibility] = useState(false);

  return (
      <div className = "ultimateContainer">
        <StatusSwitch drumKitVisibility={drumKitVisibility} setDrumKitVisibility={setDrumKitVisibility} />
        { drumKitVisibility && <DrumKit />}
      </div>
  );
}

export default App;
