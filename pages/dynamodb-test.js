// Tady jsem si jen zkoušel, jak se pracuje s DynamoDB a AWS SDK.
// Tento soubor se při běhu aplikace nijak nepoužívá a není potřeba.

import Layout from '../components/layout'
import { DynamoDBClient, ListTablesCommand, ScanCommand } from "@aws-sdk/client-dynamodb"

// DynamoDB docs:
// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html

function TestPage({ tableNames, items }) {
  return (
    <Layout>
      <h1>DynamoDB test</h1>
      <pre>{JSON.stringify({ tableNames }, null, 2)}</pre>
      <pre>{JSON.stringify({ items }, null, 2)}</pre>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Accessible only in dev environment')
  }
  const client = new DynamoDBClient({ region: 'eu-west-1' });
  const command = new ListTablesCommand({});
  const results = await client.send(command);
  const scanResults = await client.send(new ScanCommand({ TableName: 'nextjs-dynamodb-demo.items' }))
  return {
    props: { // will be passed to the page component as props
      tableNames: results.TableNames,
      items: scanResults.Items,
    },
  }
}

export default TestPage
