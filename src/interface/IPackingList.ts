export interface PackingListTitleUpdateDTO {
  _id: string;
  title: string;
  isAloned?: boolean;
}

export interface PackingListDateUpdateDTO {
  _id: string;
  departureDate: Date;
  isAloned?: boolean;
}
