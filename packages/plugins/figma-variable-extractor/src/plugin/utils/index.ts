export function isRGBA(value: unknown): value is RGBA {
  return (
    typeof value === "object" &&
    value !== null &&
    "r" in value &&
    "g" in value &&
    "b" in value &&
    "a" in value &&
    typeof (value as RGBA).r === "number" &&
    typeof (value as RGBA).g === "number" &&
    typeof (value as RGBA).b === "number" &&
    typeof (value as RGBA).a === "number"
  );
}

export function isVariableAlias(value: unknown): value is VariableAlias {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    value.type === "VARIABLE_ALIAS" &&
    "id" in value
  );
}

export function rgbToHex({ r, g, b, a }: RGBA): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join("");

  if (a !== 1) {
    const alpha = Math.round(a * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${hex}${alpha}`;
  }

  return `#${hex}`;
}
