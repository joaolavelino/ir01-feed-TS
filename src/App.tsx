import "./global.css";
import styles from "./App.module.css";
import Header from "./components/header/Header";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Post } from "./components/post/Post";
import { posts } from "./data";

function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </main>
      </div>
    </>
  );
}

export default App;
