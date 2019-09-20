
/*------------FAKE DATA ABOVE----------------*/

const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const Post = require('./models/post');
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
        date: {type: GraphQLNonNull(GraphQLDate)}
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
                id: {type: GraphQLInt}
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
  app.use(express.static(path.join(__dirname, '/build')));  
    app.get('*', (req, res) => {    
      res.sendfile(path.join(__dirname = '/build/index.html'));  })}

app.get('*', (req, res) => {    
  res.sendfile(path.join(__dirname = '/build/index.html'));  });

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`🚀 Server ready at ${PORT}`))