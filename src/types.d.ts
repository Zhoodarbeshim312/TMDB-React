declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.sass" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.woff" {
  const value: string;
  export default value;
}

declare module "*.woff2" {
  const value: string;
  export default value;
}

declare module "*.ttf" {
  const value: string;
  export default value;
}

declare module "*.otf" {
  const value: string;
  export default value;
}

declare module "*.mp4" {
  const value: string;
  export default value;
}

declare module "*.webm" {
  const value: string;
  export default value;
}

declare module "*.mp3" {
  const value: string;
  export default value;
}

declare module "*.wav" {
  const value: string;
  export default value;
}

declare module "*.json" {
  const value: any;
  export default value;
}

export interface IResponse {
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

export interface IData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
