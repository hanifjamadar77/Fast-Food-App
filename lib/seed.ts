import { ID } from "react-native-appwrite";
import { appwriteConfig, database, storage } from "./appwrite";
import dummyData from "./data";
import * as FileSystem from "expo-file-system";

interface Category {
    name: string;
    description: string;
}

interface Customization {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | string;
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[];
}

interface DummyData {
    categories: Category[];
    customizations: Customization[];
    menu: MenuItem[];
}

const data = dummyData as DummyData;

function delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

async function clearAll(collectionId: string): Promise<void> {
    try {
        const list = await database.listDocuments(
            appwriteConfig.databaseId,
            collectionId
        );

        await Promise.all(
            list.documents.map((doc) =>
                database.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
            )
        );
    } catch (err) {
        if (err instanceof Error) {
            console.error("Error uploading image:", err.message);
        } else {
            console.error("Error uploading image:", err);
        }
    }
}

async function clearStorage(): Promise<void> {
    try {
        const list = await storage.listFiles(appwriteConfig.bucketId);

        await Promise.all(
            list.files.map((file) =>
                storage.deleteFile(appwriteConfig.bucketId, file.$id)
            )
        );
    } catch (err) {
        if (err instanceof Error) {
            console.error("Error uploading image:", err.message);
        } else {
            console.error("Error uploading image:", err);
        }
    }
}

async function uploadImageToStorage(imageUrl: string): Promise<string> {
     try {
        const filename = imageUrl.split("/").pop() || `file-${Date.now()}.jpg`;
        const fileUri = FileSystem.documentDirectory + filename;

        await FileSystem.downloadAsync(imageUrl, fileUri);

        const file = await storage.createFile(
            appwriteConfig.bucketId,
            ID.unique(),
            {
                uri: fileUri,
                type: "image/jpeg",
                name: filename,
                size: 0
            }
        );

        return storage.getFileViewURL(appwriteConfig.bucketId, file.$id).href;
        
    } catch (err) {
        if (err instanceof Error) {
            console.error("Error uploading image:", err.message);
        } else {
            console.error("Error uploading image:", err);
        }
        return "";
    }
}

async function seed(): Promise<void> {
    try {
        // 1. Clear existing data
        await clearAll(appwriteConfig.categoriesCollectionId);
        await delay(200);
        await clearAll(appwriteConfig.customizationsCollectionId);
        await delay(200);
        await clearAll(appwriteConfig.menuCollectionId);
        await delay(200);
        await clearAll(appwriteConfig.menuCustomizationsCollectionId);
        await delay(200);
        await clearStorage();

        // 2. Create categories
        const categoryMap: Record<string, string> = {};
        for (const cat of data.categories) {
            const doc = await database.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.categoriesCollectionId,
                ID.unique(),
                cat
            );
            categoryMap[cat.name] = doc.$id;
            await delay(200);
        }

        // 3. Create customizations
        const customizationMap: Record<string, string> = {};
        for (const cus of data.customizations) {
            const doc = await database.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.customizationsCollectionId,
                ID.unique(),
                {
                    name: cus.name,
                    price: cus.price,
                    type: cus.type,
                }
            );
            customizationMap[cus.name] = doc.$id;
            await delay(200);
        }

        // 4. Create menu items and upload images
        for (const item of data.menu) {
            const uploadedImage = await uploadImageToStorage(item.image_url);
            await delay(200);

            const doc = await database.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.menuCollectionId,
                ID.unique(),
                {
                    name: item.name,
                    description: item.description,
                    image_url: uploadedImage,
                    price: item.price,
                    rating: item.rating,
                    calories: item.calories,
                    protein: item.protein,
                    categories: categoryMap[item.category_name],
                }
            );
            await delay(200);

            // 5. Add menu_customizations
            for (const cusName of item.customizations) {
                await database.createDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.menuCustomizationsCollectionId,
                    ID.unique(),
                    {
                        menu: doc.$id,
                        customization: customizationMap[cusName],
                    }
                );
                await delay(200);
            }
        }

        console.log("✅ Seeding complete.");
    } catch (err) {
        if (err instanceof Error) {
            console.error("Error uploading image:", err.message);
        } else {
            console.error("Error uploading image:", err);
        }
    }
}

export default seed;
