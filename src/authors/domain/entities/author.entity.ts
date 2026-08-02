import { randomUUID } from 'node:crypto';

export interface AuthorProps {
  firstName: string;
  lastName: string;
}

export class Author {
  private _id: string;
  private props: AuthorProps;

  constructor(props: AuthorProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;

    this.validate();
  }

  public get id() {
    return this._id;
  }

  public get firstName() {
    return this.props.firstName;
  }

  public get lastName() {
    return this.props.lastName;
  }

  private validate() {
    const hasInvalidName =
      /[^a-zA-ZÀ-ÿ]/.test(this.props.firstName) ||
      /[^a-zA-ZÀ-ÿ]/.test(this.props.lastName);

    if (hasInvalidName)
      throw new Error('Author name must only contain valid characters!');
  }
}
