import { Document } from '@contentful/rich-text-types';

export interface PostData {
    post: Post;
    locale: string;
}

export interface Post {
    sys: Sys;
    title: string;
    content: Content;
    thumbnail: File;
    glb?: File;
}

export interface PostCollectionData {
    postCollection: {
        items: Post[];
    };
    locale: string;
}

interface Sys {
    id: string;
}

interface Content {
    json: Document;
}

interface File {
    title: string;
    url: string;
    contentType: string;
    fileName: string;
}

