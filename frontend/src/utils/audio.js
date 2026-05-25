export function playThanksVoice() {
  const voiceFiles = [
    '/audio/voice-thanks-1.mp3',
    '/audio/voice-thanks-2.mp3',
    '/audio/voice-thanks-3.mp3',
    '/audio/voice-thanks-4.mp3',
    '/audio/voice-thanks-5.mp3',
  ];
  const selectedFile = voiceFiles[Math.floor(Math.random() * voiceFiles.length)];

  // TODO: Audio オブジェクトを作成して再生
  // const audio = new Audio(selectedFile);
  // audio.play();

}
