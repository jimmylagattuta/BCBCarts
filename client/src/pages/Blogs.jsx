// src/pages/Blogs.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { blogContent } from './../data';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const Blogs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTag, setActiveTag] = useState('');
    const [showAllTags, setShowAllTags] = useState(false);
    const [expandedTags, setExpandedTags] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [currentPage]);

    const pageSize = 6;
    const tagFrequency = blogContent.flatMap(b => b.tags || []).reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {});

    const allTags = useMemo(() => {
        const normalize = str => str.toLowerCase().replace(/[-\s]/g, '');
        const tagMap = {};

        Object.entries(tagFrequency).forEach(([tag]) => {
            const key = normalize(tag);
            if (!tagMap[key]) {
                tagMap[key] = tag;
            } else {
                const existing = tagMap[key];
                if (existing.includes('-') && !tag.includes('-')) {
                    tagMap[key] = tag;
                }
            }
        });

        return Object.values(tagMap).filter(tag => tagFrequency[tag] >= 2);
    }, []);

    const randomizedBlogs = useMemo(() => [...blogContent].sort(() => 0.5 - Math.random()), []);
    const filtered = useMemo(() => {
        const normalize = str => str.toLowerCase().replace(/[-\s]/g, '');
        if (searchTerm || activeTag) {
            const normalizedActiveTag = normalize(activeTag);
            return blogContent.filter(blog => {
                const matchText =
                    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    blog.metaDescription.toLowerCase().includes(searchTerm.toLowerCase());

                const matchTag = activeTag
                    ? blog.tags?.some(tag => normalize(tag) === normalizedActiveTag)
                    : true;

                return matchText && matchTag;
            });
        }
        return randomizedBlogs;
    }, [searchTerm, activeTag, randomizedBlogs]);

    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    const paginatedBlogs = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const toggleTagsFor = slug => setExpandedTags(prev => ({ ...prev, [slug]: !prev[slug] }));

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeTag]);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: filtered.map((blog, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            url: `https://www.bcbcarts.com/blog/${blog.slug}`,
            name: blog.title,
            description: blog.metaDescription,
        })),
    };

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 text-white"
            style={{
                background:
                    'linear-gradient(to bottom, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.7) 15%, rgba(6, 95, 70, 0.7) 50%, rgba(20, 184, 166, 0.7) 85%, rgba(20, 184, 166, 0) 100%)',
            }}

        >
            <Helmet>
                <title>Blog Spotlight | BCB Carts</title>
                <meta
                    name="description"
                    content="Explore expert insights, how-tos, and stories about BCB Cart rentals, Turo partnerships, and electric cart upgrades."
                />
                <link rel="canonical" href="https://www.bcbcarts.com/blogs" />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Helmet>

            <div className="max-w-5xl mx-auto">
                <motion.h1 className="text-5xl font-extrabold mb-4 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    🚗 Blog Spotlight
                </motion.h1>
                <motion.p className="text-lg text-purple-200 mb-10 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Expert car rental tips, cart upgrades, and more.
                </motion.p>

                {/* Search */}
                <div className="relative max-w-xl mx-auto mb-8">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300" />
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-full bg-white/20 placeholder-purple-300 text-white backdrop-blur-sm focus:outline-none focus:bg-white/30"
                    />
                </div>

                {/* Tags */}
                <motion.div className="flex flex-wrap justify-center gap-3 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {(showAllTags ? allTags : allTags.slice(0, 10)).map(tag => (
                        <motion.button
                            key={tag}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                            className={`text-sm font-medium px-4 py-2 rounded-full transition-all border-2 ${activeTag === tag
                                ? 'bg-white text-indigo-900 border-white'
                                : 'bg-transparent text-purple-200 border-purple-400 hover:bg-purple-600 hover:border-purple-600'
                                }`}
                        >
                            #{tag}
                        </motion.button>
                    ))}

                    {allTags.length > 10 && (
                        <button
                            onClick={() => setShowAllTags(!showAllTags)}
                            className="text-sm font-medium px-4 py-2 rounded-full bg-purple-700 hover:bg-purple-600 text-white border border-purple-500"
                        >
                            {showAllTags ? 'Show Less' : 'See All Tags'}
                        </button>
                    )}

                    {activeTag && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="text-sm font-medium px-4 py-2 rounded-full bg-red-500 text-white border-red-500"
                            onClick={() => setActiveTag('')}
                        >
                            Clear Tag
                        </motion.button>
                    )}
                </motion.div>

                {/* Posts */}
                {paginatedBlogs.length === 0 ? (
                    <motion.div
                        className="text-purple-300 italic text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        No matching blog posts found.
                    </motion.div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.1 } },
                        }}
                    >
                        <AnimatePresence>
                            {paginatedBlogs.map(blog => (
                                <motion.div
                                    key={blog.slug}
                                    className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <Link to={`/blog/${blog.slug}`}>
                                        <div className="p-6">
                                            <h2 className="text-2xl font-bold mb-2 text-white">
                                                {blog.title}
                                            </h2>
                                            <p className="text-purple-200 mb-4 line-clamp-3">
                                                {blog.metaDescription}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {(expandedTags[blog.slug]
                                                    ? blog.tags
                                                    : blog.tags.slice(0, 5)
                                                )?.map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs bg-purple-800 bg-opacity-50 text-purple-100 px-2 py-1 rounded-full"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {blog.tags.length > 5 && (
                                                    <button
                                                        onClick={e => {
                                                            e.preventDefault();
                                                            toggleTagsFor(blog.slug);
                                                        }}
                                                        className="text-xs bg-purple-600 bg-opacity-50 text-purple-100 px-2 py-1 rounded-full hover:bg-purple-700 transition"
                                                    >
                                                        {expandedTags[blog.slug]
                                                            ? 'Show Less'
                                                            : `+${blog.tags.length - 5} more`}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <motion.div
                                            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500"
                                            layoutId={`underline-${blog.slug}`}
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-center gap-3 mt-12">
                    <motion.button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        whileTap={{ scale: 0.9 }}
                        className="px-4 py-2 bg-purple-700 disabled:bg-purple-900 text-white rounded-lg"
                    >
                        Prev
                    </motion.button>

                    <motion.ul className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <motion.li key={p} whileHover={{ scale: 1.2 }}>
                                <button
                                    onClick={() => setCurrentPage(p)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full transition ${p === currentPage
                                        ? 'bg-gradient-to-r from-indigo-400 to-pink-500 text-white'
                                        : 'bg-white/20 text-purple-200 hover:bg-white/30'
                                        }`}
                                >
                                    {p}
                                </button>
                            </motion.li>
                        ))}
                    </motion.ul>

                    <motion.button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        whileTap={{ scale: 0.9 }}
                        className="px-4 py-2 bg-purple-700 disabled:bg-purple-900 text-white rounded-lg"
                    >
                        Next
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Blogs;
