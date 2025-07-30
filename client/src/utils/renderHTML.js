import DOMPurify from 'dompurify';
import parse, { domToReact } from 'html-react-parser';
import { Link } from 'react-router-dom';

export const renderHTML = (html) => {
  const clean = DOMPurify.sanitize(html);
  return parse(clean, {
    replace: (node) => {
      if (node.name === 'a' && node.attribs?.href?.startsWith('/blog/')) {
        // turn internal blog links into <Link/>
        return <Link to={node.attribs.href}>{domToReact(node.children)}</Link>;
      }
      // leave external links as <a>, but you could force target="_blank" here
      return undefined;
    },
  });
};