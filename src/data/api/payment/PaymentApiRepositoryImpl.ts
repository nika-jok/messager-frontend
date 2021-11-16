import PaymentApiRepository from '../../models/payment/PaymentApiRepository'
import RequestOptions from '../../../utils/api/RequestOptions'
import ApiHelper from '../../../utils/api/ApiHelper'
import { APPLICATION_SERVER, PAYMENT_SECRET_KEY } from '../../../constants'
import MerchentSignatureResponse from '../../models/payment/MerchentSignatureResponse'
import StorageHelper from '../../../utils/StorageHelper'

export default class PaymentApiRepositoryImpl implements PaymentApiRepository {
  public getMerchentSignature = (
    string: string[]
  ): Promise<MerchentSignatureResponse> => {
    const requestOptions: RequestOptions = new RequestOptions()

    requestOptions.setBody(
      JSON.stringify({
        key: PAYMENT_SECRET_KEY,
        string,
      })
    )

    return ApiHelper.fetchPostJson(
      `${APPLICATION_SERVER}/api/v1/payments/signature`,
      requestOptions
    )
  }

  public getFondyPaymentPage = (paymentParams: any): Promise<any> => {
    const requestOptions: RequestOptions = new RequestOptions()

    if (StorageHelper.getUserData()?.token) {
      requestOptions.addHeader(
        'Authorization',
        `Token ${StorageHelper.getUserData()?.token}`
      )
    }

    requestOptions.setBody(
      JSON.stringify({
        ...paymentParams,
      })
    )

    return ApiHelper.fetchPostJson(
      `${APPLICATION_SERVER}/api/v1/payments/fondy`,
      requestOptions
    )
  }
}
