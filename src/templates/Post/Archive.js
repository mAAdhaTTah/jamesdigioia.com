import React from 'react';
import { withSEO } from '../../decorators';
import { Post, Pagination } from '../../components';

const PostArchive = ({ pageContext, hasNextPage }) => {
  return (
    <>
      <div className="max-w-xl mx-auto">
        {pageContext.posts.map(({ node }) => (
          <Post.Excerpt key={node.id} {...node} />
        ))}
      </div>
      <Pagination
        pageNumber={pageContext.pageNumber}
        hasNextPage={pageContext.hasNextPage}
        slug="writing"
      />
    </>
  );
};

export default PostArchive
  |> withSEO(({ pageContext: { pageNumber } }) => ({
    title: `Writing${pageNumber > 1 ? ` | Page ${pageNumber}` : ''}`,
  }));
