import React from 'react';
import cc from 'classcat';
import { FaLink } from 'react-icons/fa';
import { useParseHTML } from '../../../hooks';
import Article from '../../Article';
import EntryMeta from '../../EntryMeta';
import { Link } from '../../typography';

const linkClass = cc([
  'bg-darkg',
  'mb-3',
  'p-3',
  'flex',
  'text-primary',
  'font-header',
  'rounded',
  'text-lg',
  'link-title',
]);

const iconClass = cc(['mr-3', 'link-info']);

const LinkFormat = ({
  title,
  slug,
  date,
  dateTime,
  commentCount,
  author,
  fields,
  content,
  meta,
  embedlyRetrieved,
  embedlyProviderUrl,
  embedlyProviderName,
  embedlyDescription,
}) => {
  return (
    <Article variant="lightg">
      <div className="mb-3">{useParseHTML(content)}</div>
      <div className="link-meta">
        <Link href={meta.linkUrl} className={linkClass}>
          <FaLink className={iconClass} /> {useParseHTML(title)}
        </Link>
        {embedlyRetrieved && (
          <>
            <p className="link-provider">
              Source:{' '}
              <Link href={embedlyProviderUrl} target="_blank">
                {embedlyProviderName}
              </Link>
            </p>
            <small className="link-description">{embedlyDescription}</small>
          </>
        )}
      </div>

      <EntryMeta
        date={date}
        dateTime={dateTime}
        commentCount={commentCount}
        author={author.name}
      />
    </Article>
  );
};

export default LinkFormat;