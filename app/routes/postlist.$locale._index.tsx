import { NavLink, MetaFunction, useLoaderData, redirect } from "@remix-run/react";
import { gql } from "@apollo/client/index.js";
import { apolloClient } from "apollo/apolloClient";
import { LoaderFunction, json } from "@remix-run/node";
import { PostCollectionData } from "~/types/Post";
import NavBar from "~/components/NavBar";
import { getSession } from "~/auth.server";
import { motion } from "framer-motion";
import Spinner from "~/components/Spinner";
import { useEffect, useState } from "react";


export const meta: MetaFunction = () => {
    return [{ title: "Post list" }];
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const session = await getSession(request.headers.get('Cookie'));

    if (!session.has('user')) {
        return redirect('/auth/login');
    }

    try {
        const { data } = await apolloClient.query<PostCollectionData>({
            query: gql`
          query postCollectionQuery($language: String!) {
            postCollection(locale: $language) {
              items {
                sys {
                  id
                }
                title
                thumbnail {
                    url
                }
              }
            }
          }
        `,
            variables: { language: params.locale },
        });
        return json({ postCollection: data.postCollection, locale: params.locale });
    } catch (e) {
        console.log(e);
        return json({ error: "An error occurred" });
    }
};

function PostList() {
    const { postCollection: { items }, locale } = useLoaderData<PostCollectionData>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (items) {
            setIsLoading(false);
        }
    }, [items]);

    return (
        <div>
            <NavBar locale={locale} />
            <main className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
                    Post List
                </h2>
                {isLoading && (<Spinner />)}

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {
                            opacity: 0,
                            scale: 0.8
                        },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            transition: {
                                delay: 0.3,
                                when: "beforeChildren",
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {items.map((item) => (
                        <motion.div
                            key={item.sys.id}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                        >
                            <div className="relative">
                                <img
                                    src={item.thumbnail?.url}
                                    alt="Post thumbnail"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
                                <div className="absolute inset-0 flex items-end p-4 text-white">
                                    <h3 className="text-xl font-semibold">{item.title}</h3>
                                </div>
                            </div>
                            <div className="p-6">
                                <NavLink to={item.sys.id} className="text-blue-600 hover:underline font-medium">
                                    Read more
                                </NavLink>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </main>
        </div>
    );

}

export default PostList;
