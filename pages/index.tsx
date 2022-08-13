import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Greeting from '../components/Greeting';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typings';
import Link from 'next/link';

interface Props {
  posts: [Post];
}

const Home: NextPage = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Naremis Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Greeting />
      <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group border rounded-lg cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-tranformation duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt={post.title}
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt={post.author.name}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
  _id, 
  title,
  slug,
  description,
  mainImage,
  author ->{
  name,
  image
  }
}`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};

export default Home;
