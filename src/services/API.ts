import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

class API {
  private static request: AxiosInstance

  /** Parse any error to a string message, so useSWR:error is always a friendly string if any error occurs. */
  public static parseErrorMessage(
    err:
      | AxiosResponse<{ message?: string, reason?: string }>
      | AxiosError<{ message?: string, reason?: string }>
      | Error,
  ): string {
    if (axios.isAxiosError(err)) {
      if (err.response?.data?.message) {
        return err.response.data?.message
      }
      if (err.response?.data?.reason) {
        return err.response.data?.reason
      }
      else {
        return err.message
      }
    }
    else if (err instanceof Error) {
      return err.message
    }
    else if (err.data?.message) {
      return err.data.message
    }
    else if (err.data?.reason) {
      return err.data.reason
    }
    else if (err.statusText) {
      return err.statusText
    }
    else {
      return 'Unknown error'
    }
  }

  constructor() {
    API.request = axios.create({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    // if (process.env.NEXT_PUBLIC_API_URL) {
    //   API.request.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
    // }
    // else if (process.env.NODE_ENV === 'development') {
    //   API.request.defaults.baseURL = 'https://api.open-meteo.com/v1'
    // }
    // else {
    //   API.request.defaults.baseURL = 'https://api.open-meteo.com/v1'
    // }
  }

  async get(path: string, config?: AxiosRequestConfig) {
    return API.request.get(path, config).catch((err) => {
      console.error('[API:GET]', err)
      return err
    })
  }

  async post(path: string, data: object | null, config?: AxiosRequestConfig) {
    return API.request.post(path, data, config).catch((err) => {
      console.error('[API:POST]', err)
      return err
    })
  }

  async put(path: string, data: object | null, config?: AxiosRequestConfig) {
    return API.request.put(path, data, config).catch((err) => {
      console.error('[API:PUT]', err)
      return err
    })
  }

  async patch(path: string, data: object | null, config?: AxiosRequestConfig) {
    return API.request.patch(path, data, config).catch((err) => {
      console.error('[API:PATCH]', err)
      return err
    })
  }

  async delete(path: string, config?: AxiosRequestConfig) {
    return API.request.delete(path, config).catch((err) => {
      console.error('[API:DELETE]', err)
      return err
    })
  }
}

export default API
