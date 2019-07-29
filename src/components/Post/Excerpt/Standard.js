import React from 'react';
import cc from 'classcat';
import { Link } from 'gatsby';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useParseHTML, useStripHTML } from '../../../hooks';
import { LinkedArticleHeader, Body } from '../../typography';
import EntryMeta from '../../EntryMeta';
import Article from '../../Article';

const linkClass = cc([
  'font-body',
  'flex',
  'flex-row',
  'items-center',
  'float-right',
  'no-underline',
  'bg-darkg',
  'p-2',
  'text-primary',
  'rounded',
  'mt-3',
]);
const iconClass = cc(['ml-2']);

const StandardFormat = ({
  slug,
  title,
  date,
  dateTime,
  commentCount,
  author,
  excerpt,
}) => (
  <Article>
    <header>
      {/* @TODO(mAAdhaTTah) building the slug here is bad */}
      <LinkedArticleHeader href={`/${slug}/`}>
        {useParseHTML(title)}
      </LinkedArticleHeader>
      <EntryMeta
        date={date}
        dateTime={dateTime}
        commentCount={commentCount}
        author={author.name}
      />
    </header>

    <Body component="span">
      {useStripHTML(excerpt)} &#8230;
      <Link to={`/${slug}/`} className={linkClass}>
        Read more <FaLongArrowAltRight className={iconClass} />
      </Link>
    </Body>
  </Article>
);

export default StandardFormat;