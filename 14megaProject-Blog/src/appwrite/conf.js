import { Client, Account, ID, Databases, Storage, Query } from 'appwrite' 
import config from '../config/config'

export class Service{
    client=new Client();
    databases;
    bucket;
    account;

    constructor(){
        try{

            this.client
                .setEndpoint(config.appwriteURL)
                .setProject(config.appwriteProjectId)
                
            this.databases=new Databases(this.client)
            this.bucket=new Storage(this.client)
            this.account = new Account(this.client) 
                console.log('Appwrite client initialized successfully');
    
        }catch(error){
            console.error('Appwrite client initialization failed:', error);
        }
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(config.appwriteDatabaseId, config.appwriteCollectionId, slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch(error){
            console.log(error)
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true

        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getPosts(queries=[Query.equal("status", "active")]){
        try {
            const response = await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            );
            console.log("Fetched posts:", response); // Add this log
            return response;
        } catch (error) {
            console.error("Error in getPosts:", error);
            return null;
        }

    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log(error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }

    async getUser(userId) {
        try {
            return await this.account.get(userId);
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    }
}

const service=new Service();
export default service;