
import { LoaderFunction, json } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { gql } from "@apollo/client/index.js";
import { apolloClient } from "apollo/apolloClient";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import DOMPurify from "dompurify";
import { PostData, Post } from "~/models/Post";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    const { post } = data as PostData;
    return [{ title: post.title }];
  };

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const { data } = await apolloClient.query<{ post: Post }>({
      query: gql`
        query postEntryQuery($postID: String!, $language: String!) {
          post(id: $postID, locale: $language) {
            title
            content {
              json
            }
          }
        }
      `,
      variables: { postID: params.id, language: params.locale },
    });
    return json({ post: data.post });
  } catch (e) {
    console.log(e);
    return json({ error: "An error occurred" });
  }
};

function PostDetails() {
  const { post: { title, content } } = useLoaderData<PostData>();
  
  const contentText = documentToHtmlString(content.json);
  const sanitizedContentText = DOMPurify.sanitize(contentText);


  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContentText }} />
    </div>
  );
}

export default PostDetails;