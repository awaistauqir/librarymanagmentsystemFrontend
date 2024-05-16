export default function trimStrings(values: object) {
  return Object.entries(values)
    .filter(([key, value]) => {
      return (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      );
    })
    .reduce((acc: Record<string, any>, [key, value]) => {
      if (typeof value === "string") {
        acc[key] = value.trim();
      }
      acc[key] = value;
      return acc;
    }, {});
}
