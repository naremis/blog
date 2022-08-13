import { PortableText } from '@portabletext/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Header from '../../components/Header';
import { sanityClient, urlFor } from '../../sanity';
import { Post } from '../../typings';

function Post(porps: { post: Post }) {
  const { post } = porps;
  console.log(post);
  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto">
        <img
          className="w-full h-80 object-cover"
          src={urlFor(post.mainImage).url()!}
          alt={post.title}
        />
        <article className="max-w-4xl mx-auto p-5">
          <h1 className="text-4xl mt-10 mb-3 font-bold">{post.title}</h1>
          <p className="text-sm">{post.description}</p>
          <div className="flex items-center space-x-2">
            <img
              className="h-12 w-12 rounded-full"
              src={urlFor(post.author.image).url()!}
              alt={post.author.name}
            />
            <p className="text-sm font-extralight">
              Blog post by{' '}
              <span className="text-orange-600"> {post.author.name}</span> -
              Published at {new Date(post._createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-10">
            <PortableText
              value={post.body}
              components={{
                block: {
                  h1: (props: any) => (
                    <h1 className="text-2xl font-bold my-5">
                      {props.children}
                    </h1>
                  ),
                  h2: (props: any) => (
                    <h2 className="text-4xl">{props.children}</h2>
                  ),
                  p: (props: any) => (
                    <p className="text-lg">{props.children}</p>
                  ),
                  li: (props: any) => (
                    <li className="ml-4 list-disc">{props.children}</li>
                  ),
                },
                types: {
                  image: ({ value, isInline }) => (
                    <img
                      className="w-full"
                      src={urlFor(value).url()}
                      alt={'Main Image'}
                    />
                  ),
                },
                marks: {
                  link: ({ href, children }: any) => (
                    <a
                      href={href}
                      className="text-orange-600 hover:underline cursor-pointer"
                    >
                      {children}
                    </a>
                  ),
                },
              }}
            />
          </div>
        </article>
        <hr className="max-w-lg my-5 mx-5 sm:mx-auto border-orange-500" />
        <form className="flex flex-col p-5 my-10 max-w-2xl mb-10">
          <h3 className="text-sm text-orange-500">Enjoyed the article?</h3>
          <h3 className="text-3xl font-bold">Leave a comment below</h3>
          <hr className="py-3 mt-2" />
          <label className="block mb-5">
            <span className="text-gray-700 ">Name</span>
            <input
              className="shadow border  rounded  py-2 px-3 form-input mt-1 block w-full ring-orange-500 focus:ring outline-none"
              placeholder="Khan Shab"
              type="text"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700 ">Email</span>
            <input
              className="shadow border  rounded  py-2 px-3 form-input mt-1 block w-full ring-orange-500 focus:ring outline-none"
              placeholder="user@email.com"
              type="text"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700 ">Comment</span>
            <textarea
              className="shadow border  rounded  py-2 px-3 form-text-area mt-1 block w-full ring-orange-500 focus:ring outline-none"
              placeholder="Khan Shab"
              rows={8}
            />
          </label>
        </form>
      </div>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type=="post"]{
    _id, 
    slug,
  }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type=="post" && slug.current=="${params?.slug}"]{
    _id, 
    title,
    slug,
    description,
    mainImage,
    author ->{
      name,
      image
    },
    _createdAt,
    body 
  }`;
  const post = await sanityClient.fetch(query);
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post: post[0],
    },
    revalidate: 60, //update every 60 seconds
  };
};
