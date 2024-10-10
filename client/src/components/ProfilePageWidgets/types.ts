export interface BioProfileType {
  id?: number;
  fio?: string;
  date_of_birth?: Date; //???
  email: string;
  password?: string;
  phone?: string;
  scores?: number;
}

export type UserDataType = {
  fio: string;
  email: string;
  phone: string;
  userId?: string | null;
};
