// src/pages/BlogDetail.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { blogContent } from '../data';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays, Tag, Zap } from 'lucide-react';
import { renderHTML } from '../utils/renderHTML';

const SITE_URL = 'https://www.bcbcarts.com';
const NOINDEX_SLUGS = [];

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = blogContent.find(entry => entry.slug === slug);
  const maxVisibleTags = 5;
  const [showAllTags, setShowAllTags] = React.useState(false);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f6f0] px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h1 className="text-5xl font-serif text-slate-950 mb-4">
            Oops!
          </h1>

          <p className="text-lg text-slate-600 mb-6">
            We couldn’t find this blog post.
          </p>

          <Link
            to="/blogs"
            className="inline-block px-6 py-3 bg-emerald-950 rounded-full text-white font-semibold hover:bg-emerald-900 transition shadow-md"
          >
            Back to Articles
          </Link>
        </motion.div>
      </div>
    );
  }

  const visibleTags = showAllTags
    ? blog.tags || []
    : (blog.tags || []).slice(0, maxVisibleTags);

  const hasMoreTags = (blog.tags || []).length > maxVisibleTags;

  const firstParagraphIndex = blog.body.findIndex(
    block => block.type === 'paragraph'
  );

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.metaDescription,
    url: canonicalUrl,
    publisher: {
      '@type': 'Organization',
      name: 'BCBCarts',
      url: SITE_URL,
    },
    author: {
      '@type': 'Organization',
      name: 'BCBCarts',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  };

  return (
    <div className="min-h-screen bg-[#f7f6f0] text-slate-950">
      <Helmet>
        <title>{blog.title} | BCBCarts</title>
        <meta name="description" content={blog.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {NOINDEX_SLUGS.includes(slug) && (
          <meta name="robots" content="noindex,follow" />
        )}

        <script type="application/ld+json">
          {JSON.stringify(blogPostingJsonLd)}
        </script>
      </Helmet>

      <section className="relative overflow-hidden pt-32 pb-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f7f6f0] to-emerald-50" />

        <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute top-24 -right-32 h-96 w-96 rounded-full bg-lime-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-40 w-[700px] -translate-x-1/2 rounded-full bg-white/70 blur-2xl" />

        <div className="relative max-w-5xl mx-auto">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-950 hover:text-emerald-800 transition mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <motion.header
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 shadow-sm mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-800" />
              <span className="text-xs font-black tracking-[0.22em] uppercase text-emerald-950">
                BCBCarts Blog
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-[1.04] tracking-tight text-slate-950 max-w-5xl mx-auto">
              {blog.title}
            </h1>

            <p className="mt-6 text-lg md:text-xl leading-8 text-slate-600 max-w-3xl mx-auto">
              {blog.metaDescription}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
              <div className="inline-flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-emerald-800" />
                <span>BCBCarts Service Guide</span>
              </div>

              <div className="hidden sm:block h-1 w-1 rounded-full bg-slate-300" />

              <div className="inline-flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-800" />
                <span>Golf Cart Rentals & Service</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mt-8">
              {visibleTags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="bg-emerald-100/90 text-emerald-950 border border-emerald-200 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm"
                >
                  #{tag}
                </span>
              ))}

              {hasMoreTags && (
                <button
                  onClick={() => setShowAllTags(!showAllTags)}
                  className="text-emerald-950 text-sm font-bold px-3 py-1.5 border border-emerald-300 bg-white/70 rounded-full hover:bg-emerald-50 transition shadow-sm"
                >
                  {showAllTags ? 'Show Less' : '+ See All'}
                </button>
              )}
            </div>
          </motion.header>
        </div>
      </section>

      <section className="px-6 pb-24">
        <motion.div
          className="max-w-4xl mx-auto bg-white border border-stone-200 rounded-[2rem] shadow-2xl shadow-emerald-950/10 overflow-hidden"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="h-2 bg-gradient-to-r from-emerald-950 via-emerald-700 to-lime-500" />

          <article
            className="
              px-6 py-8 md:px-12 md:py-12
              prose prose-lg max-w-none
              prose-headings:text-slate-950
              prose-p:text-slate-700
              prose-p:leading-8
              prose-li:text-slate-700
              prose-li:leading-8
              prose-strong:text-slate-950
              prose-a:text-emerald-800
              prose-a:font-semibold
              prose-a:underline
              prose-a:decoration-emerald-700
              prose-a:underline-offset-2
            "
          >
            {blog.body.map((block, index) => {
              switch (block.type) {
                case 'heading':
                  return (
                    <h2
                      key={index}
                      className="mt-10 mb-5 text-3xl md:text-4xl font-black tracking-tight text-slate-950"
                    >
                      {block.text}
                    </h2>
                  );

                case 'subheading':
                  return (
                    <h3
                      key={index}
                      className="mt-10 mb-4 text-2xl font-black text-slate-950 border-l-4 border-emerald-800 pl-4"
                    >
                      {block.text}
                    </h3>
                  );

                case 'paragraph': {
                  const isFirstParagraph = index === firstParagraphIndex;

                  return (
                    <p
                      key={index}
                      className={`mt-5 text-slate-700 ${
                        isFirstParagraph
                          ? 'first-letter:text-7xl first-letter:font-serif first-letter:text-emerald-800 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.9]'
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
                      key={index}
                      className="mt-5 list-none space-y-3 pl-0"
                    >
                      {(block.items || []).map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="relative pl-8 text-slate-700"
                        >
                          <span className="absolute left-0 top-[0.65rem] h-2.5 w-2.5 rounded-full bg-emerald-800" />
                          {renderHTML(item)}
                        </li>
                      ))}
                    </ul>
                  );

                case 'cta':
                  return (
                    <div key={index} className="my-12 not-prose">
                      <div className="rounded-3xl bg-gradient-to-br from-emerald-950 to-emerald-800 p-8 md:p-10 text-center text-white shadow-xl">
                        <p className="text-sm font-black tracking-[0.22em] uppercase text-emerald-100 mb-3">
                          Ready to Get Started?
                        </p>

                        <h3 className="text-2xl md:text-3xl font-black mb-4">
                          Need help with a golf cart rental or service?
                        </h3>

                        <p className="text-emerald-50 max-w-2xl mx-auto mb-7 leading-7">
                          Contact BCBCarts with your city, date, rental duration, and a quick
                          description of what you need. We’ll help you figure out the right setup.
                        </p>

                        <Link
                          to={block.href || blog.ctaLink || '/contact'}
                          className="inline-flex"
                        >
                          <motion.div
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center justify-center gap-2 cursor-pointer px-8 py-4 bg-white rounded-full text-emerald-950 font-black hover:bg-emerald-50 transition shadow-lg"
                          >
                            <Zap className="w-5 h-5" />
                            {block.text}
                          </motion.div>
                        </Link>
                      </div>
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </article>
        </motion.div>

        <div className="max-w-4xl mx-auto mt-10 flex justify-end">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-emerald-950 font-black hover:text-emerald-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;