import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDay } from '@/common/date';
import { img } from '@/common/randomImg';

const MinimalBlogPost = ({ blog, index }) => {
  let { title, blog_id: id, author, publishedAt } = blog;

  // Safely extract personal_info only if author exists
  const personal_info = author?.personal_info || {};
  const {
    fullname = 'Anonymous',
    username = 'Unknown',
    profile_img = img,
  } = personal_info;

  return (
    <Link to={`/blog/${id}`} className="flex gap-5 mb-8">
      <h1 className="blog-index">
        {index < 10 ? '0' + (index + 1) : index}
      </h1>

      <div>
        <div className="flex gap-2 items-center mb-7">
          <img src={profile_img} className="w-6 h-6 rounded-full" />
          <p className="line-clamp-1">
            {fullname} @{username}
          </p>
          <p className="min-w-fit">{getDay(publishedAt)}</p>
        </div>

        <h1 className="blog-title">{title}</h1>
      </div>
    </Link>
  );
};
MinimalBlogPost.propTypes = {
  title: PropTypes.string,
  blog_id: PropTypes.string,
  author: PropTypes.object,
  personal_info: PropTypes.object,
  publishedAt: PropTypes.string,
  blog: PropTypes.object,
  index: PropTypes.number,
};
export default MinimalBlogPost;
