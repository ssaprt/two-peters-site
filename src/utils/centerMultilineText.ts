function centerMultilineText(lines: string[]) {
  const max = Math.max(...lines.map((l) => l.length));

  return lines.map((line) => {
    const pad = max - line.length;
    const left = Math.floor(pad / 2);
    const right = pad - left;

    return " ".repeat(left) + line + " ".repeat(right);
  });
}

export default centerMultilineText;
