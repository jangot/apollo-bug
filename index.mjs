import path from 'path';
import { fileURLToPath } from 'url';
import { loadFilesSync } from '@graphql-tools/load-files';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new ApolloServer({
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
                'editor.theme': 'light',
                'editor.cursorShape': 'underline'
            }
        }),
    ],
    introspection: true,
    typeDefs: loadFilesSync(`${__dirname}/schemas`, { recursive: true }),
    resolvers: {
        Query: {
            list: () => {
                return [
                    {
                        id: 1,
                        name: 'Jon'
                    },
                    {
                        id: 2,
                        name: 'Bill'
                    }
                ]
            }
        }
    },
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
