import { NavLink, MetaFunction, useLoaderData } from "@remix-run/react";
import { gql } from "@apollo/client/index.js";
import { apolloClient } from "apollo/apolloClient";
import { LoaderFunction, json } from "@remix-run/node";
import { PostCollectionData } from "~/types/Post";
import NavBar from "~/components/NavBar";

export const meta: MetaFunction = () => {
    return [{ title: "Post list" }];
};

export const loader: LoaderFunction = async ({ params }) => {
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
        console.log(data);
        return json({ postCollection: data.postCollection, locale: params.locale });
    } catch (e) {
        console.log(e);
        return json({ error: "An error occurred" });
    }
};

function PostList() {
    const { postCollection: { items }, locale } = useLoaderData<PostCollectionData>();

    return (
        <div className="container">
            <NavBar locale={locale} />
            <main className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
                    Post List
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <div key={item.sys.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
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
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );

}

export default PostList;