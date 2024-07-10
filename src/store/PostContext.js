import { createContext, useState } from "react";

export const PostContext = createContext(null);

function Post({ children }) {
  const [postDetiles, setPostDetiles] = useState();

  return (
    <PostContext.Provider value={{ postDetiles, setPostDetiles }}>
      {children}
    </PostContext.Provider>
  );
}

export default Post;
