import axios from 'axios';

export class StorageHelper {

    private cacheFileCategories = {};
    private fileServiceUrl = '';
    private env;
    private gcsRootUrl = 'https://storage.googleapis.com';

    constructor(fileServiceUrl: string, env: string) {
        this.fileServiceUrl = fileServiceUrl;
        this.env = env;
        this.fetchAndCacheFileCategories();
    }

    public getPublicUrlByCategory = (category, fileName) => {
        const fileCategory = this.getFileCategoryByName(category);
        return `${this.gcsRootUrl}/${fileCategory.bucket}/` +
            `${fileCategory.directory}/${fileName}`;
    }

    private getFileCategoryByName = (
        categoryName: string,
    ): {
        bucket: string,
        directory: string,
    } => {
        if (!this.cacheFileCategories[categoryName]) {
            this.fetchAndCacheFileCategories();
            return { bucket: '', directory: '' };
        }
        return this.cacheFileCategories[categoryName];
    }

    private fetchAndCacheFileCategories = async () => {
        const response = await axios.request({
            url: '/private/file/v1/fileCategories',
            baseURL: this.fileServiceUrl,
            method: 'GET',
        });

        const fileCategories = response.data.fileCategories;

        for (const fileCategory of fileCategories) {
            this.cacheFileCategories[fileCategory.name] = {
                bucket: fileCategory.bucket + this.env,
                directory: fileCategory.directory,
            };
        }
    }

}
