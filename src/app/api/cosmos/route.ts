import { CosmosClient } from "@azure/cosmos";
import { NextResponse } from "next/server";

const COSMOS_CONNECTION_STRING = process.env.COSMOS_CONNECTION_STRING ?? "";

export async function GET(request: Request) {
  const client = new CosmosClient(COSMOS_CONNECTION_STRING);
  const DB_ID = "nhuttudb";
  const CONT_ID = "nhuttucont";
  const db = await client.databases.createIfNotExists({ id: DB_ID });
  const cont = await db.database.containers.createIfNotExists({ id: CONT_ID });

  const res = {
    status: [db.statusCode, cont.statusCode],
    endpoints: client.getReadEndpoints(),
    de: client.getWriteEndpoints(),
  };

  return NextResponse.json(res);
}

export const dynamic = "force-dynamic";
