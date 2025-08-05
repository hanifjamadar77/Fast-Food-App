import { CreateUserPrams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage} from "react-native-appwrite";

export const appwriteConfig = {
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId : process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    Platform : "com.delevery.fast",
    databaseId :"68754612001d7a136dcf",
    bucketId : "688cac34002356daac62",
    userCollectionId : "687952160019e58777d8",
    categoriesCollectionId : "688713710033a867d594",
    menuCollectionId : "68871472000a0ebf358d",
    customizationsCollectionId : "688716bb003b82fadd85",
    menuCustomizationsCollectionId : "688caaa2003ade6a87b3",
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.Platform);

export const database = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
const avatars = new Avatars(client)



export const createUser = async({email, password, name} : CreateUserPrams) => {
    try{
        const newAccount = await account.create(ID.unique(), email, password, name);
        if(!newAccount) throw new Error("Failed to create user account");

        await signIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name);

        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                name,
                email,
                avatar: avatarUrl
            },
        )
            return newUser;

    }catch(e){
        throw new Error(e as string)
    }
}

export const signIn = async({email, password} : SignInParams) => {
    try{
        const session = await account.createEmailPasswordSession(email, password);
    }catch(e) {
        throw new Error(e as string);
    }
}

export const getCurrentUser = async() => {
    try{
        const currentAccount = await account.get();
        if(!currentAccount) {
            throw new Error("No user is currently signed in");
        }

       const currentUser = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,    
        [Query.equal('accountId', currentAccount.$id)]
       )

       if(!currentUser) throw new Error("No user data found");

       return currentUser.documents[0];
    }catch(e) {
        throw new Error(e as string);
    }
}

export const getMenu = async({category, query} : GetMenuParams) =>{
    try{
        const queries : string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries,
        )

        return menus.documents;
    }catch(e){
        throw new Error(e as string);
    }
}    

export const getCategories = async () =>{
    try{
        const categories = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.categoriesCollectionId,
        )

        return categories.documents;
    }catch(e){
        throw new Error(e as string);
    }
}