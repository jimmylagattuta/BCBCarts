// src/pages/Blog.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { blogContent } from '../data'; // Adjust path if needed
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { renderHTML } from '../utils/renderHTML'; // Custom utility to safely render HTML

const NOINDEX_SLUGS = [];

const Blog = ({ setShowContact }) => {
    const { slug } = useParams();
    const blog = blogContent.find(entry => entry.slug === slug);
    const maxVisibleTags = 5;
    const [showAllTags, setShowAllTags] = React.useState(false);

    const visibleTags = showAllTags
        ? blog?.tags
        : blog?.tags?.slice(0, maxVisibleTags) || [];
    const hasMoreTags = blog?.tags?.length > maxVisibleTags;

    const firstParagraphIndex = blog?.body.findIndex(
        block => block.type === 'paragraph'
    );

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 px-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <h1 className="text-5xl font-serif text-white mb-4 drop-shadow-lg">Oops!</h1>
                    <p className="text-lg text-purple-200 mb-6">We couldn’t find this blog post.</p>
                    <Link
                        to="/blogs"
                        className="inline-block px-6 py-3 bg-pink-600 rounded-full text-white font-semibold hover:bg-pink-700 transition shadow-md"
                    >
                        Back to Articles
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen pt-28 pb-20 px-6 text-white"
            style={{
                background:
                    'linear-gradient(to bottom, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.7) 15%, rgba(6, 95, 70, 0.7) 50%, rgba(31, 113, 104, 0.7) 85%, rgba(20, 184, 166, 0) 100%)',
            }}
        >
            <Helmet>
                <title>{blog.title} | BCBCarts</title>
                <meta name="description" content={blog.metaDescription} />
                <link rel="canonical" href={`https://www.bcb-carts.com/blog/${slug}`} />
                {NOINDEX_SLUGS.includes(slug) && (
                    <meta name="robots" content="noindex,follow" />
                )}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: blog.title,
                        description: blog.metaDescription,
                        url: `https://www.bcb-carts.com/blog/${slug}`,
                        publisher: {
                            '@type': 'Organization',
                            name: 'BCBCarts',
                            url: 'https://www.bcb-carts.com',
                        },
                        author: {
                            '@type': 'Person',
                            name: 'James Lagattuta',
                        },
                    })}
                </script>
            </Helmet>

            <div className="max-w-4xl mx-auto space-y-12">
                {/* Title & Tags */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h1
                        className="text-4xl md:text-5xl font-serif leading-tight text-center drop-shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {blog.title}
                    </motion.h1>

                    <motion.div
                        className="flex flex-wrap gap-2 justify-center mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {visibleTags.map((tag, i) => (
                            <motion.span
                                key={i}
                                className="bg-purple-800/60 text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                #{tag}
                            </motion.span>
                        ))}
                        {hasMoreTags && (
                            <motion.button
                                onClick={() => setShowAllTags(!showAllTags)}
                                className="text-purple-300 text-sm px-3 py-1 border border-purple-500 rounded-full cursor-pointer hover:bg-purple-700 transition"
                                whileHover={{ scale: 1.05 }}
                            >
                                {showAllTags ? 'Show Less' : '+ See All'}
                            </motion.button>
                        )}
                    </motion.div>
                </motion.div>

                {/* Blog Content */}
                <motion.div
                    className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <article
                        className="
              prose prose-invert prose-lg max-w-none
              [&_a:not(.bm-cta)]:text-white [&_a:not(.bm-cta)]:font-semibold [&_a:not(.bm-cta)]:underline [&_a:not(.bm-cta)]:decoration-white [&_a:not(.bm-cta)]:underline-offset-2
              hover:[&_a:not(.bm-cta)]:decoration-white/70
              [&_a:not(.bm-cta)]:transition-colors
            "
                    >
                        {blog.body.map((block, i) => {
                            switch (block.type) {
                                case 'heading':
                                    return (
                                        <h2
                                            key={i}
                                            className="mt-10 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-500"
                                        >
                                            {block.text}
                                        </h2>
                                    );
                                case 'subheading':
                                    return (
                                        <h3
                                            key={i}
                                            className="mt-8 text-xl font-semibold text-white border-l-4 border-indigo-400 pl-4"
                                        >
                                            {block.text}
                                        </h3>
                                    );
                                case 'paragraph': {
                                    const isFirstPara = i === firstParagraphIndex;
                                    return (
                                        <p
                                            key={i}
                                            className={`mt-6 text-slate-200 ${isFirstPara
                                                    ? 'first-letter:text-6xl first-letter:font-serif first-letter:text-pink-500 first-letter:mr-3 first-letter:float-left'
                                                    : ''
                                                }`}
                                        >
                                            {renderHTML(block.text)}
                                        </p>
                                    );
                                }
                                case 'list':
                                    return (
                                        <ul
                                            key={i}
                                            className="mt-6 list-disc text-slate-200 space-y-2 marker:text-pink-400 pl-8"
                                        >
                                            {block.items.map((item, j) => (
                                                <li key={j}>{renderHTML(item)}</li>
                                            ))}
                                        </ul>
                                    );
                                case 'cta':
                                    return (
                                        <div key={i} className="my-8 text-center not-prose">
                                            <Link to="/car-rentals" className="not-prose">
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className="bm-cta inline-flex items-center justify-center gap-2 cursor-pointer px-8 py-3 bg-pink-600 rounded-full text-white font-semibold hover:bg-pink-700 transition shadow-lg"
                                                >
                                                    <Zap className="w-5 h-5" />
                                                    {block.text}
                                                </motion.div>
                                            </Link>
                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </article>
                </motion.div>

                {/* Back link */}
                <div className="flex justify-end">
                    <Link to="/blogs" className="text-purple-200 font-medium hover:underline">
                        ← Back to Articles
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Blog;
