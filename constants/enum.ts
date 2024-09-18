export enum VNPayReponseStatus {
  CANCELLED_BY_USER = "24" as any,
  INSUFFICIENT_BALANCE = "51" as any,
  TRANSACTION_TIMEOUT = "11" as any,
  SUCCESS = "00" as any,
}

function getKeyByValue(value: string): string | undefined {
  return Object.keys(VNPayReponseStatus).find(
    (key) =>
      VNPayReponseStatus[key as keyof typeof VNPayReponseStatus] === value,
  );
}

export { getKeyByValue };
