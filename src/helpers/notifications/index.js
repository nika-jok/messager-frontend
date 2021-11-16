import storage from '../storage'
import audioSrc from './notification.mp3'

function sendNotification(title, options, cb) {
  const isNotified = storage.get('notifications') === 'true'
  const isSounded = storage.get('sound') === 'true'
  if (!isNotified) return
  if (!('Notification' in window)) {
    alert('You browser does not support notifications')
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(title, options)
    if (isSounded) {
      const audio = new Audio(audioSrc)
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(_ => {
            // Automatic playback started!
            // Show playing UI.
            console.log("audio played auto");
          })
          .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
            console.log("playback prevented");
          });
      }
     
      // if (playPromise !== undefined) {
      //   playPromise
      //     .then((_) => {
      //       // Automatic playback started!
      //       // Show playing UI.
      //       console.log('audio played auto')
      //     })
      //     .catch((error) => {
      //       // Auto-play was prevented
      //       // Show paused UI.
      //       console.log('playback prevented')
      //     })
      // }
    }
    notification.onclick = cb
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        const notification = new Notification(title, options)
        if (isSounded) {
          const playPromise = new Audio(audioSrc)
          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                // Automatic playback started!
                // Show playing UI.
                console.log('audio played auto')
              })
              .catch((error) => {
                // Auto-play was prevented
                // Show paused UI.
                console.log('playback prevented')
              })
          }
        }
        notification.onclick = cb
      }
    })
  }
}

export default sendNotification
