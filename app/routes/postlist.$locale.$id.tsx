
import { LoaderFunction, json } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { gql } from "@apollo/client/index.js";
import { apolloClient } from "apollo/apolloClient";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import DOMPurify from "isomorphic-dompurify";
import { PostData, Post } from "~/types/Post";
import ModelViewer from "~/components/ModelViewer";
import NavBar from '~/components/NavBar';

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
            glb {
                title
                contentType
                fileName
                url
            }
          }
        }
      `,
            variables: { postID: params.id, language: params.locale },
        });
        return json({ post: data.post, locale: params.locale });
    } catch (e) {
        console.log(e);
        return json({ error: "An error occurred" });
    }
};

function PostDetails() {
    const { post: { title, content, glb }, locale } = useLoaderData<PostData>();

    const contentText = documentToHtmlString(content.json);
    const sanitizedContentText = DOMPurify.sanitize(contentText);


    return (
        <div className="container">
            <NavBar locale={locale} />
            <main className="container mx-auto px-4">
                <h1 className="title">{title}</h1>
                <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: sanitizedContentText }}
                />
                {glb && (
                    <ModelViewer modelUrl={glb.url} />
                )}

                {glb && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">File</h2>
                        <a
                            href={glb.url}
                            download={glb.fileName}
                            className="text-blue-600 hover:underline"
                        >
                            Download {glb.fileName}
                        </a>
                    </div>
                )}
            </main>
        </div>
    );
}

export default PostDetails;