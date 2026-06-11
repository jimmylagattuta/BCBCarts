// src/pages/Blogs.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { blogContent } from './../data';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Tag, ArrowRight } from 'lucide-react';

const SITE_URL = 'https://www.bcbcarts.com';

const normalizeTag = str => str.toLowerCase().replace(/[-\s]/g, '');

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);
  const [expandedTags, setExpandedTags] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentPage]);

  const tagFrequency = useMemo(() => {
    return blogContent
      .flatMap(blog => blog.tags || [])
      .reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {});
  }, []);

  const allTags = useMemo(() => {
    const tagMap = {};

    Object.entries(tagFrequency).forEach(([tag]) => {
      const key = normalizeTag(tag);

      if (!tagMap[key]) {
        tagMap[key] = tag;
      } else {
        const existing = tagMap[key];

        if (existing.includes('-') && !tag.includes('-')) {
          tagMap[key] = tag;
        }
      }
    });

    return Object.values(tagMap).sort((a, b) => {
      const frequencyDifference = (tagFrequency[b] || 0) - (tagFrequency[a] || 0);

      if (frequencyDifference !== 0) {
        return frequencyDifference;
      }

      return a.localeCompare(b);
    });
  }, [tagFrequency]);

  const filtered = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    const normalizedActiveTag = normalizeTag(activeTag);

    return blogContent.filter(blog => {
      const title = blog.title || '';
      const metaDescription = blog.metaDescription || '';
      const tags = blog.tags || [];

      const matchText =
        !search ||
        title.toLowerCase().includes(search) ||
        metaDescription.toLowerCase().includes(search) ||
        tags.some(tag => tag.toLowerCase().includes(search));

      const matchTag = activeTag
        ? tags.some(tag => normalizeTag(tag) === normalizedActiveTag)
        : true;

      return matchText && matchTag;
    });
  }, [searchTerm, activeTag]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;

  const paginatedBlogs = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleTagsFor = slug => {
    setExpandedTags(prev => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTag]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: filtered.map((blog, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/blog/${blog.slug}`,
      name: blog.title,
      description: blog.metaDescription,
    })),
  };

  return (
    <div className="min-h-screen bg-[#f7f6f0] text-slate-950">
      <Helmet>
        <title>Golf Cart Rental & Service Blog | BCBCarts</title>
        <meta
          name="description"
          content="Read BCBCarts guides about golf cart rentals, lithium upgrades, battery swaps, mobile golf cart repair, accessories, and custom cart service in Southern California."
        />
        <link rel="canonical" href={`${SITE_URL}/blogs`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="relative overflow-hidden pt-32 pb-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f7f6f0] to-emerald-50" />
        <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute top-24 -right-32 h-96 w-96 rounded-full bg-lime-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-40 w-[700px] -translate-x-1/2 rounded-full bg-white/70 blur-2xl" />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 shadow-sm mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-800" />
              <span className="text-xs font-black tracking-[0.22em] uppercase text-emerald-950">
                BCBCarts Blog
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-[1.04] tracking-tight text-slate-950 max-w-5xl mx-auto">
              Golf Cart Rental & Service Blog
            </h1>

            <p className="mt-6 text-lg md:text-xl leading-8 text-slate-600 max-w-3xl mx-auto">
              Helpful guides for golf cart rentals, lithium upgrades, battery swaps,
              mobile repairs, accessories, and custom golf cart service in Southern California.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
              <div className="inline-flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-800" />
                <span>Service Guides</span>
              </div>

              <div className="hidden sm:block h-1 w-1 rounded-full bg-slate-300" />

              <div className="inline-flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-800" />
                <span>Rentals, Repairs & Upgrades</span>
              </div>
            </div>
          </motion.div>

          <div className="relative max-w-2xl mx-auto mt-10">
            <div className="absolute inset-0 rounded-full bg-emerald-900/10 blur-xl" />

            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-800" />

              <input
                type="text"
                placeholder="Search golf cart guides..."
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                className="w-full pl-14 pr-5 py-5 rounded-full bg-white/95 border border-emerald-100 placeholder-slate-400 text-slate-950 shadow-xl shadow-emerald-950/10 focus:outline-none focus:ring-4 focus:ring-emerald-800/15 focus:border-emerald-700"
              />
            </div>
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {(showAllTags ? allTags : allTags.slice(0, 10)).map(tag => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                className={`text-sm font-black px-4 py-2 rounded-full transition-all border shadow-sm ${
                  activeTag === tag
                    ? 'bg-emerald-950 text-white border-emerald-950'
                    : 'bg-white/80 text-emerald-950 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-700'
                }`}
              >
                #{tag}
              </motion.button>
            ))}

            {allTags.length > 10 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="text-sm font-black px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white border border-slate-950 shadow-sm"
              >
                {showAllTags ? 'Show Less' : 'See All Tags'}
              </button>
            )}

            {activeTag && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                className="text-sm font-black px-4 py-2 rounded-full bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 shadow-sm"
                onClick={() => setActiveTag('')}
              >
                Clear Tag
              </motion.button>
            )}
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="text-sm font-black tracking-[0.18em] uppercase text-emerald-900">
                Latest Articles
              </p>

              <h2 className="mt-2 text-3xl md:text-4xl font-black text-slate-950">
                Golf Cart Help, Tips & Service Info
              </h2>
            </div>

            <p className="text-slate-500 font-semibold">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} found
            </p>
          </div>

          {paginatedBlogs.length === 0 ? (
            <motion.div
              className="rounded-3xl bg-white border border-stone-200 p-10 text-center shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-slate-600 font-semibold">
                No matching blog posts found.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              <AnimatePresence>
                {paginatedBlogs.map((blog, blogIndex) => {
                  const tags = blog.tags || [];
                  const displayedTags = expandedTags[blog.slug]
                    ? tags
                    : tags.slice(0, 5);

                  const isFeatured = currentPage === 1 && blogIndex === 0 && !searchTerm && !activeTag;

                  return (
                    <motion.article
                      key={blog.slug}
                      className={`group relative bg-white border border-stone-200 rounded-[2rem] overflow-hidden shadow-xl shadow-emerald-950/5 hover:shadow-2xl hover:shadow-emerald-950/10 transition-all ${
                        isFeatured ? 'md:col-span-2' : ''
                      }`}
                      variants={{
                        hidden: { opacity: 0, y: 18 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      whileHover={{ y: -5 }}
                      exit={{ opacity: 0, y: -18 }}
                    >
                      <Link to={`/blog/${blog.slug}`} className="block h-full">
                        <div className="h-2 bg-gradient-to-r from-emerald-950 via-emerald-700 to-lime-500" />

                        <div className={isFeatured ? 'p-8 md:p-10' : 'p-7'}>
                          <div className="mb-5 flex items-center justify-between gap-4">
                            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5">
                              <span className="h-2 w-2 rounded-full bg-emerald-800" />
                              <span className="text-xs font-black tracking-[0.16em] uppercase text-emerald-950">
                                Golf Cart Guide
                              </span>
                            </div>

                            {isFeatured && (
                              <span className="hidden sm:inline-flex rounded-full bg-slate-950 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white">
                                Featured
                              </span>
                            )}
                          </div>

                          <h3
                            className={`font-black tracking-tight text-slate-950 leading-tight group-hover:text-emerald-950 transition ${
                              isFeatured ? 'text-3xl md:text-5xl max-w-4xl' : 'text-2xl'
                            }`}
                          >
                            {blog.title}
                          </h3>

                          <p
                            className={`text-slate-600 mt-4 mb-6 leading-8 ${
                              isFeatured ? 'text-lg max-w-3xl' : 'line-clamp-3'
                            }`}
                          >
                            {blog.metaDescription}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {displayedTags.map((tag, index) => (
                              <span
                                key={`${blog.slug}-${tag}-${index}`}
                                className="text-xs bg-emerald-50 text-emerald-950 border border-emerald-100 px-2.5 py-1 rounded-full font-bold"
                              >
                                #{tag}
                              </span>
                            ))}

                            {tags.length > 5 && (
                              <button
                                onClick={event => {
                                  event.preventDefault();
                                  toggleTagsFor(blog.slug);
                                }}
                                className="text-xs bg-stone-100 text-slate-700 px-2.5 py-1 rounded-full hover:bg-stone-200 transition font-bold"
                              >
                                {expandedTags[blog.slug]
                                  ? 'Show Less'
                                  : `+${tags.length - 5} more`}
                              </button>
                            )}
                          </div>

                          <div className="mt-7 inline-flex items-center gap-2 text-emerald-950 font-black">
                            Read article
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>

                        <div className="pointer-events-none absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-emerald-100/70 blur-2xl transition group-hover:bg-lime-100" />
                      </Link>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}

          <div className="flex items-center justify-center gap-3 mt-12">
            <motion.button
              onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2 bg-emerald-950 disabled:bg-stone-300 disabled:text-stone-500 text-white rounded-lg font-black"
            >
              Prev
            </motion.button>

            <ul className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                <li key={page}>
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition font-black ${
                      page === currentPage
                        ? 'bg-emerald-950 text-white'
                        : 'bg-white border border-stone-200 text-slate-700 hover:bg-emerald-50'
                    }`}
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>

            <motion.button
              onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
              disabled={currentPage === totalPages}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-2 bg-emerald-950 disabled:bg-stone-300 disabled:text-stone-500 text-white rounded-lg font-black"
            >
              Next
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;