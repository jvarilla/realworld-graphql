'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _resolver = require('../resources/resolver');

var _resolver2 = _interopRequireDefault(_resolver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* babel-plugin-inline-import '../../data/schema.graphql' */var typeDefs = '### Articles\r\ntype Article {\r\n  author: Profile!\r\n  body: String!\r\n  comments(first: Int, after: String): CommentsConnection\r\n  createdAt: String!\r\n  description: String!\r\n  favorited: Boolean!\r\n  favoritesCount: Int!\r\n  slug: String!\r\n  tagList: [String],\r\n  title: String!\r\n  updatedAt: String!\r\n}\r\n\r\ntype ArticleEdge {\r\n  cursor: String!\r\n  node: Article\r\n}\r\n\r\ntype ArticlesConnection {\r\n  count: Int!\r\n  edges: [ArticleEdge]\r\n  pageInfo: PageInfo!\r\n}\r\n\r\n### Comments\r\ntype Comment {\r\n  author: Profile!\r\n  article: Article!\r\n  body: String!\r\n  createdAt: String!\r\n  updatedAt: String!\r\n}\r\n\r\ntype CommentEdge {\r\n  cursor: String!\r\n  node: Comment\r\n}\r\n\r\ntype CommentsConnection {\r\n  count: Int!\r\n  edges: [CommentEdge]\r\n  pageInfo: PageInfo!\r\n}\r\n\r\ntype DeletionStatus {\r\n  success: Boolean!\r\n}\r\n\r\ntype PageInfo {\r\n  endCursor: String\r\n  hasNextPage: Boolean!\r\n  hasPreviousPage: Boolean!\r\n  startCursor: String\r\n}\r\n\r\n### Profile\r\ntype Profile {\r\n  username: String!\r\n  bio: String\r\n  following: Boolean!\r\n  image: String\r\n  articles(first: Int, after: String): ArticlesConnection\r\n  comments(first: Int, after: String): CommentsConnection\r\n  favorites(first: Int, after: String): ArticlesConnection\r\n  feed(first: Int, after: String): ArticlesConnection\r\n}\r\n\r\n### User\r\ntype User {\r\n  email: String!\r\n  profile: Profile!\r\n  token: String!\r\n  username: String!\r\n}\r\n\r\n## Mutations\r\n\r\n# Input types.\r\ninput UpdateArticleInput {\r\n  body: String\r\n  description: String\r\n  title: String\r\n}\r\n\r\ninput CreateArticleInput {\r\n  body: String!\r\n  description: String!\r\n  tagList: [String]\r\n  title: String!\r\n}\r\n\r\ntype ArticlePayload {\r\n  article: Article\r\n}\r\n\r\ntype CommentPayload {\r\n  comment: Comment\r\n}\r\n\r\ninput CreateUserInput {\r\n  email: String!\r\n  username: String!\r\n  password: String!\r\n}\r\n\r\ninput UpdateUserInput {\r\n  email: String\r\n  username: String\r\n  password: String\r\n  image: String\r\n  bio: String\r\n}\r\n\r\ntype UserPayload {\r\n  user: User\r\n}\r\n\r\ntype ProfilePayload {\r\n  profile: Profile\r\n}\r\n\r\n# Build the schema.\r\ntype Query {\r\n  article(slug: String!): Article\r\n  articles(\r\n    first: Int,\r\n    after: String,\r\n    authoredBy: String\r\n    favoritedBy: String\r\n    withTag: String\r\n  ): ArticlesConnection\r\n  me: User\r\n  feed(first: Int, after: String): ArticlesConnection\r\n  profile(username: String!): ProfilePayload\r\n  tags: [String]\r\n}\r\n\r\ntype Mutation {\r\n  ### User & Profile\r\n  createUser(input: CreateUserInput): UserPayload\r\n  login(password: String!, email: String!): UserPayload\r\n  updateUser(changes: UpdateUserInput!): UserPayload\r\n  followUser(username: String!): ProfilePayload\r\n  unfollowUser(username: String!): ProfilePayload\r\n\r\n  ### Article\r\n  createArticle(input: CreateArticleInput!): ArticlePayload\r\n  updateArticle(slug: String!, changes: UpdateArticleInput!): ArticlePayload\r\n  favoriteArticle(slug: String!): ArticlePayload\r\n  deleteArticle(slug: String!): DeletionStatus\r\n\r\n  ### Comment\r\n  addComment(slug: String!, body: String!): CommentPayload\r\n  deleteComment(id: ID!): CommentPayload\r\n}\r\n\r\nschema {\r\n  query: Query\r\n  mutation: Mutation\r\n}\r\n\r\n';


var logger = void 0;

if (_config2.default.server.env !== 'production') {
  logger = { log: function log(e) {
      return console.log(e);
    } };
}

exports.default = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: typeDefs,
  /*eslint no-console: 0*/
  logger: logger,
  resolvers: _resolver2.default
});