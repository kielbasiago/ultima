const COLOR_COUNT = 3;

export function scale_rgb(
  rgb_data: number[],
  scale: number,
  width: number,
  height: number
) {
  const result = [];
  for (let y = 0; y < height; y++) {
    for (let sy = 0; sy < scale; sy++) {
      for (let x = 0; x < width; x++) {
        for (let sx = 0; sx < scale; sx++) {
          for (let color = 0; color < COLOR_COUNT; color++) {
            const source = color + x * COLOR_COUNT + y * width * COLOR_COUNT;
            result.push(rgb_data[source]);
          }
        }
      }
    }
  }
  return result;
}

export function draw_rgb(
  rgb_data: number[],
  alpha_color: number[],
  context: CanvasRenderingContext2D | null,
  width: number,
  height: number
) {
  if (!context) {
    return;
  }
  const image_data = context.getImageData(0, 0, width, height);
  const data = image_data.data;

  for (
    let i = 0, j = 0;
    i < data.length && j < rgb_data.length;
    i += 4, j += COLOR_COUNT
  ) {
    data[i + 0] = rgb_data[j + 0];
    data[i + 1] = rgb_data[j + 1];
    data[i + 2] = rgb_data[j + 2];

    if (
      rgb_data[j + 0] == alpha_color[0] &&
      rgb_data[j + 1] == alpha_color[1] &&
      rgb_data[j + 2] == alpha_color[2]
    ) {
      data[i + 3] = 0;
    } else {
      data[i + 3] = 255;
    }
  }

  context.putImageData(image_data, 0, 0);
}
