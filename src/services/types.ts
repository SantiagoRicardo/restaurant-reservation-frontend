export interface Reservation {
  id?: number;
  customer_name: string;
  reservation_datetime: string;
  age: number;
  status?: string;
  total_cost?: number;
  id_reservation?: string;
}

export interface UserToken {
  username: string;
  password: string;
}

export interface Token {
  token: string;
  access_token: string;
  token_type: string;
}
