export declare class StorageHelper {
    private cacheFileCategories;
    private fileServiceUrl;
    private env;
    private gcsRootUrl;
    constructor(fileServiceUrl: string, env: string);
    getPublicUrlByCategory: (category: any, fileName: any) => string;
    private getFileCategoryByName;
    private fetchAndCacheFileCategories;
}
