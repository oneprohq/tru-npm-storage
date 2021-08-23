import { StorageHelper } from '../src/StorageHelper';

const sh = new StorageHelper('http://localhost:6000', 'stage');

setTimeout(() => {
    const url = sh.getPublicUrlByCategory('profile-dp', '1587367340851-photo.png');
    console.log(url);
}, 3000);
