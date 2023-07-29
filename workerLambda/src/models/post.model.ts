import mongoose, { Document, Schema } from 'mongoose';

enum PostStatusEnum {
  draft = 'draft',
  published = 'published',
  archived = 'archived',
}

type PostDocument = Document & {
  title: string;
  slug: string;
  content: string;
  tags: string[];
  status: PostStatusEnum;
  viewCount: number;
  isFeatured: boolean;
  author: any;
};

type PostInput = {
  title: String;
  content: String;
  tags: String;
  isFeatured: Boolean;

};

const userSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: false,
    unique: true,
  },
  slug: {
    type: Schema.Types.String,
    required: false,
    unique: true,
  },
  content: {
    type: Schema.Types.String,
    required: false,
  },
  tags: {
    type: Schema.Types.Array,
    required: false,
  },
  status: {
    type: Schema.Types.String,
    required: false,
    enum: PostStatusEnum,
    default: PostStatusEnum.draft,
  },
  viewCount: {
    type: Schema.Types.Number,
    required: false,
    default: 0,
  },
  isFeatured: {
    type: Schema.Types.Boolean,
    required: false,
    default: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'BusinessUser',
    required: false,
    index: true,
  },
}, {
  collection: "posts",
  timestamps: true,
});

const Post = mongoose.model<PostDocument>('Post', userSchema);

export { Post, PostDocument, PostInput, PostStatusEnum};
