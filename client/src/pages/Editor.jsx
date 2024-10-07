import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/App';
import { Navigate, useParams } from 'react-router-dom';
import { createContext } from 'react';
import axios from 'axios';
import PublishForm from '@/components/PublishForm';
import BlogEditor from '@/components/manage-blogs/BlogEditor';
import Loader from '@/components/Loader';
const blogStructure = {
  title: '',
  banner: '',
  conent: [],
  tags: [],
  des: '',
  author: { personal_info: {} },
};

export const EditorContext = createContext({});

const Editor = () => {
  let { blog_id } = useParams();

  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState('editor');
  const [textEditor, setTextEditor] = useState({ isReady: false });
  const [loading, setLoading] = useState(true);

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  useEffect(() => {
    if (!blog_id) {
      return setLoading(false);
    }

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + 'get-blog', {
        blog_id,
        draft: true,
        mode: 'edit',
      })
      .then(({ data: { blog } }) => {
        setBlog(blog);
        setLoading(false);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        setBlog(null);
        setLoading(false);
      });
  }, []);

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        textEditor,
        setTextEditor,
      }}
    >
      {access_token === null ? (
        <Navigate to="/signin" />
      ) : loading ? (
        <Loader />
      ) : editorState == 'editor' ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </EditorContext.Provider>
  );
};

export default Editor;
