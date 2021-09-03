import { DynamoDBClient, QueryCommand, PutItemCommand } from "@aws-sdk/client-dynamodb"

const dynamoRegion = process.env.DYNAMO_REGION || 'eu-west-1'
const dynamoClient = new DynamoDBClient({
  region: dynamoRegion,
  credentials: {
    // Note: The standard env variable name AWS_ACCESS_KEY and WS_SECRET_ACCESS_KEY is reserved and forbidden to use on Vercel
    AccessKeyId: process.env.USER_AWS_ACCESS_KEY_ID,
    SecretAccessKey: process.env.USER_AWS_SECRET_ACCESS_KEY,
  },
})
const dynamoTableName = process.env.DYNAMO_TABLE_NAME || 'nextjs-dynamodb-demo.items'

export async function listTodoItems(userEmail) {
  const results = await dynamoClient.send(new QueryCommand({
    TableName: dynamoTableName,
    KeyConditionExpression: 'user_id = :userId',
    ExpressionAttributeValues: {
      ':userId': { 'S': userEmail },
    }
  }))
  return results.Items.map(item => ({
    itemId: item.item_id.S,
    body: item.body.S,
  }))
}

export async function createTodoItem(userEmail, body) {
  await dynamoClient.send(new PutItemCommand({
    TableName: dynamoTableName,
    Item: {
      user_id: { S: userEmail },
      item_id: { S: new Date().toISOString() },
      body: { S: body },
    }
  }))
}
