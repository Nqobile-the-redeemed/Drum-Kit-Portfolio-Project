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
  },
  {
    ID: "W",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    keyDown: 70,
    soundDescription: "Heater 3",
    secondSoundDescription: "Heater 4",
  },
  {
    ID: "E",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyDown: 71,
    soundDescription: "Heater 1",
    secondSoundDescription: "Heater 2",
  },
  {
    ID: "A",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    keyDown: 72,
    soundDescription: "disc",
    secondSoundDescription: "Heater 6",
  },
  {
    ID: "S",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    keyDown: 73,
    soundDescription: "kick and hat",
    secondSoundDescription: "kick 2",
  },
  {
    ID: "D",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    keyDown: 74,
    soundDescription: "Cev H2",
    secondSoundDescription: "Kick",
  },
  {
    ID: "Z",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyDown: 75,
    soundDescription: "Heater 2",
    secondSoundDescription: "Heater 2",
  },
  {
    ID: "X",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyDown: 76,
    soundDescription: "Heater 1",
    secondSoundDescription: "Heater 2",
  },
  {
    ID: "C",
    firstSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    secondSound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    keyDown: 77, 
    soundDescription: "Heater 1",
    secondSoundDescription: "Heater 2",
  }
];

function StatusSwitch({ isSwitchedOn, setIsSwitchedOn}) {
 

  const toggle = () => {
    setIsSwitchedOn(!isSwitchedOn);
  };

  return (
    <button onClick={toggle}>
      {isSwitchedOn ? 'ON' : 'OFF'}
    </button>
  );
}

function ToggleButton({ isOn, setIsOn}) {
 

  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

function VolumeSlider({ volume, setVolume }) {
  

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    // Do something with the volume value, such as update an audio player
  };

  return (
    <div>
      <label htmlFor="volume-slider">Volume</label>
      <input
        type="range"
        id="volume-slider"
        name="volume-slider"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
      />
      <p>Volume: {volume}</p>
    </div>
  );
}


const KeyboardScreen = ({ phrase }) => {

  return (
    <div>
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
    <div>
      <button ref={buttonRef} id={sound.ID} key={sound.ID} onClick={soundPlayer} className="drum-pad" >
      {sound.ID}
      </button>
      
    </div>
    
  )
}


function App() {

  const [currentPhrase, setPhrase] = useState("");
  const [volume, setVolume] = useState(50);
  const [isOn, setIsOn] = useState(false);
  const [isSwitchedOn, setIsSwitchedOn] = useState(false);

  return (
    <div className="App" id="drum-machine">
      {isSwitchedOn && (
          <div classname = "full-holder">
          <div id="display">
          <KeyboardScreen phrase={currentPhrase} />
          </div>
          <div id = "keyboard">
            {soundHolder.map((sound) => (
              <KeyboardButtons key = {sound.ID} sound = {sound} setPhrase={setPhrase} volume={volume} setVolume = {setVolume} isOn={isOn} setIsOn={setIsOn} isSwitchedOn = {isSwitchedOn} setIsSwitchedOn = {setIsSwitchedOn}/>
            ))}
          </div>
          <div id = "controls">
          <VolumeSlider volume={volume} setVolume = {setVolume} isSwitchedOn = {isSwitchedOn} setIsSwitchedOn = {setIsSwitchedOn} />
          </div>
          <div id = "switch">
            <ToggleButton isOn={isOn} setIsOn={setIsOn} isSwitchedOn = {isSwitchedOn} setIsSwitchedOn = {setIsSwitchedOn} />
          </div>
        </div>
      )}
      <div classname = "ultimateContainer">
        <StatusSwitch />
      </div>
    </div>
  );
}

export default App;
