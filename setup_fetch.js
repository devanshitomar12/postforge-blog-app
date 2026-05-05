const PROJECT_ID = '6985a9430005dbab86cf';
const DB_ID = '6985ab0b003312d5c144';
const KEY = 'standard_647a8be2f274380765f85cb33d589f4795f1b6b67a11d01e619459a9ea149ae345ecd6c7bb3e28e38c0ea324a231ab4f9ada5ac3e37d0a65d8cfbbaf027e9c14b2dc8b057c7f372fa40174af4293fccd8c042d15f2b309681676b6d2134b46fb91a13c236eb833f1a30795ba7e6c3f49e244be686d94dc48f1c9aafc75934ede';
const URL = 'https://fra.cloud.appwrite.io/v1';

async function req(method, path, body) {
    const res = await fetch(`${URL}${path}`, {
        method,
        headers: {
            'X-Appwrite-Project': PROJECT_ID,
            'X-Appwrite-Key': KEY,
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
    });
    const data = await res.json();
    if (!res.ok) console.error("Error on " + path + ":", data.message);
    return data;
}

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function main() {
    console.log("Starting custom fetch script...");

    // Create attributes for Comments (collection already created via SDK test)
    console.log("Configuring comments attributes...");
    await req('POST', `/databases/${DB_ID}/collections/comments/attributes/string`, { key: 'content', size: 2000, required: true });
    await delay(500);
    await req('POST', `/databases/${DB_ID}/collections/comments/attributes/string`, { key: 'postId', size: 50, required: true });
    await delay(500);
    await req('POST', `/databases/${DB_ID}/collections/comments/attributes/string`, { key: 'userId', size: 50, required: true });
    await delay(500);
    await req('POST', `/databases/${DB_ID}/collections/comments/attributes/string`, { key: 'userName', size: 100, required: true });
    await delay(500);
    await req('POST', `/databases/${DB_ID}/collections/comments/attributes/string`, { key: 'parentId', size: 50, required: false });
    console.log("Comments done.");

    // Create Likes
    console.log("Configuring likes...");
    await req('POST', `/databases/${DB_ID}/collections`, { collectionId: 'likes', name: 'Likes' });
    await delay(500);
    await req('POST', `/databases/${DB_ID}/collections/likes/attributes/string`, { key: 'postId', size: 50, required: true });
    await delay(500);
    await req('POST', `/databases/${DB_ID}/collections/likes/attributes/string`, { key: 'userId', size: 50, required: true });
    console.log("Likes done.");

    // Create Bookmarks
    console.log("Configuring bookmarks...");
    await req('POST', `/databases/${DB_ID}/collections`, { collectionId: 'bookmarks', name: 'Bookmarks' });
    await delay(500);
    await req('POST', `/databases/${DB_ID}/collections/bookmarks/attributes/string`, { key: 'postId', size: 50, required: true });
    await delay(500);
    await req('POST', `/databases/${DB_ID}/collections/bookmarks/attributes/string`, { key: 'userId', size: 50, required: true });
    console.log("Bookmarks done.");

    // Add Tags string array to Articles
    console.log("Configuring tags on articles...");
    await req('POST', `/databases/${DB_ID}/collections/articles/attributes/string`, { key: 'tags', size: 100, required: false, array: true });
    console.log("Tags done.");

    console.log("Completed Custom Fetch Migration.");
}

main();
