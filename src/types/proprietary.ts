export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export type AnyPrimitive = string | number | boolean;

/**
 * ExtendProp<Session, 'user', { user: Partial<User> }>
 * */
export type ExtendProp<Obj, Prop, NewValue> = {
  [P in keyof Obj]: P extends Prop ? Obj[P] & NewValue : Obj[P]
}


export declare type Awaitable<T> = T | PromiseLike<T>;
