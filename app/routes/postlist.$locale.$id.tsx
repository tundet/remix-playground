import { LoaderFunction, json, redirect } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { gql } from "@apollo/client/index.js";
import { apolloClient } from "apollo/apolloClient";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import DOMPurify from "isomorphic-dompurify";
import { PostData, Post } from "~/types/Post";
import ModelViewer from "~/components/ModelViewer";
import NavBar from '~/components/NavBar';
import Spinner from "~/components/Spinner";
import { motion } from 'framer-motion';
import { getSession } from "~/auth.server";
import { useEffect, useState } from "react";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    const { post } = data as PostData;
    return [{ title: post.title }];
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const session = await getSession(request.headers.get('Cookie'));

    if (!session.has('user')) {
        return redirect('/');
    }

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
        console.error(e);
        return json({ error: "An error occurred" });
    }
};

function PostDetails() {
    const { post: { title, content, glb }, locale } = useLoaderData<PostData>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (glb) {
            setIsLoading(false);
        }
    }, [glb]);

    const sanitizedContentText = DOMPurify.sanitize(
        documentToHtmlString(content.json)
    );

    return (
        <div>
            <NavBar locale={locale} />
            <main className="container mx-auto px-8 py-8 lg:py-12 flex flex-col lg:flex-row lg:space-x-8 border border-gray-200 shadow-lg rounded-lg bg-white">
                <div className="flex-1 space-y-8">
                    <motion.h1
                        className="title text-4xl font-extrabold mb-6 text-gray-900 border-b border-gray-300 pb-4"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {title}
                    </motion.h1>
                    <motion.div
                        className="content text-gray-700"
                        dangerouslySetInnerHTML={{ __html: sanitizedContentText }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
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
                <div className="w-full lg:w-1/3 mt-8 lg:mt-0 p-4 border border-gray-200 shadow-md rounded-lg bg-white">
                    {isLoading && (
                        <Spinner />
                    )}
                    {glb && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <ModelViewer modelUrl={glb.url} />
                        </motion.div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default PostDetails;
