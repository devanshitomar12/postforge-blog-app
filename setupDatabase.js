import { Client, Databases } from 'node-appwrite';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('6985a9430005dbab86cf')
    .setKey('standard_647a8be2f274380765f85cb33d589f4795f1b6b67a11d01e619459a9ea149ae345ecd6c7bb3e28e38c0ea324a231ab4f9ada5ac3e37d0a65d8cfbbaf027e9c14b2dc8b057c7f372fa40174af4293fccd8c042d15f2b309681676b6d2134b46fb91a13c236eb833f1a30795ba7e6c3f49e244be686d94dc48f1c9aafc75934ede');

const databases = new Databases(client);

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function setup() {
    const dbId = '6985ab0b003312d5c144';

    try {
        console.log("== Starting Appwrite Advanced Schema Setup ==");

        // 1. Comments
        console.log("Creating Comments collection...");
        try {
            await databases.createCollection(dbId, 'comments', 'Comments');
            await delay(1000);
            await databases.createStringAttribute(dbId, 'comments', 'content', 2000, true);
            await delay(1500);
            await databases.createStringAttribute(dbId, 'comments', 'postId', 50, true);
            await delay(1500);
            await databases.createStringAttribute(dbId, 'comments', 'userId', 50, true);
            await delay(1500);
            await databases.createStringAttribute(dbId, 'comments', 'userName', 100, true);
            await delay(1500);
            await databases.createStringAttribute(dbId, 'comments', 'parentId', 50, false); // Optional for nested replies
            console.log("-> Comments collection ready.");
        } catch (e) {
            console.log("-> Comments attribute error (might already exist):", e.message);
        }

        // 2. Likes
        console.log("Creating Likes collection...");
        try {
            await databases.createCollection(dbId, 'likes', 'Likes');
            await delay(1000);
            await databases.createStringAttribute(dbId, 'likes', 'postId', 50, true);
            await delay(1500);
            await databases.createStringAttribute(dbId, 'likes', 'userId', 50, true);
            console.log("-> Likes collection ready.");
        } catch (e) {
            console.log("-> Likes error (might already exist):", e.message);
        }

        // 3. Bookmarks
        console.log("Creating Bookmarks collection...");
        try {
            await databases.createCollection(dbId, 'bookmarks', 'Bookmarks');
            await delay(1000);
            await databases.createStringAttribute(dbId, 'bookmarks', 'postId', 50, true);
            await delay(1500);
            await databases.createStringAttribute(dbId, 'bookmarks', 'userId', 50, true);
            console.log("-> Bookmarks collection ready.");
        } catch (e) {
            console.log("-> Bookmarks error (might already exist):", e.message);
        }

        // 4. Tags
        console.log("Adding tags attribute to articles collection...");
        try {
            // array = true (7th argument usually, but let's just make it a string array)
            // signature: createStringAttribute(databaseId, collectionId, key, size, required, default, array)
            await databases.createStringAttribute(dbId, 'articles', 'tags', 100, false, undefined, true);
            console.log("-> Tags attribute added to articles!");
        } catch (e) {
            console.log("-> Tags error (might already exist):", e.message);
        }

        console.log("== Schema Setup Complete ==");
        console.log("IMPORTANT: Please remember to go to your Appwrite Dashboard and set 'Role: Any / Users' permissions for your new collections if they are completely hidden!");

    } catch (err) {
        console.log("FATAL:", err);
    }
}

setup();
