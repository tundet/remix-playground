import { Document } from '@contentful/rich-text-types';

export interface PostData {
  post: Post;
}

export interface Post {
  sys: Sys;
  title: string;
  content: Content;
}

export interface PostCollectionData {
    postCollection: {
      items: Post[];
    };
  }

interface Sys {
  id: string;
}

interface Content {
  json: Document;
}

