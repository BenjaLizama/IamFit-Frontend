export default function formatToLocalNumber(value: number) {
  return new Intl.NumberFormat("es-CL").format(value);
}
