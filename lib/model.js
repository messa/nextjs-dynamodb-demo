import { DynamoDBClient, QueryCommand, PutItemCommand } from "@aws-sdk/client-dynamodb"

const dynamoRegion = process.env.DYNAMO_REGION || 'eu-west-1'
const dynamoClient = new DynamoDBClient({ region: dynamoRegion })
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
