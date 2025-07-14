import { Platform } from "react-native";

export const appwriteConfig = {
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId : process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    Platform : "com.delevery.fast",
    databaseId :"68754612001d7a136dcf",
    userCollectionId : "68754634003787cdc1fe",
}