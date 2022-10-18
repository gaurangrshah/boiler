export function parseFormData(input: HTMLInputElement) {
  return {
    [input?.name]: input?.value,
  };
}
