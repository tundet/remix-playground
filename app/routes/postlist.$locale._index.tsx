import { NavLink, MetaFunction, useLoaderData } from "@remix-run/react";
import { gql } from "@apollo/client/index.js";
import { apolloClient } from "apollo/apolloClient";
import { LoaderFunction, json } from "@remix-run/node";
import { Post, PostCollectionData } from "~/models/Post";

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
              }
            }
          }
        `,
            variables: { language: params.locale },
        });
        console.log(data);
        return json(data);
    } catch (e) {
        console.log(e);
        return json({ error: "An error occurred" });
    }
};

function PostList() {
    const { postCollection: { items } } = useLoaderData<PostCollectionData>();

    return (
        <div>
            <h1>Here is a list of post entries:</h1>
            {items.map((item) => (
                <div key={item.sys.id}>
                    <NavLink to={`${item.sys.id}`}>
                        <p>{item.title}</p>
                    </NavLink>
                </div>
            ))}
        </div>
    );
}

export default PostList;