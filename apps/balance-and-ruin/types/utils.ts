/** Makes all properties on object nullable
 * @example
 * // The following presents no error
 * type Foo = { foo: string };
 * const nullable: NullableProperties<Foo> = {
 *   foo: null;
 * }
 */
export type NullableProperties<T> = { [K in keyof T]: T[K] | null };
