import MerchentSignatureResponse from "./MerchentSignatureResponse";

export default interface PaymentApiRepository {
  getMerchentSignature(string: string[]): Promise<MerchentSignatureResponse>;

  getFondyPaymentPage(paymentParams: any): Promise<any>;
}
