export interface CountryObject {
  'ID State': string;
  'ID Year': number;
  Population: number;
  'Slug State': string;
  State: string;
  Year: string;
}

export type CountryListProps = {
  data: CountryObject[];
};
