// Typings
import { AxiosInstance } from 'axios';
import { ErrorKeys } from './typings/Errors/ErrorKeys';
import { ErrorResponse } from './typings/Errors/ErrorResponse';

// Resources
import { pluginInfo } from './resources/plugin-info';

export default abstract class Resource {
  protected readonly client;
  protected readonly endpoint: string;

  constructor(client: AxiosInstance, endpoint: string) {
    this.client = client;
    this.endpoint = endpoint;
  }

  async get(id?: string) {
    try {
      const url = id ? `${this.endpoint}/${id}` : this.endpoint;
      const response = await this.client.get(url);

      return response.data;
    } catch (error) {
      return Resource.exceptionHandle(error);
    }
  }

  async create(data?: object) {
    try {
      const response = await this.client.post(this.endpoint, {
        ...data,
        ...pluginInfo,
      });

      return response;
    } catch (error) {
      return Resource.exceptionHandle(error);
    }
  }

  async update(id: string, data?: any) {
    try {
      const response = await this.client.patch(`${this.endpoint}/${id}`, {
        ...data,
        ...pluginInfo,
      });

      return response;
    } catch (error) {
      return Resource.exceptionHandle(error);
    }
  }

  static exceptionHandle(error: any): ErrorResponse {
    if (
      error.response.data.hasOwnProperty(ErrorKeys.ERROR_CODE) &&
      error.response.data.hasOwnProperty(ErrorKeys.ERROR_INFO)
    ) {
      return {
        [ErrorKeys.ERROR_CODE]: error.response.data.error_code,
        [ErrorKeys.ERROR_INFO]: error.response.data.error_info,
      };
    }
    return error;
  }
}
