import { Client, Databases } from 'node-appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6985a9430005dbab86cf')
    .setKey('standard_647a8be2f274380765f85cb33d589f4795f1b6b67a11d01e619459a9ea149ae345ecd6c7bb3e28e38c0ea324a231ab4f9ada5ac3e37d0a65d8cfbbaf027e9c14b2dc8b057c7f372fa40174af4293fccd8c042d15f2b309681676b6d2134b46fb91a13c236eb833f1a30795ba7e6c3f49e244be686d94dc48f1c9aafc75934ede');

const databases = new Databases(client);

databases.listCollections('6985ab0b003312d5c144')
    .then(console.log)
    .catch(console.error)
    .finally(() => process.exit(0));
