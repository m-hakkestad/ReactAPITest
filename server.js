
/*------------FAKE DATA ABOVE----------------*/

const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const Post = require('./models/post');
const Comment = require('./models/comment');
const GraphQLDate = require('graphql-date');
const path = require('path');

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://hakke:twutter123@cluster0-tx7ij.mongodb.net/test?retryWrites=true&w=majority', 
{ useNewUrlParser: true, });

mongoose.connection.once('open',() => {
  console.log('Connected to database');
});


const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'This represents a post written by a user',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLString)},
        text: {type: GraphQLNonNull(GraphQLString)},
        score: {type: GraphQLNonNull(GraphQLInt)},
        date: {type: GraphQLNonNull(GraphQLDate)},
        commentids: {type: GraphQLList(GraphQLString)},
        comments: {
          type: GraphQLList(CommentType),
          resolve: (post) => {
            return Comment.find({"_id:":{"$in": post.commentids}}, function(req,res){
              console.log(req);
            })
          }
        }
    })
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'This represents a comment on a post',
  fields: () => ({
    id: {type: GraphQLNonNull(GraphQLString)},
    text: {type: GraphQLNonNull(GraphQLString)},
    score: {type: GraphQLNonNull(GraphQLInt)},
    date: {type: GraphQLNonNull(GraphQLDate)},
    postid: {type: GraphQLNonNull(GraphQLString)},
    post: {
      type: PostType,
      resolve: (comment) => {
        return Post.findById(comment.postid)
      }
    }
  })
});




const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        post: {
            type: PostType,
            description: 'A single post',
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args){
              return Post.findById(args.id);
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            description: 'List of posts',
            resolve(){
              return Post.find({});
            }
        },
        newPosts: {
          type: new GraphQLList(PostType),
          description: 'List of posts',
          resolve(){
            return Post.find({}).sort({date:-1});
          }
        },
        popularPosts: {
          type: new GraphQLList(PostType),
          description: 'List of posts',
          resolve(){
            return Post.find({score: {$gt:-5}}).sort({score:-1});
          }
        },
        comments:{
          type: new GraphQLList(CommentType),
          description: 'A list of all comments',
          resolve(){
            return Comment.find({})
          }
        },
        comment:{
          type: CommentType,
          description: 'A comment on a post',
          args: {
            id: {type: GraphQLString}
          },
          resolve(parent, args){
            return Comment.findById(args.id);
          }
        }
    })
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: () => ({
      addPost:{
        type: PostType,
        description: 'Add a post',
        args:{
          text: {type: GraphQLNonNull(GraphQLString)}
        },
        resolve(parent,args){
          let post = new Post({
            text: args.text,
            score: 1,
            date: Date.now()
          });
          return post.save();
        }
      },
      modifyPostScore:{
        type: PostType,
        description: 'Modify a posts score',
        args:{
          id: {type: GraphQLNonNull(GraphQLString)},
          modifier: {type: GraphQLNonNull(GraphQLInt)}
        },
        resolve(parent,args){
          return Post.findByIdAndUpdate(args.id,{$inc: {score: args.modifier}})
        }
      },
      addComment:{
        type: CommentType,
        description: 'Add a comment',
        args:{
          postid: {type: GraphQLNonNull(GraphQLString)},
          text: {type: GraphQLNonNull(GraphQLString)}
        },
        resolve(parent,args){
          let comment = new Comment({
            postid: args.postid,
            text: args.text,
            score: 1,
            date: Date.now()
          })
          Post.findByIdAndUpdate(args.postid,{$push: {commentids: comment.id}}, function(err, result){
            console.log("Comment added");
          });

          return comment.save();
        }
      },
      modifyCommentScore:{
        type: CommentType,
        description: 'Modify a posts score',
        args:{
          id: {type: GraphQLNonNull(GraphQLString)},
          modifier: {type: GraphQLNonNull(GraphQLInt)}
        },
        resolve(parent,args){
          return Comment.findByIdAndUpdate(args.id,{$inc: {score: args.modifier}})
        }
      }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

app.use(cors());
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

if(process.env.NODE_ENV === 'production') { 
  app.use(express.static(path.join(__dirname, 'client/build')));  
  app.get('*', (req, res) => {    
    res.sendFile(path.resolve(__dirname,'client/build/index.html'));  
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`🚀 Server ready at ${PORT}`))