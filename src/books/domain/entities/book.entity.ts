import { randomUUID } from 'node:crypto';

export interface BookAuthor {
  id: string;
  firstName: string;
  lastName: string;
}

export interface BookProps {
  title: string;
  description: string;
  publisher: string;
  publicationYear: number;
  authors: BookAuthor[];
  createdAt: Date;
  updatedAt: Date;
}

export class Book {
  private _id: string;
  private props: BookProps;

  constructor(props: BookProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };

    this.validate();
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this.props.title;
  }

  public get description() {
    return this.props.description;
  }

  public get publisher() {
    return this.props.publisher;
  }

  public get publicationYear() {
    return this.props.publicationYear;
  }

  public get authors() {
    return this.props.authors;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }

  private validateTitle() {
    const title = this.props.title;

    if (title.length < 2 || title.length > 50)
      throw new Error(
        'Book title must have at least 2 characters and cannot exceed 50 characters',
      );
  }

  private validateDescription() {
    const description = this.props.description;

    if (description.length < 10)
      throw new Error('Description must have at least 10 characters');
  }

  private validateAuthor() {
    const author = this.props.authors;
    const hasInvalidName = author.some(
      (a) => /\d/.test(a.firstName) || /\d/.test(a.lastName),
    );

    if (author.length === 0)
      throw new Error('Book must have at least one author');
    if (hasInvalidName) throw new Error('Author name cannot contain numbers');
  }

  private validate() {
    this.validateTitle();
    this.validateDescription();
    this.validateAuthor();
  }
}
