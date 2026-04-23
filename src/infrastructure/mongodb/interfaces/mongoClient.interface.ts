export interface MongoClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

