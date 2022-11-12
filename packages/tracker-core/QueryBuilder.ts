import { getLogger, Logger } from "loglevel";
import { QueryResultType, Query } from "./Query";
import { SnesSession } from "./SnesSession";

type AnySession = SnesSession;

export class QueryBuilder {
  private readonly session: AnySession;
  private readonly logger: Logger;

  constructor(_session: AnySession) {
    this.session = _session;
    this.logger = getLogger("QueryBuilder");
  }

  /**
   *
   * @param query
   * @returns void means not ready, otherwise return the promise to the query
   */
  public async send<TQuery extends Query<any>>(
    query: TQuery
  ): Promise<QueryResultType<TQuery>> {
    const addrs = query.queryAddress;
    const lengths = query.queryLength;

    const pairs = addrs.map((addr, idx) => {
      const hexAddr = addr.toString(16);
      const length = lengths[idx];
      return [hexAddr, length] as [string, number];
    });

    this.logger.info("sending", pairs);

    const responses: Array<Buffer> = [];
    for (let i = 0; i < pairs.length; i++) {
      const [addr, length] = pairs[i];
      const result = await this.session.readRam(addr, length);
      if (result) {
        responses.push(result as Buffer);
      }
    }
    return query.onResponse(responses);
  }
}
