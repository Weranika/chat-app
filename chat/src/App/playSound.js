export default function playSound(soundFile) {
    if (document.hidden) {
      const audio = new Audio(soundFile);
      audio.play();
    }    
  }    