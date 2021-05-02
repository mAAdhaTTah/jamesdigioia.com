import {
  getLayoutProps,
  getPageSlugs,
  getPostSlugs,
  getContextBySlug,
} from '../api';
import { Post } from '../components';
import { DEFAULT_REVALIDATE_TIME, LONG_REVALIDATE_TIME } from '../constants';
import { Page } from '../containers/Page';
import { withSEO } from '../decorators';

/** @typedef {{ slug: string }} SlugParams */
/** @typedef {{ layout: any, seo: any; data: import('react').ComponentProps<typeof Page> }} Props */

const Slug = ({ data }) => {
  return data.format ? <Post.Article {...data} /> : <Page {...data} />;
};

/** @type import('next').GetStaticPaths<SlugParams> */
export const getStaticPaths = async () => {
  return {
    paths: [...(await getPageSlugs()), ...(await getPostSlugs())],
    fallback: 'blocking',
  };
};

/** @type import('next').GetStaticProps<Props, SlugParams> */
export const getStaticProps = async ({ params }) => {
  const { data, seo } = await getContextBySlug(params.slug);

  return {
    props: {
      layout: await getLayoutProps(),
      data,
      seo,
    },
    revalidate: data.format ? DEFAULT_REVALIDATE_TIME : LONG_REVALIDATE_TIME,
  };
};

export default withSEO()(Slug);
