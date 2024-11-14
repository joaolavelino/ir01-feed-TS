export type CommentType = {
  id: string;
  content: string;
  publishedAt: Date;
};

export type PostType = {
  id: string;
  author: AuthorType;
  content: ContentType[];
  tags: string[];
  publishedAt: Date;
};

type AuthorType = {
  avatarUrl: string;
  name: string;
  role: string;
};

type ContentType = {
  type: "paragraph" | "link";
  content: string;
};
