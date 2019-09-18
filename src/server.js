
/*------------FAKE DATA ABOVE----------------*/

const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const Post = require('./models/post');
const User = require('./models/user');

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
        id: {type: GraphQLNonNull(GraphQLInt)},
        userid: {type: GraphQLNonNull(GraphQLInt)},
        text: {type: GraphQLNonNull(GraphQLString)},
        comments: {type: GraphQLNonNull(GraphQLInt)},
        likes: {type: GraphQLNonNull(GraphQLInt)},
        retweets: {type: GraphQLNonNull(GraphQLInt)},
        user: {
            type: UserType,
            resolve: (post) => {
                return users.find(user => user.id === post.userid)
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'An user',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        username: {type: GraphQLNonNull(GraphQLString)},
        profileImg: {type: GraphQLNonNull(GraphQLString)},
        posts: {
            type: GraphQLList(PostType),
            resolve: (user) =>{
                return //posts.filter(post => post.id === user.id)
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
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => posts.find(post => post.id === post.id)
        },
        posts: {
            type: new GraphQLList(PostType),
            description: 'List of posts',
            resolve: () => posts
        },
        users: {
            type: new GraphQLList(UserType),
            description: 'List of all users',
            resolve: () => users
        },
        user: {
            type: UserType,
            description: 'A single user',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => users.find(user => user.id === args.id)
        }
    })
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root mutation',
  fields: () => ({
      addUser:{
        type: UserType,
        description: 'Add a user',
        args:{
          name: {type: GraphQLNonNull(GraphQLString)},
          username: {type: GraphQLNonNull(GraphQLString)},
          profileImg: {type: GraphQLNonNull(GraphQLString)}
        },
        resolve(parent,args){
          let user = new User({
            name: args.name,
            username: args.username,
            profileImg: args.profileImg
          });
          return user.save();
        }
      },
      addPost: {
          type: PostType,
          description: 'Add a post',
          args: {
              text: {type: GraphQLNonNull(GraphQLString)},
              userid: {type: GraphQLNonNull(GraphQLInt)}
          },
          resolve: (parent, args) => {
              const post = { 
                  id: posts.length + 1,
                  userid: args.userid,
                  text: args.text,
                  comments: 0,
                  likes: 0,
                  retweets: 0
              }
              posts.push(post);
              return post;
          }
      }
  })
})
/*

"id": 1,
      "userid":1,
      "text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco",
      "comments":"10",
      "likes":"57",
      "retweets":"12"
addAuthor: {
            type: AuthorType,
            description: 'Add a author',
            args: {
                name: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                const author = { 
                    id: authors.length + 1, 
                    name: args.name
                }
                authors.push(author);
                return author;
            }
        }
*/
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

app.use(cors());
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));
app.listen(5000, () => console.log('Server running'))