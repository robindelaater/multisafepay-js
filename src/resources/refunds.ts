import Resource from '../resource';
import { pluginInfo } from './plugin-info';

// Typings
import { AxiosInstance } from 'axios';

export default class Refunds {
  client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async create(order_id: string, data: any) {
    try {
      const response = await this.client.post(`/orders/${order_id}/refunds`, {
        ...data,
        ...pluginInfo,
      });
      return response.data;
    } catch (error) {
      return Resource.exceptionHandle(error);
    }
  }
}
