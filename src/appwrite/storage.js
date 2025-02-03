import { buckets, storage } from "./config";
import { ID } from "appwrite";

const storageAPI = {};

buckets.forEach((bucket) => {
  storageAPI[bucket.name] = {
    // Upload file
    upload: async (file) => {
      try {
        const response = await storage.createFile(
          bucket.id, // Bucket ID
          ID.unique(), // File ID (unique ID or custom)

          file // The file object to upload (e.g., file input)
        );
        return response;
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      }
    },

    upload2: async (fileId, file) => {
      try {
        const response = await storage.createFile(
          bucket.id, // Bucket ID
          fileId, // File ID (unique ID or custom)

          file // The file object to upload (e.g., file input)
        );
        return response;
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      }
    },

    // Get file by ID
    get: async (fileId) => {
      try {
        const response = await storage.getFileView(bucket.id, fileId);
        return response; // Return file details
      } catch (error) {
        console.error("Error getting file:", error);
        throw error;
      }
    },

    // Delete file by ID
    delete: async (fileId) => {
      try {
        await storage.deleteFile(bucket.id, fileId);
        return { success: true }; // Return success message
      } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
      }
    },

    // List files (optional)
    list: async (queries = []) => {
      try {
        const response = await storage.listFiles(bucket.id, queries);
        return response.files; // Return list of files
      } catch (error) {
        console.error("Error listing files:", error);
        throw error;
      }
    },
  };
});

export { storageAPI };
