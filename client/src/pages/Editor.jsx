import { useContext } from 'react';
import { UserContext } from '../App';

const Editor = () => {
  let {
    userAuth: { access_token },
  } = useContext(UserContext);
  return <></>;
};

export default Editor;
