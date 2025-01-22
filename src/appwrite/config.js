import { Client, Storage } from "appwrite";

const client = new Client();
client.setEndpoint(import.meta.env.ITE_APPWRITE_ENDPOINT);
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const storage = new Storage(client);

const buckets = [
  {
    name: "profilePictures",
    id: import.meta.env.VITE_APPWRITE_PROFILEPIC_BUCKET_ID,
  },
];

export { client, storage, buckets };
