type SwMileageTokenHistory = {
  sw_mileage_token_history_id: number;
  sw_mileage_token_id: number;
  status: number; // 1 생성 2 완료 0 실패
  amount: number;
  transaction_type: string;
  admin_id: number
  admin_address: string;
  student_address: string;
  student_id: string;
  transaction_hash: string;
  created_at: string;
  updated_at: string;
}


export type {
  SwMileageTokenHistory
}
