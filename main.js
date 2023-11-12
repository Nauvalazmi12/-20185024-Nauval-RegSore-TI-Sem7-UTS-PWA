if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/servis worker.js')
        .then(function(registration) {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
            console.error('Service Worker registration failed:', error);
        });
}
let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            deferredPrompt = event;

            // Instalasi otomatis
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Aplikasi diinstal');
                } else {
                    console.log('Instalasi dibatalkan');
                }

                deferredPrompt = null;
            });
        });

        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                // Menampilkan notifikasi jika izin diberikan
                displayNotification();
                alert('Terima kasih telah mengizinkan notifikasi.');
            } else if (permission === 'denied') {
                // Menampilkan notifikasi jika izin ditolak
                alert('Izin Notifikasi Ditolak', 'Anda menolak untuk menerima notifikasi.');
            }
        })
    

// main.js

document.getElementById('commentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const comment = document.getElementById('comment').value;

    if ('indexedDB' in window) {
        const dbName = 'Nauval UTS'; // Ganti nama database menjadi "Nauval UTS"
        const request = indexedDB.open(dbName, 1);
        let db;

        request.onerror = function (event) {
            console.error('Error opening indexedDB:', event.target.errorCode);
        };

        request.onupgradeneeded = function (event) {
            db = event.target.result;

            const objectStore = db.createObjectStore('comments', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('comment', 'comment', { unique: false });
        };

        request.onsuccess = function (event) {
            db = event.target.result;

            const transaction = db.transaction(['comments'], 'readwrite');
            const objectStore = transaction.objectStore('comments');

            const newComment = { comment: comment };
            const addRequest = objectStore.add(newComment);

            addRequest.onsuccess = function (event) {
                console.log('Komentar berhasil disimpan ke IndexedDB');
                alert('Komentar berhasil disimpan!');
            };

            addRequest.onerror = function (event) {
                console.error('Error adding comment to IndexedDB:', event.target.error);
            };
        };
    } else {
        console.error('IndexedDB is not supported in this browser.');
    }
});





