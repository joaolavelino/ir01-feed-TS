import { Avatar } from "../Avatar/Avatar";
import { Comment } from "../Comment/Comment";
import styles from "./Post.module.css";
import { formatDateTime, formatRelativeDate } from "../../functions/formatDate";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { CommentType, PostType } from "../../types";

interface PostProps {
  post: PostType;
}

export const Post = ({ post }: PostProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  const [newCommentText, setNewCommentText] = useState("");

  // ----- DYNAMIC RENDERING -----
  const postContent = post.content.map((line, index) => {
    switch (line.type) {
      case "paragraph":
        return <p key={index}>{line.content}</p>;

      case "link":
        return (
          <p key={index}>
            <a href={line.content}>{line.content}</a>
          </p>
        );
      default:
        <p key={index}>{line.content}</p>;
        break;
    }
  });

  const postTags = post.tags.map((tag, index) => {
    return (
      <a href="" key={index}>
        #{tag}
      </a>
    );
  });

  // ----- FORM FUNCTIONS -----

  function handleSubmitComment(event: FormEvent) {
    event.preventDefault();
    const newComment: CommentType = {
      id: uuidv4(),
      publishedAt: new Date(Date.now()),
      content: newCommentText,
    };
    setComments([...comments, newComment]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value);
  }

  function handleCommentValidation(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("O comentário não pode ser vazio");
  }

  const isNewCommentEmpty = !newCommentText.length;

  // ----- MANAGE COMMENTS -----

  const deleteComment = (id: string) => {
    let updatedCommentList = comments.filter((comment) => comment.id !== id);
    setComments(updatedCommentList);
  };

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} border />
          <div className={styles.info}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        <time
          title={formatDateTime(post.publishedAt)}
          dateTime={post.publishedAt.toISOString()}
        >
          {formatRelativeDate(post.publishedAt)}
        </time>
      </header>
      <div className={styles.content}>
        {postContent}

        <p>{postTags}</p>
      </div>
      <form
        action="POST"
        onSubmit={handleSubmitComment}
        className={styles.commentForm}
      >
        <label htmlFor="comment">Deixe seu feedback</label>
        <textarea
          name="comment"
          id="comment"
          placeholder="Deixe um comentário"
          onChange={(e) => handleNewCommentChange(e)}
          value={newCommentText}
          required
          onInvalid={handleCommentValidation}
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Enviar
          </button>
        </footer>
      </form>
      <div className={styles.commentSection}>
        {comments.map((comment) => (
          <Comment
            content={comment.content}
            publishedAt={comment.publishedAt}
            key={comment.id.toString()}
            id={comment.id}
            onDelete={deleteComment}
          />
        ))}
      </div>
    </article>
  );
};
