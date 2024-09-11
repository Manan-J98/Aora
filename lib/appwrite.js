import 'react-native-url-polyfill/auto'
import { ID, Account ,Client, Avatars, Databases } from 'react-native-appwrite';
import SignIn from '../app/(auth)/sign-in';


export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aora',
    projectId: '66df80d50021e75a5f3b',
    databaseId: '66df81cf002d05c65dd2',
    userCollectionId: '66df81e3002169e5f414',
    videoCollectionId: '66df820d0036a9316464',
    storageId: '66df83f00018b4dd6086'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
  
      if (!newAccount) throw Error;
  
      const avatarUrl = avatars.getInitials(username);
  
      await signIn(email, password);
  
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          username: username,
          avatar: avatarUrl,
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
}

export async function signIn(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password)
  
      return session;
    } catch (error) {
      throw new Error(error);
    }
  }

// Register User

