import express from 'express';
import express_graphql from 'express-graphql';
import { buildSchema } from 'graphql';

var teamData = [
    {
        id: 1,
        name: 'Ye',
        favoriteColor: 'white'
    },
    {
        id: 2,
        name: 'dev1',
        favoriteColor: 'black'
    },
    {
        id: 3,
        name: 'dev2',
        favoriteColor: 'green'
    }
];

const schema = buildSchema(`
    type Query {
        team: [Developer]
        developer(id: Int!): Developer,
        message: String
    },
    type Developer {
        id: Int
        name: String
        favoriteColor: String
    }

`);

const getTeam = () => {
    console.log('getTeam()::');
    return teamData;
};

const getDev = (param) => {
    console.log('getDev(param)::', param);
    return teamData.filter(dev => {
        return dev.id === param.id;
    })[0];
}

const getMessage = () => {
    console.log('message()::');
    return 'Hello Team!';
}

const root = {
    team: getTeam,
    developer: getDev,
};



const app = express();
app.use('/api', express_graphql({
    schema,
    rootValue: root,
    graphiql: true
}));

app.listen(80, () => console.log('Express GraphQL running on port 80...'));
