// External Dependencies
import * as mongoDB from 'mongodb'
import { environment } from '../environments/environments'

// Global Variables

// Initialize Connection

export const collections: {
    Anime?: mongoDB.Collection,
    UserBookmarks?: mongoDB.Collection,
    Episodes?: mongoDB.Collection,
    UserList?: mongoDB.Collection,
    google_oauth?: mongoDB.Collection,
    users?: mongoDB.Collection,
    blacklist_tokens?: mongoDB.Collection
} = {}

export const views: {
    AnimeBookmarks?: mongoDB.Collection,
    AnimeTagsView?: mongoDB.Collection,
    EpisodeTimeLine?: mongoDB.Collection,
    UserBookmarks?: mongoDB.Collection,
    UsersBookmarks?: mongoDB.Collection,
    UsersList?: mongoDB.Collection,
    anime?: mongoDB.Collection
} = {}

export async function connectToDatabase() {

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(environment.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(environment.DB_NAME);

    const animeCollection: mongoDB.Collection = db.collection('Anime');
    const usersCollection: mongoDB.Collection = db.collection('users');
    const tokensCollection: mongoDB.Collection = db.collection('blacklist_tokens');

    collections.Anime = animeCollection;
    collections.users = usersCollection;
    collections.blacklist_tokens = tokensCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${animeCollection.collectionName}`);
}
