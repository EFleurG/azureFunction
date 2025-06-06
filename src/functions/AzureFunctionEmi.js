const { app,input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'emiDB',
    containerName: 'Container1',
    connection: 'CosmosDB',
    sqlQuery: "select * from c"
});

app.http('getItems', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    route: 'items',
    handler: async (request, context) => {
        const items = context.extraInputs.get(cosmosInput);
        return {
            body: JSON.stringify(items),
            status: 200
        };
    }
});

