export interface Chapter {
  id: number;
  title: string;
  pageCount : number;
}

export interface Book {
  id :number,
  title :string,
  chapters : Chapter[]

}
