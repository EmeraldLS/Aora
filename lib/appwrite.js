import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectID: "663acd8f0022a97103a8",
  databaseID: "663acee100368cb5fc87",
  userCollectionID: "663acefd002ed40502a4",
  videoCollectionID: "663acf1d0011895834a5",
  storageBucketID: "663ad05d0036c5bd675a",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectID)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAcc = await account.create(ID.unique(), email, password, username);

    if (!newAcc) throw Error;

    const avatarURL = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseID,
      config.userCollectionID,
      ID.unique(),
      {
        account_id: newAcc.$id,
        email,
        username,
        avatar: avatarURL,
      }
    );

    return newUser;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (err) {
    throw new Error(err);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videoCollectionID
    );
    return posts.documents;
  } catch (err) {
    throw new Error(err);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videoCollectionID,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    return posts.documents;
  } catch (err) {
    throw new Error(err);
  }
};

export const searchPost = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseID,
      config.videoCollectionID,
      [Query.search("title", query)]
    );
    return posts.documents;
  } catch (err) {
    throw new Error(err);
  }
};
