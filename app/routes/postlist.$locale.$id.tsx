
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
        <div>
            <NavBar locale={locale} />
            <main className="container mx-auto px-8 py-8 lg:py-12 flex flex-col lg:flex-row lg:space-x-8 border border-gray-200 shadow-lg rounded-lg bg-white">
                {/* Content and file download section */}
                <div className="flex-1 space-y-8">
                    <h1 className="title text-4xl font-extrabold mb-6 text-gray-900 border-b border-gray-300 pb-4">
                        {title}
                    </h1>
                    <div
                        className="content text-gray-700"
                        dangerouslySetInnerHTML={{ __html: sanitizedContentText }}
                    />
                    {glb && (
                        <div className="mt-8 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
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
                </div>
                {glb && (
                    <div className="w-full lg:w-1/3 mt-8 lg:mt-0 p-4 border border-gray-200 shadow-md rounded-lg bg-white">
                        <ModelViewer modelUrl={glb.url} />
                    </div>
                )}
            </main>
        </div>
    );
}

export default PostDetails;