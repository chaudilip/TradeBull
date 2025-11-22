
export class DbTypeRegistry {
  private static registry = new Map<string, string>();

  /**
  * Register a connection name and its DB type
  * Example: register('mysqlConn', 'mysql')
  */
  static register(connectionName: string, dbType: string) {
    this.registry.set(connectionName, dbType)
  }


  /**
 * Get DB type by connection name
 */
  static get(connectionName: string): string | undefined {
    return this.registry.get(connectionName);
  }
}

// Example usage:
// DbTypeRegistry.register('mainConn', 'postgres')
// DbTypeRegistry.register('analyticsConn', 'mysql')
//
// // Later somewhere in your service:
// const type = DbTypeRegistry.get('analyticsConn');
//
// if (type === 'mysql') {
//   // run MySQL specific query
// } else if (type === 'postgres') {
//   // run Postgres specific query
// }

